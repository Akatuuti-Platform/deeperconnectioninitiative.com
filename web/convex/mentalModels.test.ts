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
  consents: { followUp: true, dailyCheck: true, productInfo: false, rememberResult: true },
  rememberedModel: "observer",
  adultConfirmed: true,
  consentVersion: "mm-consent-test",
  rateKey: "a".repeat(32),
  ...over,
});

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

describe("contact opt-in", () => {
  it("refuses contact details without the 18 or older confirmation, or with nothing chosen", async () => {
    const t = setup();
    expect((await post(t, "/mm/contact/request", contactBody({ adultConfirmed: false }))).status).toBe(400);
    expect((await post(t, "/mm/contact/request", contactBody({ consents: { followUp: false, dailyCheck: false, productInfo: false, rememberResult: true } }))).status).toBe(400);
    expect(await t.run((ctx) => ctx.db.query("contacts").take(100))).toHaveLength(0);
  });

  it("stores a pending contact and sends only a confirmation email until confirmed", async () => {
    const t = setup();
    expect((await post(t, "/mm/contact/request", contactBody())).body).toEqual({ ok: true });
    const [c] = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(c.status).toBe("pending");
    expect(c.email).toBe("person@example.com");
    expect(c.contactHash).not.toContain("example");
    expect(emails.map((e) => e.subject)).toEqual(["Please confirm your DCI reminders"]);
  });

  it("keeps the result only when asked, and only alongside the three-month reminder", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody({ email: "a@x.test", consents: { followUp: false, dailyCheck: true, productInfo: false, rememberResult: true } }));
    await post(t, "/mm/contact/request", contactBody({ email: "b@x.test", consents: { followUp: true, dailyCheck: false, productInfo: false, rememberResult: false } }));
    const rows = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.rememberedModel === null)).toBe(true);
  });

  it("confirms with the emailed link, schedules emails, and sends a welcome", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    const token = tokenFrom(linkTo("/mental-models/confirm"));
    expect((await post(t, "/mm/contact/confirm", { token })).body).toEqual({ status: "confirmed" });
    const [c] = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(c.status).toBe("active");
    expect(c.checkInDueAt! - c.confirmedAt!).toBe(14 * DAY);
    expect(c.followUpDueAt! - c.confirmedAt!).toBe(90 * DAY);
    expect(emails.map((e) => e.subject)).toContain("Your DCI reminders are set");
    expect((await post(t, "/mm/contact/confirm", { token })).body).toEqual({ status: "already" });
  });

  it("refuses a forged or superseded confirmation link", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    const first = tokenFrom(linkTo("/confirm"));
    expect((await post(t, "/mm/contact/confirm", { token: first.slice(0, -4) + "0000" })).body).toEqual({ status: "invalid" });
    await new Promise((r) => setTimeout(r, 5));
    await post(t, "/mm/contact/request", contactBody());
    expect((await post(t, "/mm/contact/confirm", { token: first })).body).toEqual({ status: "expired" });
  });

  it("answers the same way for an address that has withdrawn, and never writes to it again", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    expect((await post(t, "/mm/contact/withdraw", { token: tokenFrom(linkTo("/mental-models/stop")) })).body).toEqual({ status: "withdrawn" });
    emails = [];
    expect((await post(t, "/mm/contact/request", contactBody())).body).toEqual({ ok: true });
    expect(emails).toHaveLength(0);
    expect(await t.run((ctx) => ctx.db.query("contacts").take(100))).toHaveLength(0);
  });

  it("one-click stop deletes the contact and keeps only a hash on the suppression list", async () => {
    const t = setup();
    await post(t, "/mm/contact/request", contactBody());
    const stop = tokenFrom(linkTo("/mental-models/stop"));
    const res = await t.fetch(`/mm/unsubscribe?token=${encodeURIComponent(stop)}`, { method: "POST" });
    expect(res.status).toBe(200);
    expect(await t.run((ctx) => ctx.db.query("contacts").take(100))).toHaveLength(0);
    const supp = await t.run((ctx) => ctx.db.query("suppressions").take(100));
    expect(supp).toHaveLength(1);
    expect(JSON.stringify(supp)).not.toContain("example");
    const events = await t.run((ctx) => ctx.db.query("consentEvents").take(100));
    expect(events.map((e) => e.action)).toEqual(["requested", "withdrawn"]);
    expect(JSON.stringify(events)).not.toContain("example");
    expect((await t.fetch(`/mm/unsubscribe?token=bad.token.x.y`, { method: "POST" })).status).toBe(400);
  });
});

describe("scheduled emails and retention", () => {
  async function confirmed(t: ReturnType<typeof setup>, consents = { followUp: true, dailyCheck: true, productInfo: true, rememberResult: true }) {
    await post(t, "/mm/contact/request", contactBody({ consents }));
    await post(t, "/mm/contact/confirm", { token: tokenFrom(linkTo("/confirm")) });
  }

  function realSender() {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MM_FROM_EMAIL = "DCI <test@dci.test>";
  }

  it("sends the 14-day check-in and the three-month email once each, then completes", async () => {
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
    vi.setSystemTime(Date.UTC(2026, 9, 16));
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(1);
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(0);
    vi.setSystemTime(Date.UTC(2027, 0, 1));
    expect((await t.action(internal.followUp.runDue, {})).sent).toBe(1);
    expect(sent).toEqual(["14 days of noticing", "Three months on: how do you respond to stress now?"]);
    const [c] = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(c.status).toBe("completed");
    expect(c.deleteAfter - Date.now()).toBeLessThanOrEqual(30 * DAY);
  });

  it("does not mark an email as sent when sending fails, so it is retried", async () => {
    vi.useFakeTimers({ now: Date.UTC(2026, 9, 1), toFake: ["Date"] });
    const t = setup();
    await confirmed(t);
    realSender();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    vi.setSystemTime(Date.UTC(2026, 9, 16));
    expect((await t.action(internal.followUp.runDue, {})).failed).toBe(1);
    const [c] = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(c.checkInDueAt).toBeDefined();
    expect(c.claimedAt).toBeUndefined();
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
    await confirmed(t, { followUp: false, dailyCheck: true, productInfo: false, rememberResult: false });
    const [c] = await t.run((ctx) => ctx.db.query("contacts").take(100));
    expect(c.deleteAfter - c.confirmedAt!).toBe(365 * DAY);
  });
});
