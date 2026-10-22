# Mental Models Scorecard: launch readiness and conversion recommendation

Prepared for approval. Status: approved and built locally (see section 8). Nothing is committed, pushed or deployed to production.

## 1. What needs your approval

1. The conversion pathway: **free follow-up first, physical Mood Tracker second, EWS as a waitlist for communities, not individuals** (section 3).
2. The opt-in data design and the 18+ rule for contact collection (section 4).
3. The claims wording in section 5, including changes to existing hero and EWS page copy.
4. The ordered list of changes in section 7, once the blockers in section 6 have owners.

## 2. Positioning

**Hero button: done locally.** It now reads "Find out how you respond to stress" (was "Take the free scorecard"). It is stronger because it names a felt outcome instead of a product type.

**Headline: keep "When stress hits, how do you respond?" Do not switch to "What is your mental model?"** Reasons:
- "Mental model" is a thinking-skills term. Many visitors will not know it, and to some it sounds like "mental health" or "role model".
- It promises a single identity ("my model"). The product's own principle is that a Model is a changeable pattern, and the question wording pulls the other way.
- The scorecard measures how people respond to pressure, not how they reason. "How do you respond" says that directly, and it is the consultant's lead question.
- It does not mention stress, the problem the visitor actually has.

Use "DCI Mental Models" as the product name (eyebrow and Model pages) with a one-line gloss: "Ten common ways people respond to stress." If you want evidence, test three headlines in the pilot (current, "What is your mental model?", "How do you respond to stress?") and compare start rates.

## 3. Conversion strategy

