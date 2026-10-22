import { v } from "convex/values";
import { MODEL_IDS } from "../../src/lib/mental-models/types";

// Shared validators. The Model list comes from the site's own content module, so the
// backend can never accept a Model the scorecard does not have.
export const modelValidator = v.union(...MODEL_IDS.map((m) => v.literal(m)));

export const clarityValidator = v.union(v.literal("clear"), v.literal("clarified"), v.literal("blend"));

export const AGE_BANDS = ["under18", "18to24", "25to34", "35plus"] as const;
export const ageBandValidator = v.union(...AGE_BANDS.map((a) => v.literal(a)));

export const REGIONS = ["uganda", "eastAfrica", "elsewhere"] as const;
export const regionValidator = v.union(...REGIONS.map((r) => v.literal(r)));

export const STATE_BUCKETS = ["steady", "strained", "overwhelmed"] as const;
export const stateBucketValidator = v.union(...STATE_BUCKETS.map((s) => v.literal(s)));

// Funnel steps counted per day. Counts only: no identifier is ever stored with an event.
export const FUNNEL_EVENTS = [
  "landing_view",
  "quiz_started",
  "quiz_completed",
  "clarifier_shown",
  "result_viewed",
  "printable_opened",
  "tracker_link_clicked",
  "share_clicked",
  "keep_noticing_submitted",
  "result_contributed",
] as const;
export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];
export const funnelEventValidator = v.union(...FUNNEL_EVENTS.map((e) => v.literal(e)));

export const consentsValidator = v.object({
  followUp: v.boolean(),
  dailyCheck: v.boolean(),
  productInfo: v.boolean(),
  rememberResult: v.boolean(),
});
