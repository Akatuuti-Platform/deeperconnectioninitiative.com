// The only doors into the Mental Models backend.
//
//  - /mm/result, /mm/event, /mm/contact/*: called by the SvelteKit server only, which holds
//    MM_SERVER_SECRET. The browser never calls Convex directly.
//  - /mm/unsubscribe: the one-click "stop" link in email headers (RFC 8058). The signed token in
//    the link is the credential; it can only delete, never read.
import { httpRouter } from "convex/server";
import { httpAction, env, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { rateLimiter } from "./limits";
import { constantTimeEqual, hmacHex, normaliseEmail, signToken, verifyToken } from "./lib/crypto";
import { links, sendEmail, confirmationEmail, welcomeEmail } from "./lib/emails";
import { MODEL_IDS, type ModelId } from "../src/lib/mental-models/types";
import { AGE_BANDS, REGIONS, STATE_BUCKETS, FUNNEL_EVENTS, type FunnelEvent } from "./lib/validators";

const http = httpRouter();

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const CLARITY = ["clear", "clarified", "blend"] as const;

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function authorised(req: Request): boolean {
  const secret = env.MM_SERVER_SECRET;
  if (!secret) return false;
  const header = req.headers.get("Authorization") ?? "";
  return constantTimeEqual(header, `Bearer ${secret}`);
}

async function body(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const b: unknown = await req.json();
    return b && typeof b === "object" && !Array.isArray(b) ? (b as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

function rateKey(b: Record<string, unknown>): string {
  return typeof b.rateKey === "string" && /^[a-f0-9]{16,64}$/.test(b.rateKey) ? b.rateKey : "unknown";
}

type LimitName = "contactPerAddress" | "contactPerSource" | "resultPerSource" | "eventPerSource" | "linkPerSource";

async function limited(ctx: ActionCtx, name: LimitName, key: string): Promise<boolean> {
  const { ok } = await rateLimiter.limit(ctx, name, { key });
  return !ok;
}

// ---- Anonymous counts ---------------------------------------------------------------

http.route({
  path: "/mm/result",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    if (!authorised(req)) return json(401, { error: "unauthorised" });
    const b = await body(req);
    if (!b) return json(400, { error: "bad body" });
    const primary = oneOf(b.primary, MODEL_IDS);
    const clarity = oneOf(b.clarity, CLARITY);
    const secondary = b.secondary === null ? null : oneOf(b.secondary, MODEL_IDS);
    if (!primary || !clarity || (b.secondary !== null && !secondary) || typeof b.contentVersion !== "string") {
      return json(400, { error: "bad fields" });
    }
    if (await limited(ctx, "resultPerSource", rateKey(b))) return json(429, { error: "slow down" });
    await ctx.runMutation(internal.aggregate.addResult, {
      contentVersion: b.contentVersion,
      primary,
      secondary,
      clarity,
      ageBand: oneOf(b.ageBand, AGE_BANDS),
      region: oneOf(b.region, REGIONS),
      stateBucket: oneOf(b.stateBucket, STATE_BUCKETS),
    });
    return json(200, { ok: true });
  }),
});

http.route({
  path: "/mm/event",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    if (!authorised(req)) return json(401, { error: "unauthorised" });
    const b = await body(req);
    const event = b ? oneOf<FunnelEvent>(b.event, FUNNEL_EVENTS) : null;
    if (!b || !event) return json(400, { error: "bad fields" });
    if (await limited(ctx, "eventPerSource", rateKey(b))) return json(429, { error: "slow down" });
    await ctx.runMutation(internal.aggregate.addEvent, { event });
    return json(200, { ok: true });
  }),
});

// ---- Contacts -------------------------------------------------------------------------