### What is true today (audited)
- **Mood Tracker:** 31,000 UGX (about US$8 to 9; check today's rate), one colour a day for twelve months, paid through Flutterwave (Mobile Money or card). The checkout collects an email only. After payment the buyer is told "we will follow up with the next steps shortly." There is no delivery address, area, cost or timeline anywhere, and fulfilment is a manual email to the DCI team. Flutterwave keys in the local environment are non-test, so real payments are live.
- **EWS:** the site's own pages say "Coming soon". Sign-in and sign-up are disabled placeholders. By design the EWS activates "when sufficient community participation occurs" (mood tracking, Champion certification, clinic attendance). It is a community and organisation system, with alerts going to a Champion. There is no individual EWS product to invite a visitor into today.
- **Who this quiz reaches:** people who are already online with data. DataReportal put Uganda at 28 percent internet users at the start of 2025 and 22 percent at the end of 2025 (revised), UCC reports smartphones at roughly a third of devices, and GSMA found only 22 percent actively use mobile internet despite 96 percent coverage. Mobile money is widespread (about 34 million accounts, GSMA). Data costs are material (one secondary source attributes about 6 percent of monthly income for 1GB to A4AI; I could not confirm it on A4AI's own site).

### The two pathways compared

| | Product-led: buy the Mood Tracker | Digital-first: join the EWS |
|---|---|---|
| Affordability | 31,000 UGX is real money for many Ugandan households. Mobile Money helps. | Free to the user, but data costs apply |
| Fit with the quiz | Strong. "How do I respond" leads naturally to "notice it daily" | Weak. The EWS is a community system, not a personal tool |
| Available today | Yes, but fulfilment is undefined | **No.** Accounts are not open |
| Logistics | Manual fulfilment, no address captured, no delivery promise | None, once it exists |
| Scalability | Limited by manual fulfilment and stock | High, once built |
| Long-term engagement | Strong if the habit sticks, silent if it does not (no reminder channel) | Strong in theory, needs a live product and a community |
| Claims risk | Low | **High.** Promising early warning to an individual with no community behind it overpromises |
| Reaches offline majority | Yes (physical, clinics) | No |

### Recommendation: offer both, in sequence, and do not lead with either

1. **Result page, first ask (free):** "Keep noticing." Two opt-in choices: a three-month re-check reminder, and a free 14-day mood check mirroring the Mood Tracker ("one colour a day"), delivered by email or WhatsApp, or as a printable page for people who prefer paper. This works today, builds the habit, earns consent, and creates the audience for the paid product.
2. **Second ask (low pressure):** the physical Mood Tracker, offered inside that sequence (for example on day 3 and day 14) and as a quiet link on the result page, with price, "how it reaches you" and Mobile Money stated up front. Fix fulfilment first (blocker B8).
3. **EWS:** present it as "how communities spot trouble earlier", with a waitlist for **organisations, schools and Champions**, the people it is actually built for. Individuals can say they would like it for their community. Do not offer individual EWS accounts until they exist.
4. **By audience:**
   - Ugandan individuals: free follow-up, then the Mood Tracker with Mobile Money.
   - Wider and diaspora audiences: digital follow-up and the free 14-day check, then a "sponsor a kit" option. International shipping of a 31,000 UGX item is unlikely to work.
   - Organisations and educators: EWS and Champion conversation through the partners page.

This is the strongest approach because the free step removes affordability and logistics as barriers at the moment of highest interest, the paid step follows once trust and a habit exist, and the claims stay inside what exists.

### What to measure (no conversion numbers are promised; none are known)
Quiz started, completed, clarifier shown, result viewed, follow-up opt-in rate, 14-day check completion, three-month return, Mood Tracker checkout starts and purchases, by traffic source. **Decision gates:** if the follow-up opt-in rate or three-month return is very low, change the offer before spending on traffic; if checkout starts are healthy but payments stall, the problem is fulfilment trust, not the quiz.

## 4. Data and follow-up design on Convex (opt-in, informed, separated)

Convex is the backend. It is installed in `web/convex/` with an empty schema, and this section replaces the earlier Supabase design. Nothing below is built until you approve it.

### 4.1 How Convex shapes the design
- **Convex functions are public by default.** Anything registered as `query`, `mutation` or `action` can be called by anyone who knows the deployment address. So the rule is: **no public function touches personal or aggregate data.** Every data function is `internalQuery`, `internalMutation` or `internalAction`. The only public doors are two or three `httpAction` endpoints in `convex/http.ts`, each checking a shared secret that only the SvelteKit server holds, validating every field, and returning 400 on a bad body.
- **The browser never talks to Convex.** SvelteKit form actions call those endpoints server to server. That is where Cloudflare Turnstile and the honeypot are checked, so abuse is stopped before it reaches the database.
- **One deployment is one database.** Anyone with access to a deployment can read every table in it, so separation between identifiable and aggregate data is only as strong as the deployment boundary (see 4.2).
- **Scheduling is built in.** A daily cron replaces Vercel Cron.
- **Convex has no count operator**, which suits a counts-only aggregate (4.3).
- **Region.** Convex offers US East (N. Virginia) and EU West (Ireland), chosen when a deployment is created and not changeable afterwards. Neither is in Uganda, so this is a cross-border transfer under Ugandan law. Agreed: **EU West (D2).** Convex staff have said informally that it is SOC 2 and GDPR compliant, but I found no official report or Data Processing Agreement. Get both from Convex, plus its sub-processor list, and confirm backups and logs stay in the chosen region.

### 4.2 Separation: one project, with safeguards (agreed, D1)
One Convex project is enough for the pilot, because the aggregate holds counts only (4.3), so there are no individual rows to link back to a contact. The safeguards that make one project safe:
- Aggregate as counts only, never a row per person.
- Week-level time on counts, and the count and the contact written in separate requests, so timing cannot re-link them.
- Aggregate and contact code in separate folders, with no import between them and no shared field.
- No personal data in logs.
- People who analyse results get a counts report, not dashboard access.

**Move to two projects only if** outside people (researchers, the consultant) need direct access to aggregate data, or if row-level research data is stored later. Note that Convex access is organised by team, so two projects under one team may not keep the same people out; I have not verified Convex's per-project permissions. Because the code is already in separate folders, splitting later is straightforward.

### 4.3 What is stored
1. **Aggregate counts (no individual records).** The table `aggregateCounts` has one document per distinct combination of: content version, week, primary Model, secondary Model, clarity, and optional coarse age band and region. Each opt-in adds 1 to a counter. **A person's answers are never stored as a row**, so there is nothing to re-link. Time is the week only. The report function suppresses any cell under 10 people ("fewer than 10") and merges small cells upward. The stress state is a health-status signal, so it is contributed only under its own separate tick, as a bucket (steady, strained, overwhelmed). Counters are fine at pilot volume; shard later if needed.
2. **Contacts** (`contacts`): the email or WhatsApp number, optional first name, status (pending, active, completed, withdrawn), a hashed confirmation token, the follow-up due date, the consents given, the consent text version, and a keyed hash of the contact for de-duplication. **It does not store the quiz result by default.** A separate tick, "remind me what my result was", stores the Model on the contact, for that purpose only.
3. **Consent log** (`consentEvents`, append-only): what was granted, updated or withdrawn, the consent wording version, and when. It stores the keyed contact hash, not the contact, so it survives deletion.
4. **Suppression list** (`suppressions`): the keyed hash of anyone who withdrew, so they are never emailed or re-added. No other personal data is kept.
5. **Pilot feedback** stays as built: anonymous, by email through the SvelteKit server.

### 4.4 Consent flow (what the person sees)
Plain-language box after the result, nothing pre-ticked, each choice separate and withdrawable: (a) remind me in three months, (b) send me the free 14-day check, (c) tell me about the Mood Tracker, (d) contribute my result anonymously, (e) remind me what my result was. A short notice says who DCI is, what is stored and for how long, who processes it (Convex, Resend, Vercel, Cloudflare), that it can be withdrawn or deleted at any time, and that nothing changes the result. Contacts use double opt-in. **People who do not confirm they are 18 or older can use everything except contact collection**, which is the conservative reading of the law (4.8). A guardian-consent route can come later, possibly through Champions.

### 4.5 The three-month follow-up
1. **Request:** SvelteKit checks Turnstile, then calls the secret-protected endpoint, which creates a `pending` contact and emails a confirmation link.
2. **Confirm:** the link activates the contact and sets the due date to 90 days later. An immediate email carries what they chose (their summary, a calendar reminder, the free 14-day check).
3. **Send:** a daily cron finds due contacts using an index on status and due date, in bounded batches, and sends one short email from an internal action ("It has been three months. How do you tend to respond to stress now? Retake it, and compare if you kept your result."). Each contact is marked as it is sent so running the job twice never sends twice. No further reminder is sent after the three-month email.
4. **Stop:** every email has a one-click link that deletes the person's details, keeps only the suppression hash, and logs the withdrawal.
5. **Retention:** contacts are deleted 30 days after the follow-up ends, or at 12 months, or on withdrawal, whichever is first. Aggregate counts are kept.
6. **Channel:** email is automated. WhatsApp is user-initiated only in the first version (a "message us to be reminded" link), because automated business messaging needs approved templates and extra cost.
7. **Sender:** a verified DCI sending domain is required. The existing code's fallback sender only delivers to the Resend account owner (blocker B5). The Resend key lives in Convex environment variables.

### 4.6 Security controls specific to Convex
- No public data functions, validators on every function, shared secret compared in constant time, Turnstile verified server side.
- Rate limiting with the `@convex-dev/rate-limiter` component, keyed by the contact hash and by a short-lived keyed hash of the IP (daily rotating secret), never the raw IP.
- **No personal data in logs.** Function logs and the dashboard are readable by team members, so never log arguments.
- Named dashboard admins only, with two-factor sign-in on their accounts. Separate development and production deployments, and never copy production data into development.
- Secrets in Convex environment variables, typed in `convex.config.ts`, never in code.
- **Deletion is not instant everywhere.** A deleted document leaves the live database at once, but backups and snapshots keep it until they expire. Confirm Convex's retention period and say so in the privacy notice.

### 4.7 Tests to add
Using `convex-test` with Vitest (edge-runtime): the public API exposes no data function; endpoints reject a missing or wrong secret; contact capture requires the 18 or older confirmation; no email is sent before confirmation; withdrawal deletes personal data and leaves only a suppression; running the cron twice sends one email; cells under 10 are suppressed; aggregate cells hold no personal field; and, if one project is used, the aggregate and contact tables share no field.

### 4.8 Legal prerequisites (I am not a lawyer; get counsel)
Uganda's Data Protection and Privacy Act, 2019: consent must be freely given, specific, informed and unambiguous (section 8 and the definitions); processing a child's data needs a parent or guardian's prior consent (section 8, with limited exceptions); health status is "special personal data" with a default prohibition (section 9, exceptions not checked by me); and the 2021 Regulations provide for registration with the Personal Data Protection Office at NITA-U. Also check cross-border transfer rules now that Convex, Resend, Vercel and Cloudflare process outside Uganda, and whether a data protection impact assessment is expected. Convex, Resend and the others belong in the privacy notice as processors.

### 4.9 Decisions (agreed)
| | Decision | Agreed |
|---|---|---|
| D1 | One Convex project or two | One, with the safeguards in 4.2; two only if outsiders need aggregate access |
| D2 | Convex region | EU West (Ireland). Set it before the deployment is created; it cannot be changed later |
| D3 | Contact retention | Deleted 30 days after the follow-up ends, or at 12 months, or on withdrawal, whichever is first |
| D4 | Aggregate data | Counts only, never individual rows |
| D5 | WhatsApp | User-initiated link only for now; automated messaging later |
| D6 | Dashboard access | Two named people, with two-factor sign-in. Names to be confirmed |

Still open in section 1: the conversion pathway, the 18 or older rule for contact collection, and the claims wording.

## 5. Accuracy and prevention language

**Principles.** The scorecard is a reflection on how someone tends to respond, not a measurement of how they are. It does not diagnose, screen or predict. Mood tracking and the EWS do different jobs and none is validated as a predictor.

**Suggested approved wording** (for the landing page, results and follow-up emails):
> "The scorecard is a snapshot of how you tend to respond when stress hits. It is not a diagnosis, and it cannot tell you what will happen. Tracking your mood over time shows you how you actually are, day to day, so you can notice a pattern sooner. For communities, the DCI Early Warning System looks at shared patterns so people can step in earlier. These are tools for awareness and earlier conversations. They are not tests, and we have not shown they predict a crisis."

**Avoid:** diagnose, screen, assess your mental health, accurate, detects, predicts, risk score, "your result means you are...", any outcome promise ("reduces", "prevents") without evidence.

**Existing copy that conflicts, to review before sending traffic to the quiz:**
- Hero text: "an AI-powered early warning system for earlier support and intervention."
- `/platform`: "Real-time emotional data, aggregated and analysed by AI," "Early detection, not crisis reaction."
- Both describe a system that is "coming soon". Suggested direction: describe what exists (tools, conversation, referral) and call the EWS "being built with communities."

## 6. Launch readiness audit

### Blockers (do not launch publicly without these)
| # | Finding | Owner | Effort |
|---|---|---|---|
| B1 | **Support pathway is not crisis-ready.** `/support` has no verified local helplines or emergency numbers (pending Restless). It shows a DCI phone number, but nothing says who answers, when, or what happens when someone discloses risk. Needs verified contacts, staffed hours and a disclosure procedure. | Restless, DCI lead | M |
| B2 | **Privacy policy is inadequate.** About 410 words; no mention of the Data Protection Act, the regulator, children, health or sensitive data, consent, retention, third-party processors, analytics, or international transfers. It says "[email protected]" for contact. A rewrite plus a scorecard-specific notice at the point of collection is required. | Counsel, DCI | M |
| B3 | **Safeguarding and ethics sign-off outstanding** for a youth pilot, including consent for under-18s and the anonymous comment box. | DCI, ethics advisor | M |
| B4 | **Clinical review outstanding** of the Overwhelmed pause and the "not feeling safe" note, and of all 60 option wordings. | Clinician, consultant | S |
| B5 | **Email delivery is unverified.** I cannot see Vercel's environment. If `RESEND_API_KEY` or a verified sender is missing in production, feedback is lost, and so are the **existing** order notification emails (payments received, team not told). Follow-up emails will also need the key and a verified domain in the Convex environment. | Developer | S |
| B6 | **No way to measure the funnel.** Only Vercel's page-view analytics is installed, with no custom events. Add privacy-safe aggregate events (or check that your Vercel plan supports custom events). | Developer | S |
| B7 | **Claims conflict** with section 5 (hero subline, `/platform`). | DCI, consultant | S |
| B8 | **Mood Tracker fulfilment is undefined.** No address, area, cost or timeline; "next steps shortly"; manual email. The first quiz-driven purchase exposes this. Real payments are live, so I have not tested a purchase. | DCI operations | M |
| B9 | **Host mismatch** (carried over from the earlier audit): canonical, sitemap and share URLs say the non-`www` address, which redirects to `www`. | Developer | S |

### Essential fixes (before launch, not blocking)
| # | Finding | Effort |
|---|---|---|
| E1 | **No rate limiting** on the feedback endpoint (honeypot only). Add Cloudflare Turnstile (Cloudflare is already in front of the domain) or a simple limiter. Needed before any contact form. | S |
| E2 | **No Content Security Policy.** Other security headers are present. Add CSP, allowing Vercel Analytics and the YouTube embed. | S |
| E3 | The Learn step links to the Toolkit section, not the Mood Tracker with price. Add the price and a direct link, and state how it reaches the buyer. | S |
| E4 | Test with a screen reader, on a throttled mobile connection and a low-end Android phone. Check reading level and consider a local-language version. | M |
| E5 | The support number is shared with the parent company (Utalii). Confirm a DCI-specific, monitored line. | S |
| E6 | Pilot plan: who tests, how many, what counts as success, and who reads the feedback email. | S |

### What is already sound
Results private by default and in memory only; storage and sharing opt-in; share card minimal (a test checks it); stress state structurally excluded from scoring (a test checks it); no em dashes (a test checks it); draft pages `noindex` and out of the sitemap; 47 tests, clean type check and production build; no failed requests or horizontal scroll on a 390px phone; environment files are git-ignored; HTTP security headers (HSTS, nosniff, frame, referrer) are set; every internal link and sitemap page on the live site returns 200.

## 7. Changes to build after approval (in order)
1. Copy and claims: approved wording on the landing and result pages, headline decision, hero and `/platform` claims review (B7).
2. Result-page "Keep noticing" block with the five consent choices, and a printable 14-day check (no database needed for the printable).
3. Data layer: the Convex schema, internal functions and the secret-protected endpoints from section 4, in the project or projects you choose in D1, with the region from D2. Schema and deployments are created only after your explicit go-ahead.
4. Opt-in flow: Turnstile, double opt-in, unsubscribe and delete links, the daily follow-up cron, and the retention job.
5. Privacy-safe funnel events (B6) and an aggregate report view that suppresses small groups.
6. Mood Tracker: price and delivery information on the Learn step, address or pickup capture at checkout (after B8 is decided).
7. Host fix (B9) and CSP (E2).
8. Re-run tests, add tests for consent, separation and suppression, then a full review before any publish.

## 8. Build status and production setup

### Built and verified (local, against the Convex dev deployment in EU West)
| Item | Status |
|---|---|
| Copy and claims (B7): hero subline, `/platform`, landing accuracy wording, hero button "Find out how you respond to stress" | Done |
| "Keep noticing" on the result page: free printable 14-day check, opt-in reminders (18+ only, double opt-in), separate anonymous count, Mood Tracker with price, EWS pointer for organisations | Done, tested in the browser |
| Convex backend: schema, internal-only functions, secret-protected endpoints, signed email links, counts-only aggregate with groups under 10 hidden, rate limits, daily follow-up and retention crons | Done; 17 backend tests |
| Confirm and stop pages (button press required, so link scanners cannot act), one-click unsubscribe header | Done, tested end to end |
| Scorecard privacy notice at `/mental-models/privacy` | Draft, labelled for legal review |
| Funnel counts (B6): anonymous daily counts per step, no identifier | Done |
| Host fix (B9): canonical, sitemap, social cards, robots.txt and llms.txt now use `www` | Done |
| Content Security Policy (E2) | Done; checked on 12 pages of a production build with no violations |
| Rate limiting (E1); Turnstile ready once keys are set | Done |
| Mood Tracker price and link (E3) | Done; no delivery promise until B8 is decided |

Tests: 68 passing (47 site, 17 backend, 4 backend structure). Type check clean. Production build clean.

### Production setup (in this order, before any launch)
1. Convex: in team settings, set the default region to **EU West**, then create the production deployment from `web/` with `npx convex deploy`.
2. Convex production environment (new values, never the dev ones): `MM_SERVER_SECRET`, `MM_LINK_KEY`, `MM_HASH_KEY`, `SITE_URL=https://www.deeperconnectioninitiative.com`, `RESEND_API_KEY`, `MM_FROM_EMAIL` on a Resend-verified DCI domain. **Do not set `MM_DEV_ECHO_LINKS` in production.**
3. Vercel environment: `PUBLIC_CONVEX_SITE_URL` (the production `.convex.site` address), `MM_SERVER_SECRET` (same as step 2), `MM_RATE_SALT`, `TURNSTILE_SECRET_KEY` and `PUBLIC_TURNSTILE_SITE_KEY` (from Cloudflare), and the existing `RESEND_API_KEY` and `CONTACT_*` values.
4. Decide how Convex code reaches production: by hand with `npx convex deploy`, or automatically in the Vercel build with a Convex deploy key.
5. Check Flutterwave's webhook address. A code comment said it pointed at the non-`www` address, which redirects; payment webhooks may not follow redirects, so order emails could be missing. It should be `https://www.deeperconnectioninitiative.com/api/flutterwave/webhook`.

### Still open before public launch
- B1 verified support contacts and a disclosure procedure; B2 the general privacy policy rewrite and legal review of the scorecard notice; B3 and B4 safeguarding, ethics and clinical sign-off; B8 Mood Tracker fulfilment; D6 the two admin names; Convex's Data Processing Agreement and SOC 2 report.
- The draft pages stay `noindex` and out of the sitemap until these are closed.

## 9. Sources
- Uganda Data Protection and Privacy Act, 2019 (ULII): https://www.ulii.org/akn/ug/act/2019/9
- DataReportal, Digital 2026 Uganda: https://datareportal.com/reports/digital-2026-uganda
- DataReportal, Digital 2025 Uganda: https://datareportal.com/reports/digital-2025-uganda
- UCC Q3 2025 market report coverage: https://pctechmag.com/2025/12/ucc-report-ugandas-digital-footprint-grows-modestly-in-q3-2025/
- GSMA Uganda report coverage: https://businesstimesug.com/?p=15299
- Data cost coverage (secondary, unverified against A4AI): https://nymynet.com/internet-in-uganda-is-too-expensive-for-the-average-citizen/
- Convex regions (US East and EU West): https://docs.convex.dev/production/regions
