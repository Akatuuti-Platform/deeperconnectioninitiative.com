import { defineApp } from "convex/server";
import { v } from "convex/values";
import rateLimiter from "@convex-dev/rate-limiter/convex.config";

// Environment variables for the Mental Models backend. Set them per deployment with
// `npx convex env set NAME value`. None of them may ever be committed.
const app = defineApp({
  env: {
    // Shared with the SvelteKit server only. Every data endpoint requires it.
    MM_SERVER_SECRET: v.optional(v.string()),
    // Signs the confirm and stop links in emails.
    MM_LINK_KEY: v.optional(v.string()),
    // Keys the contact hash used for de-duplication and the suppression list.
    MM_HASH_KEY: v.optional(v.string()),
    // Public site address used in email links, e.g. https://www.deeperconnectioninitiative.com
    SITE_URL: v.optional(v.string()),
    RESEND_API_KEY: v.optional(v.string()),
    // A sender on a domain verified in Resend, e.g. "DCI Wellness <hello@deeperconnectioninitiative.com>"
    MM_FROM_EMAIL: v.optional(v.string()),
    // Development deployments only: "true" logs email links when no Resend key is set.
    MM_DEV_ECHO_LINKS: v.optional(v.string()),
  },
});

app.use(rateLimiter);

export default app;
