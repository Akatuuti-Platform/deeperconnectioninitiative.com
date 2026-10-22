// Retention (decision D3): contacts are deleted 30 days after their last scheduled email,
// at 12 months, or 7 days after an unconfirmed request, whichever comes first. Consent
// records are kept 24 months as proof of consent, then deleted. Run daily by crons.ts.
import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { DAY } from "./lib/time";

const BATCH = 100;
export const CONSENT_LOG_RETENTION = 730 * DAY;

export const purge = internalMutation({
  args: {},
  returns: v.object({ contacts: v.number(), consentEvents: v.number() }),
  handler: async (ctx) => {
    const now = Date.now();
    const expired = await ctx.db
      .query("contacts")
      .withIndex("by_deleteAfter", (q) => q.lte("deleteAfter", now))
      .take(BATCH);
    for (const c of expired) {
      await ctx.db.insert("consentEvents", {
        contactHash: c.contactHash,
        action: c.status === "pending" ? "expired" : "retention_deleted",
        consents: null,
        consentVersion: null,
        at: now,
      });
      await ctx.db.delete("contacts", c._id);
    }
    const oldEvents = await ctx.db
      .query("consentEvents")
      .withIndex("by_at", (q) => q.lt("at", now - CONSENT_LOG_RETENTION))
      .take(BATCH);
    for (const e of oldEvents) await ctx.db.delete("consentEvents", e._id);

    if (expired.length === BATCH || oldEvents.length === BATCH) {
      await ctx.scheduler.runAfter(0, internal.retention.purge, {});
    }
    return { contacts: expired.length, consentEvents: oldEvents.length };
  },
});
