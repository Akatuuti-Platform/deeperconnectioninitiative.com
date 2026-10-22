import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 05:00 and 05:30 UTC are 08:00 and 08:30 in Kampala.
crons.cron("send due follow-up emails", "0 5 * * *", internal.followUp.runDue, {});
crons.cron("delete expired contacts and old consent records", "30 5 * * *", internal.retention.purge, {});

export default crons;
