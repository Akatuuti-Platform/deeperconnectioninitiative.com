// Contacts for the opt-in follow-up. 18 or older only (checked at the HTTP layer).
// Every function here is internal: nothing can be read or written from a browser.
import { v } from "convex/values";
import { internalMutation, internalQuery, type MutationCtx } from "./_generated/server";
import { consentsValidator, reportValidator } from "./lib/validators";
import { DAY } from "./lib/time";

export const PENDING_TTL = 7 * DAY;
export const MAX_RETENTION = 365 * DAY;
export const CHECK_IN_AFTER = 14 * DAY;
export const FOLLOW_UP_AFTER = 90 * DAY;

async function isSuppressed(ctx: MutationCtx, contactHash: string) {
  const s = await ctx.db
    .query("suppressions")
    .withIndex("by_contactHash", (q) => q.eq("contactHash", contactHash))
    .first();
  return s !== null;
}

/**
 * Records a request. Returns what happened so the HTTP layer can decide whether to send a
 * confirmation email, but the HTTP response to the browser is the same in every case, so it
 * never reveals whether an address is already known or suppressed.
 */
export const request = internalMutation({
  args: {
    contactHash: v.string(),
    email: v.string(),
    firstName: v.union(v.string(), v.null()),
    consents: consentsValidator,
    report: v.union(reportValidator, v.null()),
    consentVersion: v.string(),
  },
  returns: v.object({
    outcome: v.union(v.literal("created"), v.literal("updated"), v.literal("exists"), v.literal("suppressed")),
    contactId: v.union(v.id("contacts"), v.null()),
    requestedAt: v.number(),
  }),
  handler: async (ctx, a) => {
    const now = Date.now();
    if (await isSuppressed(ctx, a.contactHash)) return { outcome: "suppressed" as const, contactId: null, requestedAt: now };

    const existing = await ctx.db
      .query("contacts")
      .withIndex("by_contactHash", (q) => q.eq("contactHash", a.contactHash))
      .first();
    if (existing && existing.status !== "pending") return { outcome: "exists" as const, contactId: existing._id, requestedAt: existing.requestedAt };

    await ctx.db.insert("consentEvents", { contactHash: a.contactHash, action: "requested", consents: a.consents, consentVersion: a.consentVersion, at: now });

    if (existing) {
      await ctx.db.patch("contacts", existing._id, {
        email: a.email,
        firstName: a.firstName,
        consents: a.consents,
        report: a.report,
        consentVersion: a.consentVersion,
        requestedAt: now,
        deleteAfter: now + PENDING_TTL,
      });
      return { outcome: "updated" as const, contactId: existing._id, requestedAt: now };
    }

    const contactId = await ctx.db.insert("contacts", {
      contactHash: a.contactHash,
      email: a.email,
      firstName: a.firstName,
      status: "pending",
      consents: a.consents,
      rememberedModel: null,
      report: a.report,
      consentVersion: a.consentVersion,
      requestedAt: now,
      deleteAfter: now + PENDING_TTL,
    });
    return { outcome: "created" as const, contactId, requestedAt: now };
  },
});

/** Activates a pending contact and schedules its emails. */
export const confirm = internalMutation({
  args: { contactId: v.string(), issuedAt: v.number() },
  returns: v.union(v.literal("confirmed"), v.literal("already"), v.literal("expired"), v.literal("missing")),
  handler: async (ctx, { contactId, issuedAt }) => {
    const id = ctx.db.normalizeId("contacts", contactId);
    const contact = id ? await ctx.db.get("contacts", id) : null;
    if (!contact) return "missing";
    if (contact.status !== "pending") return "already";
    const now = Date.now();
    // Only the newest link works, and only for 7 days.
    if (issuedAt !== contact.requestedAt || now - issuedAt > PENDING_TTL) return "expired";

    const wantsCheckIn = contact.consents.dailyCheck === true || contact.consents.productInfo === true;
    await ctx.db.patch("contacts", contact._id, {
      status: "active",
      confirmedAt: now,
      checkInDueAt: wantsCheckIn ? now + CHECK_IN_AFTER : undefined,
      followUpDueAt: contact.consents.followUp === true ? now + FOLLOW_UP_AFTER : undefined,
      deleteAfter: now + MAX_RETENTION,
    });
    await ctx.db.insert("consentEvents", {
      contactHash: contact.contactHash,
      action: "confirmed",
      consents: contact.consents,
      consentVersion: contact.consentVersion,
      at: now,
    });
    return "confirmed";
  },
});

/**
 * After the full report email is sent: forget the report Models, and if the person asked for
 * nothing else (no reminder, no updates, no research contact), delete the contact straight away.
 */
export const reportSent = internalMutation({
  args: { contactId: v.string() },
  returns: v.union(v.literal("deleted"), v.literal("kept"), v.literal("missing")),
  handler: async (ctx, { contactId }) => {
    const id = ctx.db.normalizeId("contacts", contactId);
    const contact = id ? await ctx.db.get("contacts", id) : null;
    if (!contact) return "missing";
    const now = Date.now();
    await ctx.db.insert("consentEvents", { contactHash: contact.contactHash, action: "report_sent", consents: null, consentVersion: null, at: now });
    const c = contact.consents;
    if (!c.followUp && !c.updates && !c.research) {
      await ctx.db.delete("contacts", contact._id);
      return "deleted";
    }
    await ctx.db.patch("contacts", contact._id, { report: null });
    return "kept";
  },
});

/** Deletes the contact at once and keeps only the hash on the suppression list. */
export const withdraw = internalMutation({
  args: { contactId: v.string() },
  returns: v.union(v.literal("withdrawn"), v.literal("missing")),
  handler: async (ctx, { contactId }) => {
    const id = ctx.db.normalizeId("contacts", contactId);
    const contact = id ? await ctx.db.get("contacts", id) : null;
    if (!contact) return "missing";
    const now = Date.now();
    if (!(await isSuppressed(ctx, contact.contactHash))) {
      await ctx.db.insert("suppressions", { contactHash: contact.contactHash, at: now });
    }
    await ctx.db.insert("consentEvents", { contactHash: contact.contactHash, action: "withdrawn", consents: null, consentVersion: null, at: now });
    await ctx.db.delete("contacts", contact._id);
    return "withdrawn";
  },
});

/** What an email needs, for one contact. Used only by internal actions. */
export const forEmail = internalQuery({
  args: { contactId: v.string() },
  handler: async (ctx, { contactId }) => {
    const id = ctx.db.normalizeId("contacts", contactId);
    const c = id ? await ctx.db.get("contacts", id) : null;
    if (!c) return null;
    return { email: c.email, firstName: c.firstName, consents: c.consents, rememberedModel: c.rememberedModel, report: c.report ?? null, status: c.status };
  },
});
