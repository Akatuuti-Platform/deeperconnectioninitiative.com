export const MINUTE = 60_000;
export const DAY = 86_400_000;

/** The Monday (UTC) of the week containing `ms`, as YYYY-MM-DD. Aggregates never store finer time. */
export function weekStart(ms: number): string {
  const d = new Date(ms);
  const offset = (d.getUTCDay() + 6) % 7;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - offset))
    .toISOString()
    .slice(0, 10);
}

export function dayString(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
