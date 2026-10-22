import { RateLimiter, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

// Keys are never raw personal data: a keyed hash of the contact, or a daily-rotating keyed
// hash of the visitor's network address computed by the SvelteKit server.
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  contactPerAddress: { kind: "fixed window", rate: 3, period: HOUR },
  contactPerSource: { kind: "fixed window", rate: 10, period: HOUR },
  resultPerSource: { kind: "fixed window", rate: 20, period: HOUR },
  eventPerSource: { kind: "token bucket", rate: 300, period: HOUR, capacity: 60 },
  linkPerSource: { kind: "fixed window", rate: 30, period: HOUR },
});
