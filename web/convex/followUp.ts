// The scheduled emails: a check-in at 14 days (daily check or Mood Tracker info) and the
// three-month invitation to retake. Run daily by crons.ts.
import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { signToken } from "./lib/crypto";
import { links, sendEmail, checkInEmail, followUpEmail } from "./lib/emails";
import { env } from "./_generated/server";
import { DAY, MINUTE } from "./lib/time";

const kindValidator = v.union(v.literal("checkIn"), v.literal("followUp"));
type Kind = "checkIn" | "followUp";
const BATCH = 25;
const STALE_CLAIM = 15 * MINUTE;

/** Active contacts whose email of this kind is due. Time is passed in: queries never read the clock. */
export const dueBatch = internalQuery({
  args: { kind: kindValidator, now: v.number() },
  returns: v.array(v.id("contacts")),
  handler: async (ctx, { kind, now }) => {
    const rows =
      kind === "checkIn"
        ? await ctx.db
            .query("contacts")
            .withIndex("by_status_and_checkInDueAt", (q) => q.eq("status", "active").gte("checkInDueAt", 0).lte("checkInDueAt", now))
            .take(BATCH)
        : await ctx.db
            .query("contacts")
            .withIndex("by_status_and_followUpDueAt", (q) => q.eq("status", "active").gte("followUpDueAt", 0).lte("followUpDueAt", now))
            .take(BATCH);
    return rows.map((r) => r._id);
  },
});

/** Marks one email as being sent. Returns null if it is not due or another run already has it. */
export const claim = internalMutation({
  args: { contactId: v.id("contacts"), kind: kindValidator },
  handler: async (ctx, { contactId, kind }) => {
    const c = await ctx.db.get("contacts", contactId);
    const now = Date.now();
    if (!c || c.status !== "active") return null;
    const due = kind === "checkIn" ? c.checkInDueAt : c.followUpDueAt;
    if (due === undefined || due > now) return null;
    if (c.claimedAt !== undefined && now - c.claimedAt < STALE_CLAIM) return null;
    await ctx.db.patch("contacts", contactId, { claimedAt: now });
    return { email: c.email, firstName: c.firstName, consents: c.consents, rememberedModel: c.rememberedModel };
  },
});

export const markSent = internalMutation({
  args: { contactId: v.id("contacts"), kind: kindValidator },
  returns: v.null(),
  handler: async (ctx, { contactId, kind }) => {
    const c = await ctx.db.get("contacts", contactId);
    if (!c) return null;
    const now = Date.now();
    const patch =
      kind === "checkIn"
        ? { checkInDueAt: undefined, checkInSentAt: now, claimedAt: undefined }
        : { followUpDueAt: undefined, followUpSentAt: now, claimedAt: undefined };
    const remaining = kind === "checkIn" ? c.followUpDueAt : c.checkInDueAt;
    if (remaining === undefined) {
      // Nothing left to send: keep the contact 30 more days for replies, then delete.
      await ctx.db.patch("contacts", contactId, { ...patch, status: "completed", deleteAfter: Math.min(c.deleteAfter, now + 30 * DAY) });
    } else {
      await ctx.db.patch("contacts", contactId, patch);
    }
    return null;
  },
});

export const release = internalMutation({
  args: { contactId: v.id("contacts") },
  returns: v.null(),
  handler: async (ctx, { contactId }) => {
    const c = await ctx.db.get("contacts", contactId);
    if (c) await ctx.db.patch("contacts", contactId, { claimedAt: undefined });
    return null;
  },
});

async function sendOne(
  ctx: ActionCtx,
  contactId: Id<"contacts">,
  kind: Kind,
): Promise<"sent" | "skipped" | "failed" | "not-due"> {
  const payload = await ctx.runMutation(internal.followUp.claim, { contactId, kind });
  if (!payload) return "not-due";
  if (!env.MM_LINK_KEY) {
    await ctx.runMutation(internal.followUp.release, { contactId });
    return "skipped";
  }
  const manage = await signToken(env.MM_LINK_KEY, "manage", contactId, 0);
  const l = links(null, manage);
  const email =
    kind === "checkIn"
      ? checkInEmail(payload.firstName, payload.consents, l)
      : followUpEmail(payload.firstName, payload.consents, payload.rememberedModel, l);
  const result = await sendEmail(payload.email, email, l.oneClickStop);
  if (result === "sent") await ctx.runMutation(internal.followUp.markSent, { contactId, kind });
  else await ctx.runMutation(internal.followUp.release, { contactId });
  return result;
}

/** Daily job. Sends due emails in bounded batches; a second run the same day sends nothing twice. */
export const runDue = internalAction({
  args: {},
  returns: v.object({ sent: v.number(), skipped: v.number(), failed: v.number() }),
  handler: async (ctx) => {
    const tally = { sent: 0, skipped: 0, failed: 0 };
    for (const kind of ["checkIn", "followUp"] as const) {
      for (let batch = 0; batch < 8; batch++) {
        const ids: Id<"contacts">[] = await ctx.runQuery(internal.followUp.dueBatch, { kind, now: Date.now() });
        if (ids.length === 0) break;
        let progressed = false;
        for (const id of ids) {
          const r = await sendOne(ctx, id, kind);
          if (r === "sent") { tally.sent++; progressed = true; }
          else if (r === "skipped") tally.skipped++;
          else if (r === "failed") tally.failed++;
        }
        // Without a working sender nothing moves, so stop instead of looping on the same batch.
        if (!progressed) break;
      }
    }
    return tally;
  },
});
