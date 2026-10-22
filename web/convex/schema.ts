import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  modelValidator,
  clarityValidator,
  ageBandValidator,
  regionValidator,
  stateBucketValidator,
  funnelEventValidator,
  consentsValidator,
} from "./lib/validators";

// Backend for the DCI Mental Models Scorecard. Design: web/docs/mental-models-launch-readiness.md, section 4.
//
// Two kinds of data live here and never meet:
//  - Aggregate counts (aggregateCounts, funnelCounts): numbers per cell. No row per person, no
//    contact field, week or day only. Code in aggregate.ts never imports contact code.
//  - Contacts (contacts, consentEvents, suppressions): only for people who opted in, 18 or older.
//    The quiz result is not stored unless the person ticked "remind me what my result was".
// No table is readable from outside: every function that touches them is internal.
export default defineSchema({
  aggregateCounts: defineTable({
    cellKey: v.string(),
    contentVersion: v.string(),
    week: v.string(),
    primary: modelValidator,
    secondary: v.union(modelValidator, v.null()),
    clarity: clarityValidator,
    ageBand: v.union(ageBandValidator, v.null()),
    region: v.union(regionValidator, v.null()),
    stateBucket: v.union(stateBucketValidator, v.null()),
    count: v.number(),
  })
    .index("by_cellKey", ["cellKey"])
    .index("by_week", ["week"]),

  funnelCounts: defineTable({
    cellKey: v.string(),
    day: v.string(),
    event: funnelEventValidator,
    count: v.number(),
  })
    .index("by_cellKey", ["cellKey"])
    .index("by_day", ["day"]),

  contacts: defineTable({
    // Keyed hash of the normalised address: de-duplication and the suppression check.
    contactHash: v.string(),
    email: v.string(),
    firstName: v.union(v.string(), v.null()),
    status: v.union(v.literal("pending"), v.literal("active"), v.literal("completed")),
    consents: consentsValidator,
    // Present only when the person asked to be reminded of their result.
    rememberedModel: v.union(modelValidator, v.null()),
    consentVersion: v.string(),
    requestedAt: v.number(),
    confirmedAt: v.optional(v.number()),
    // Scheduled emails. A field is removed once its email has been sent.
    checkInDueAt: v.optional(v.number()),
    followUpDueAt: v.optional(v.number()),
    checkInSentAt: v.optional(v.number()),
    followUpSentAt: v.optional(v.number()),
    // Set while an email is being sent, so a second run of the job cannot send it twice.
    claimedAt: v.optional(v.number()),
    // Retention: the contact is deleted at this time whatever its status.
    deleteAfter: v.number(),
  })
    .index("by_contactHash", ["contactHash"])
    .index("by_status_and_checkInDueAt", ["status", "checkInDueAt"])
    .index("by_status_and_followUpDueAt", ["status", "followUpDueAt"])
    .index("by_deleteAfter", ["deleteAfter"]),

  // Append-only proof of consent. Holds the contact hash, never the contact itself, so it
  // survives deletion of the contact.
  consentEvents: defineTable({
    contactHash: v.string(),
    action: v.union(
      v.literal("requested"),
      v.literal("confirmed"),
      v.literal("withdrawn"),
      v.literal("expired"),
      v.literal("retention_deleted"),
    ),
    consents: v.union(consentsValidator, v.null()),
    consentVersion: v.union(v.string(), v.null()),
    at: v.number(),
  })
    .index("by_contactHash", ["contactHash"])
    .index("by_at", ["at"]),

  // Anyone who withdrew. Only the keyed hash is kept, so they are never emailed or re-added.
  suppressions: defineTable({
    contactHash: v.string(),
    at: v.number(),
  }).index("by_contactHash", ["contactHash"]),
});