http.route({
  path: "/mm/contact/request",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    if (!authorised(req)) return json(401, { error: "unauthorised" });
    if (!env.MM_HASH_KEY || !env.MM_LINK_KEY) return json(503, { error: "not configured" });
    const b = await body(req);
    if (!b) return json(400, { error: "bad body" });

    const email = typeof b.email === "string" ? normaliseEmail(b.email) : "";
    const firstNameRaw = typeof b.firstName === "string" ? b.firstName.trim().slice(0, 40) : "";
    const c = (b.consents ?? {}) as Record<string, unknown>;
    const consents = {
      followUp: c.followUp === true,
      dailyCheck: c.dailyCheck === true,
      productInfo: c.productInfo === true,
      rememberResult: c.rememberResult === true,
    };
    const rememberedModel = b.rememberedModel === null || b.rememberedModel === undefined ? null : oneOf<ModelId>(b.rememberedModel, MODEL_IDS);

    // 18 or older only (decision agreed in the launch plan). Contact details are never stored otherwise.
    if (b.adultConfirmed !== true) return json(400, { error: "adult confirmation required" });
    if (!EMAIL_RE.test(email) || email.length > 254) return json(400, { error: "bad email" });
    if (!consents.followUp && !consents.dailyCheck && !consents.productInfo) return json(400, { error: "nothing chosen" });
    if (typeof b.consentVersion !== "string" || b.consentVersion.length > 40) return json(400, { error: "bad consent version" });

    const contactHash = await hmacHex(env.MM_HASH_KEY, email);
    if ((await limited(ctx, "contactPerAddress", contactHash)) || (await limited(ctx, "contactPerSource", rateKey(b)))) {
      return json(429, { error: "slow down" });
    }

    const r = await ctx.runMutation(internal.contacts.request, {
      contactHash,
      email,
      firstName: firstNameRaw || null,
      consents,
      rememberedModel,
      consentVersion: b.consentVersion,
    });
    if ((r.outcome === "created" || r.outcome === "updated") && r.contactId) {
      const confirm = await signToken(env.MM_LINK_KEY, "confirm", r.contactId, r.requestedAt);
      const manage = await signToken(env.MM_LINK_KEY, "manage", r.contactId, 0);
      const l = links(confirm, manage);
      await sendEmail(email, confirmationEmail(firstNameRaw || null, l), l.oneClickStop);
    }
    // Same answer whatever happened, so nobody can test whether an address is known.
    return json(200, { ok: true });
  }),
});

http.route({
  path: "/mm/contact/confirm",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    if (!authorised(req)) return json(401, { error: "unauthorised" });
    if (!env.MM_LINK_KEY) return json(503, { error: "not configured" });
    const b = await body(req);
    if (!b || typeof b.token !== "string") return json(400, { error: "bad body" });
    if (await limited(ctx, "linkPerSource", rateKey(b))) return json(429, { error: "slow down" });
    const t = await verifyToken(env.MM_LINK_KEY, b.token, "confirm");
    if (!t) return json(200, { status: "invalid" });
    const status = await ctx.runMutation(internal.contacts.confirm, { contactId: t.contactId, issuedAt: t.issuedAt });
    if (status === "confirmed") {
      const id = await ctx.runQuery(internal.contacts.forEmail, { contactId: t.contactId });
      if (id) {
        const manage = await signToken(env.MM_LINK_KEY, "manage", t.contactId, 0);
        const l = links(null, manage);
        await sendEmail(id.email, welcomeEmail(id.firstName, id.consents, l), l.oneClickStop);
      }
    }
    return json(200, { status });
  }),
});

async function withdrawByToken(ctx: ActionCtx, token: string): Promise<"withdrawn" | "missing" | "invalid"> {
  if (!env.MM_LINK_KEY) return "invalid";
  const t = await verifyToken(env.MM_LINK_KEY, token, "manage");
  if (!t) return "invalid";
  return await ctx.runMutation(internal.contacts.withdraw, { contactId: t.contactId });
}

http.route({
  path: "/mm/contact/withdraw",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    if (!authorised(req)) return json(401, { error: "unauthorised" });
    const b = await body(req);
    if (!b || typeof b.token !== "string") return json(400, { error: "bad body" });
    if (await limited(ctx, "linkPerSource", rateKey(b))) return json(429, { error: "slow down" });
    return json(200, { status: await withdrawByToken(ctx, b.token) });
  }),
});

// One-click unsubscribe from the email client (RFC 8058). POST only, so link scanners that
// fetch URLs cannot delete anyone.
http.route({
  path: "/mm/unsubscribe",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const token = new URL(req.url).searchParams.get("token") ?? "";
    const status = await withdrawByToken(ctx, token);
    return new Response(status === "invalid" ? "Link not valid." : "You will not hear from us again.", {
      status: status === "invalid" ? 400 : 200,
      headers: { "Content-Type": "text/plain" },
    });
  }),
});

export default http;
