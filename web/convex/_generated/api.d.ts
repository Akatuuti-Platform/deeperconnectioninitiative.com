/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as aggregate from "../aggregate.js";
import type * as contacts from "../contacts.js";
import type * as crons from "../crons.js";
import type * as followUp from "../followUp.js";
import type * as http from "../http.js";
import type * as lib_crypto from "../lib/crypto.js";
import type * as lib_emails from "../lib/emails.js";
import type * as lib_time from "../lib/time.js";
import type * as lib_validators from "../lib/validators.js";
import type * as limits from "../limits.js";
import type * as retention from "../retention.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  aggregate: typeof aggregate;
  contacts: typeof contacts;
  crons: typeof crons;
  followUp: typeof followUp;
  http: typeof http;
  "lib/crypto": typeof lib_crypto;
  "lib/emails": typeof lib_emails;
  "lib/time": typeof lib_time;
  "lib/validators": typeof lib_validators;
  limits: typeof limits;
  retention: typeof retention;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  rateLimiter: import("@convex-dev/rate-limiter/_generated/component.js").ComponentApi<"rateLimiter">;
};
