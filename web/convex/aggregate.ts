// Anonymous aggregate counts. This file must never import contact code: the two kinds of
// data stay apart by construction. Every function here is internal.
import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import {
  modelValidator,
  clarityValidator,
  ageBandValidator,
  regionValidator,
  stateBucketValidator,
  funnelEventValidator,
} from "./lib/validators";
import { weekStart, dayString } from "./lib/time";

/** Any group smaller than this is reported as "fewer than 10", never as a number. */
export const MIN_REPORTED = 10;

export const addResult = internalMutation({
  args: {
    contentVersion: v.string(),
    primary: modelValidator,
    secondary: v.union(modelValidator, v.null()),
    clarity: clarityValidator,
    ageBand: v.union(ageBandValidator, v.null()),
    region: v.union(regionValidator, v.null()),
    stateBucket: v.union(stateBucketValidator, v.null()),
  },
  returns: v.null(),
  handler: async (ctx, a) => {
    const week = weekStart(Date.now());
    const contentVersion = a.contentVersion.slice(0, 24);
    const cellKey = [contentVersion, week, a.primary, a.secondary ?? "-", a.clarity, a.ageBand ?? "-", a.region ?? "-", a.stateBucket ?? "-"].join("|");
    const existing = await ctx.db
      .query("aggregateCounts")
      .withIndex("by_cellKey", (q) => q.eq("cellKey", cellKey))
      .unique();
    if (existing) {
      await ctx.db.patch("aggregateCounts", existing._id, { count: existing.count + 1 });
    } else {
      await ctx.db.insert("aggregateCounts", { ...a, contentVersion, cellKey, week, count: 1 });
    }
    return null;
  },
});

export const addEvent = internalMutation({
  args: { event: funnelEventValidator },
  returns: v.null(),
  handler: async (ctx, { event }) => {
    const day = dayString(Date.now());
    const cellKey = `${day}|${event}`;
    const existing = await ctx.db
      .query("funnelCounts")
      .withIndex("by_cellKey", (q) => q.eq("cellKey", cellKey))
      .unique();
    if (existing) await ctx.db.patch("funnelCounts", existing._id, { count: existing.count + 1 });
    else await ctx.db.insert("funnelCounts", { cellKey, day, event, count: 1 });
    return null;
  },
});

type Tally = Record<string, number>;

function suppress(t: Tally): Record<string, number | "fewer than 10"> {
  return Object.fromEntries(Object.entries(t).map(([k, n]) => [k, n < MIN_REPORTED ? "fewer than 10" : n]));
}

/**
 * Counts of opted-in results between two weeks (YYYY-MM-DD Mondays, inclusive), as one
 * total and one table per dimension. Individual cells are never returned, so hidden small
 * groups cannot be recovered by subtracting one table from another.
 * Run with: npx convex run aggregate:report '{"fromWeek":"2026-10-12","toWeek":"2026-12-28"}'
 */
export const report = internalQuery({
  args: { fromWeek: v.string(), toWeek: v.string() },
  handler: async (ctx, { fromWeek, toWeek }) => {
    const rows = await ctx.db
      .query("aggregateCounts")
      .withIndex("by_week", (q) => q.gte("week", fromWeek).lte("week", toWeek))
      .take(10_000);
    const dims = { primary: {} as Tally, secondary: {} as Tally, clarity: {} as Tally, ageBand: {} as Tally, region: {} as Tally, stateBucket: {} as Tally, contentVersion: {} as Tally };
    let total = 0;
    for (const r of rows) {
      total += r.count;
      for (const d of Object.keys(dims) as (keyof typeof dims)[]) {
        const key = String(r[d] ?? "not given");
        dims[d][key] = (dims[d][key] ?? 0) + r.count;
      }
    }
    return {
      fromWeek,
      toWeek,
      total: total < MIN_REPORTED ? "fewer than 10" : total,
      byPrimary: suppress(dims.primary),
      bySecondary: suppress(dims.secondary),
      byClarity: suppress(dims.clarity),
      byAgeBand: suppress(dims.ageBand),
      byRegion: suppress(dims.region),
      byStateBucket: suppress(dims.stateBucket),
      byContentVersion: suppress(dims.contentVersion),
      truncated: rows.length === 10_000,
    };
  },
});

/** Funnel step counts per event between two days (YYYY-MM-DD, inclusive). */
export const funnelReport = internalQuery({
  args: { fromDay: v.string(), toDay: v.string() },
  handler: async (ctx, { fromDay, toDay }) => {
    const rows = await ctx.db
      .query("funnelCounts")
      .withIndex("by_day", (q) => q.gte("day", fromDay).lte("day", toDay))
      .take(10_000);
    const totals: Tally = {};
    for (const r of rows) totals[r.event] = (totals[r.event] ?? 0) + r.count;
    return { fromDay, toDay, totals };
  },
});
