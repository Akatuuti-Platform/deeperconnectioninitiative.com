// @vitest-environment edge-runtime
/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import rateLimiterTest from "@convex-dev/rate-limiter/test";
import schema from "./schema";
import { internal } from "./_generated/api";

const modules = import.meta.glob("./**/*.ts");
const SECRET = "test-secret";
const auth = { Authorization: `Bearer ${SECRET}`, "Content-Type": "application/json" };
const DAY = 86_400_000;

function setup() {
  const t = convexTest(schema, modules);
  rateLimiterTest.register(t);
  return t;
}

/** Without a Resend key, a dev deployment logs each email's links. Tests read them from here. */
let emails: { subject: string; links: string[] }[] = [];

beforeEach(() => {
  process.env.MM_SERVER_SECRET = SECRET;
  process.env.MM_LINK_KEY = "link-key";
  process.env.MM_HASH_KEY = "hash-key";
  process.env.SITE_URL = "https://site.test";
  process.env.CONVEX_SITE_URL = "https://convex.test";
  process.env.MM_DEV_ECHO_LINKS = "true";
  delete process.env.RESEND_API_KEY;
  delete process.env.MM_FROM_EMAIL;
  emails = [];
  vi.spyOn(console, "log").mockImplementation((msg: unknown) => {
    const m = String(msg).match(/^\[mm dev email\] "(.+)" links: (.*)$/);
    if (m) emails.push({ subject: m[1], links: m[2].split(" ").filter(Boolean) });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const tokenFrom = (url: string) => new URL(url).searchParams.get("token") ?? "";
const linkTo = (part: string, i = 0) => emails[i].links.find((l) => l.includes(part))!;

async function post(t: ReturnType<typeof setup>, path: string, body: unknown, headers: Record<string, string> = auth) {
  const res = await t.fetch(path, { method: "POST", headers, body: JSON.stringify(body) });
  return { status: res.status, body: await res.json().catch(() => null) };
}

const contactBody = (over: Record<string, unknown> = {}) => ({
  email: "Person@Example.com",
  firstName: "Amara",
  consents: { followUp: false, updates: false, research: false },
  report: { primary: "observer", underPressure: "drifter" },
  adultConfirmed: true,
  consentVersion: "mm-consent-test",
  rateKey: "a".repeat(32),
  ...over,
});

const allContacts = (t: ReturnType<typeof setup>) => t.run((ctx) => ctx.db.query("contacts").take(100));

describe("only the SvelteKit server can reach data", () => {
  it("rejects every data endpoint without the server secret, or with a wrong one", async () => {
    const t = setup();
    for (const path of ["/mm/result", "/mm/event", "/mm/contact/request", "/mm/contact/confirm", "/mm/contact/withdraw"]) {
      expect((await post(t, path, {}, { "Content-Type": "application/json" })).status, path).toBe(401);
      expect((await post(t, path, {}, { Authorization: "Bearer wrong", "Content-Type": "application/json" })).status, path).toBe(401);
    }
  });

  it("refuses everything when the secret is not configured", async () => {
    delete process.env.MM_SERVER_SECRET;
    const t = setup();
    expect((await post(t, "/mm/event", { event: "quiz_started" })).status).toBe(401);
  });
});

describe("anonymous counts", () => {
  it("counts results without storing anything about a person, and hides groups under 10", async () => {
    const t = setup();
    for (let i = 0; i < 12; i++) {
      const r = await post(t, "/mm/result", { contentVersion: "draft-1.0", primary: "observer", secondary: null, clarity: "clear", rateKey: `${i}`.padStart(16, "b") });
      expect(r.status).toBe(200);
    }
    for (let i = 0; i < 3; i++) {
      await post(t, "/mm/result", { contentVersion: "draft-1.0", primary: "drifter", secondary: "observer", clarity: "clarified", stateBucket: "strained", rateKey: `${i}`.padStart(16, "c") });
    }
    const cells = await t.run((ctx) => ctx.db.query("aggregateCounts").take(100));
    for (const c of cells) {
      expect(Object.keys(c).sort()).toEqual(["_creationTime", "_id", "ageBand", "cellKey", "clarity", "contentVersion", "count", "primary", "region", "secondary", "stateBucket", "week"]);
      expect(c.week).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    const week = cells[0].week;
    const report = await t.query(internal.aggregate.report, { fromWeek: week, toWeek: week });
    expect(report.total).toBe(15);
    expect(report.byPrimary).toEqual({ observer: 12, drifter: "fewer than 10" });
    expect(report.byStateBucket).toEqual({ "not given": 12, strained: "fewer than 10" });
    expect(Object.keys(report)).not.toContain("cells");
  });

  it("rejects a Model or event the scorecard does not have", async () => {
    const t = setup();
    expect((await post(t, "/mm/result", { contentVersion: "x", primary: "wizard", secondary: null, clarity: "clear" })).status).toBe(400);
    expect((await post(t, "/mm/event", { event: "page_scrolled" })).status).toBe(400);
  });

  it("counts funnel steps per day", async () => {
    const t = setup();
    await post(t, "/mm/event", { event: "quiz_started", rateKey: "d".repeat(16) });
    await post(t, "/mm/event", { event: "quiz_started", rateKey: "d".repeat(16) });
    const day = new Date().toISOString().slice(0, 10);
    const r = await t.query(internal.aggregate.funnelReport, { fromDay: day, toDay: day });
    expect(r.totals.quiz_started).toBe(2);
  });

  it("slows down a flood from one source", async () => {
    const t = setup();
    const statuses: number[] = [];
    for (let i = 0; i < 22; i++) {
      statuses.push((await post(t, "/mm/result", { contentVersion: "x", primary: "angel", secondary: null, clarity: "clear", rateKey: "e".repeat(16) })).status);
    }
    expect(statuses.filter((s) => s === 429).length).toBeGreaterThan(0);
  });
});

describe("email me my full report", () => {
  it("refuses contact details without the 18 or older confirmation, or without a valid result", async () => {
    const t = setup();
    expect((await post(t, "/mm/contact/request", contactBody({ adultConfirmed: false }))).status).toBe(400);
    expect((await post(t, "/mm/contact/request", contactBody({ report: { primary: "wizard", underPressure: null } }))).status).toBe(400);
    expect(await allContacts(t)).toHaveLength(0);
  });

  it("works on its own: no box needs ticking", async () => {
    const t = setup();
    expect((await post(t, "/mm/contact/request", contactBody())).body).toEqual({ ok: true });
    const [c] = await allContacts(t);
    expect(c.status).toBe("pending");
    expect(c.consents).toEqual({ fullReport: true, followUp: false, updates: false, research: false });
    expect(c.report).toEqual({ primary: "observer", underPressure: "drifter" });
    expect(emails.map((e) => e.subject)).toEqual(["Please confirm, and we will send your full report"]);
  });

  it("sends the report only after confirmation, then deletes a report-only contact", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    expect((await post(t, "/mm/contact/confirm", { token: tokenFrom(linkTo("/mental-models/confirm")) })).body).toEqual({ status: "confirmed" });
    expect(emails.map((e) => e.subject)).toContain("Your DCI Mental Models report: Observer");
    expect(await allContacts(t)).toHaveLength(0);
    const events = await t.run((ctx) => ctx.db.query("consentEvents").take(100));
    expect(events.map((e) => e.action)).toEqual(["requested", "confirmed", "report_sent"]);
    expect(JSON.stringify(events)).not.toContain("example");
  });

  it("keeps the three choices separate, and forgets the report Models once sent", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody({ consents: { followUp: true, updates: false, research: true } }));
    await post(t, "/mm/contact/confirm", { token: tokenFrom(linkTo("/confirm")) });
    const [c] = await allContacts(t);
    expect(c.consents).toEqual({ fullReport: true, followUp: true, updates: false, research: true });
    expect(c.report).toBeNull();
    expect(c.followUpDueAt! - c.confirmedAt!).toBe(90 * DAY);
    expect(c.checkInDueAt).toBeUndefined();
  });

  it("schedules nothing for updates or research alone, but keeps the contact for them", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody({ consents: { followUp: false, updates: true, research: false } }));
    await post(t, "/mm/contact/confirm", { token: tokenFrom(linkTo("/confirm")) });
    const [c] = await allContacts(t);
    expect(c.followUpDueAt).toBeUndefined();
    expect(c.deleteAfter - c.confirmedAt!).toBe(365 * DAY);
  });

  it("refuses a forged or superseded confirmation link, and a second click changes nothing", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody({ consents: { followUp: true, updates: false, research: false } }));
    const first = tokenFrom(linkTo("/confirm"));
    expect((await post(t, "/mm/contact/confirm", { token: first.slice(0, -4) + "0000" })).body).toEqual({ status: "invalid" });
    await new Promise((r) => setTimeout(r, 5));
    await post(t, "/mm/contact/request", contactBody({ consents: { followUp: true, updates: false, research: false } }));
    expect((await post(t, "/mm/contact/confirm", { token: first })).body).toEqual({ status: "expired" });
    const latest = tokenFrom(emails[emails.length - 1].links.find((l) => l.includes("/confirm"))!);
    expect((await post(t, "/mm/contact/confirm", { token: latest })).body).toEqual({ status: "confirmed" });
    expect((await post(t, "/mm/contact/confirm", { token: latest })).body).toEqual({ status: "already" });
  });

  it("answers the same way for an address that has withdrawn, and never writes to it again", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    expect((await post(t, "/mm/contact/withdraw", { token: tokenFrom(linkTo("/mental-models/stop")) })).body).toEqual({ status: "withdrawn" });
    emails = [];
    expect((await post(t, "/mm/contact/request", contactBody())).body).toEqual({ ok: true });
    expect(emails).toHaveLength(0);
    expect(await allContacts(t)).toHaveLength(0);
  });

  it("one-click stop deletes the contact and keeps only a hash on the suppression list", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    const stop = tokenFrom(linkTo("/mental-models/stop"));
    expect((await t.fetch(`/mm/unsubscribe?token=${encodeURIComponent(stop)}`, { method: "POST" })).status).toBe(200);
    expect(await allContacts(t)).toHaveLength(0);
    const supp = await t.run((ctx) => ctx.db.query("suppressions").take(100));
    expect(supp).toHaveLength(1);
    expect(JSON.stringify(supp)).not.toContain("example");
    expect((await t.fetch(`/mm/unsubscribe?token=bad.token.x.y`, { method: "POST" })).status).toBe(400);
  });
});

describe("scheduled emails and retention", () => {
  async function confirmed(t: ReturnType<typeof setup>, consents = { followUp: true, updates: false, research: false }) {
    await post(t, "/mm/contact/request", contactBody({ consents }));
    await post(t, "/mm/contact/confirm", { token: tokenFrom(linkTo("/confirm")) });
  }

  function realSender() {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MM_FROM_EMAIL = "DCI <test@dci.test>";
  }

  it("sends the 90-day reminder once, then completes", async () => {
    vi.useFakeTimers({ now: Date.UTC(2026, 9, 1), toFake: ["Date"] });
    const t = setup();
    await confirmed(t);
    realSender();
    const sent: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
      sent.push(JSON.parse(String(init.body)).subject);
      return new Response("{}", { status: 200 });
    }));
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(0);
    vi.setSystemTime(Date.UTC(2027, 0, 1));
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(1);
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(0);
    expect(sent).toEqual(["Three months on: how do you respond to stress now?"]);
    const [c] = await allContacts(t);
    expect(c.status).toBe("completed");
    expect(c.deleteAfter - Date.now()).toBeLessThanOrEqual(30 * DAY);
  });

  it("does not mark an email as sent when sending fails, so it is retried", async () => {
    vi.useFakeTimers({ now: Date.UTC(2026, 9, 1), toFake: ["Date"] });
    const t = setup();
    await confirmed(t);
    realSender();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    vi.setSystemTime(Date.UTC(2027, 0, 1));
    expect((await t.action(internal.followUp.runDue, {})).failed).toBe(1);
    const [c] = await allContacts(t);
    expect(c.followUpDueAt).toBeDefined();
    expect(c.claimedAt).toBeUndefined();
  });

  it("does not send or delete the report when the real sender fails", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    const token = tokenFrom(linkTo("/confirm"));
    realSender();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    await post(t, "/mm/contact/confirm", { token });
    const [c] = await allContacts(t);
    expect(c.report).toEqual({ primary: "observer", underPressure: "drifter" });
  });

  it("deletes unconfirmed requests after 7 days and records why", async () => {
    vi.useFakeTimers({ now: Date.UTC(2026, 9, 1), toFake: ["Date"] });
    const t = setup();
    await post(t, "/mm/contact/request", contactBody({ email: "pending@x.test" }));
    vi.setSystemTime(Date.UTC(2026, 9, 9));
    expect((await t.mutation(internal.retention.purge, {})).contacts).toBe(1);
    const events = await t.run((ctx) => ctx.db.query("consentEvents").take(100));
    expect(events.map((e) => e.action)).toEqual(["requested", "expired"]);
  });

  it("never keeps an active contact longer than 12 months", async () => {
    vi.useFakeTimers({ now: Date.UTC(2026, 9, 1), toFake: ["Date"] });
    const t = setup();
    await confirmed(t, { followUp: false, updates: false, research: true });
    const [c] = await allContacts(t);
    expect(c.deleteAfter - c.confirmedAt!).toBe(365 * DAY);
  });
});
