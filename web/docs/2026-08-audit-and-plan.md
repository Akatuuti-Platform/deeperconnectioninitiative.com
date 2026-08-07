# DCI Wellness site: audit and revamp plan

Phase 1 deliverable. Audit only, no code changed. Written 3 August 2026.
Verified against commit `4a24436` on `Akatuuti-Platform/deeperconnectioninitiative.com`.

---

## 1. Codebase map

**Stack.** SvelteKit 2.48 on Svelte 5 (runes: `$state`, `$props`, `$derived`), TypeScript,
Tailwind CSS v4 via `@tailwindcss/vite`. UI primitives from `bits-ui`, variants via
`tailwind-variants`, icons from `phosphor-svelte`. Motion from GSAP plus a custom
`use:reveal` action (`src/lib/actions/reveal.ts`). Leaflet powers the map on
`/connection-miles`. Deployed with `@sveltejs/adapter-vercel`; `web/vercel.json` pins the
framework preset to `sveltekit`.

**Routing.** File based, 19 page routes under `src/routes`. Six server endpoints:
`checkout/[slug]/+page.server.ts`, `contact/+page.server.ts`,
`payment/callback/+page.server.ts`, `performance/assessment/+page.server.ts`,
`api/flutterwave/webhook/+server.ts`, `sitemap.xml/+server.ts`.

**Where content lives.** All content is hardcoded in `.svelte` files, typically as a `const`
array at the top of each component. There is no CMS and no markdown. This is the single
biggest structural constraint on the revamp: every copy change is a code change and a
deploy.

Product data is duplicated in four places that must be kept in sync by hand:

| Location | Holds |
|---|---|
| `src/lib/server/flutterwave.ts` | Authoritative prices charged at checkout |
| `src/lib/components/pages/sections/toolkit.svelte` | Homepage cards: price, copy, Miles |
| `src/routes/toolkit/+page.svelte` | Toolkit page cards: price, copy |
| `src/routes/connection-miles/+page.svelte` | Product list: price |

Three things already have a single source of truth and should be the pattern for the rest:
`src/lib/payment-links.ts`, `src/lib/product-photos.ts`, and the server product catalog in
`src/lib/server/flutterwave.ts`.

**Checkout.** `src/lib/server/flutterwave.ts` holds the product catalog and the
`createPayment` and `verifyTransaction` calls. Flow: product CTA links to
`/checkout/[slug]`, which renders a one field express form (email only, plus a honeypot),
creates a Flutterwave payment server side with the price fixed server side, and redirects
to Flutterwave's hosted page. Return traffic hits `/payment/callback`, which re-verifies
the transaction against the Flutterwave API before showing success. Separately,
`/api/flutterwave/webhook` checks the `verif-hash` signature, re-verifies the transaction,
and emails the order to the team so fulfilment does not depend on the buyer returning.

**Forms and capture.** Three forms exist: contact, Blueprint assessment, and checkout. All
three deliver by email through Resend. **Nothing is stored.** There is no database, no
Supabase client, and no persistence layer of any kind in this codebase. Every lead the site
generates is an email in an inbox and nothing else.

**Analytics.** None. No Google Analytics, no Plausible, no PostHog, no Meta pixel. There is
no baseline against which to measure any change proposed in this document.

**Security posture.** `src/hooks.server.ts` sets baseline headers. Checkout has a honeypot.
The webhook validates its signature and re-verifies before trusting a payload.
`npm audit` reports zero vulnerabilities.

**SEO.** `src/lib/config/seo.ts` (per route titles and descriptions),
`src/lib/config/structured-data.ts` (organisation, events), `src/routes/sitemap.xml`.

---

## 2. Current funnel trace

### Individual buyer (healthiest path)

Home hero CTA `#toolkit` (anchor, same page) to product card to `/checkout/[slug]` to
Flutterwave to callback. Two clicks to pay. Capture: email, which reaches Flutterwave and
the order email, and is stored nowhere queryable.

Friction: `/toolkit` opens in browsing mode ("Explore the tools before choosing what
fits"), the full kit card carries no product photography while the three individual
products now have galleries, and there is no FAQ to answer delivery, contents, or payment
questions.

### Organisational buyer

No dedicated door in the four door entry. The only homepage route in is the `org-cta` band
("Running a school, company, or NGO?") to `/partners` to "Book a 30-minute call" to
`/contact`. Capture: contact email only.

Friction: the CTA says "book a call" but there is no calendar, so the visitor writes a
message and waits. There is no proposal, price guide, or one pager to take away.

### Champion candidate

**Two contradictory paths sell the same product.** `/champions` says "Apply for the next
cohort" and routes to the contact form. `/trainings` sells three certification tiers
(500,000 / 1,500,000 / 3,000,000 UGX) with direct checkout links. A visitor can either
apply and wait, or buy instantly, depending on which page they land on. This needs a
decision, not a copy fix.

### Sponsor

Over served. Eight public "Sponsor a kit" surfaces all converge on `/checkout/donate`.

### Someone in distress

Door 1 of four, first in the list and active by default, to `/contact`, to a form that
states a one to two working day response window. There is no crisis resources page, no
helpline number anywhere on the site, and no route to the Provider Network as a
destination (it appears only as a description inside two marketing sections).

This is simultaneously the positioning problem and a genuine safety gap. The current design
gives a distressed visitor the most prominent door on the site and then hands them a
two day inbox.

### Structural dead ends

- `/platform`, `/signin`, `/signup` are orphans: zero links from navigation or footer.
  They link only to each other, forming a closed loop of three "coming soon" pages.
  `/platform` was orphaned when the "Check-in" nav item was removed.
- The hero's primary CTA is an anchor, not a page, so it cannot be linked, shared, or used
  as an ad destination.
- Zero conversion actions are captured to storage. Purchases, applications, assessments,
  and enquiries all terminate in email.

---

## 3. Positioning audit

Every instance where the site reads as crisis response rather than prevention.

| # | File and line | Current | Proposed |
|---|---|---|---|
| 1 | `path-finder.svelte:16` | Door 1 label "I need support", first and active by default | Reorder: tools first. Keep support reachable, see safety note |
| 2 | `path-finder.svelte:20` | "Tell us what kind of support is needed." | "Find the right starting point." |
| 3 | `path-finder.svelte:22` | "Use the contact route when someone needs help finding the right DCI touchpoint, clinic, toolkit, or responsible referral." | Rewrite in second person: "Not sure where to start? Tell us what you are looking for and we will point you to the right part of DCI." |
| 4 | `path-finder.svelte:23` | Steps: "Share the situation", "We route it carefully", "You get the next step" | "Tell us what you need", "We point you to the right door", "You take the next step" |
| 5 | `hero-v2.svelte:8` | Ticker: "why me", "can't cope", "not sleeping" under the hero | Replace distress terms with pressure terms: "always on", "stretched thin", "no time to think" |
| 6 | `crisis-prevention.svelte` (whole section) | "The Crisis Prevention Model", stage 4 rendered as a labelled CRISIS box | Rename to **Connect. Equip. Understand.** Name the model after what DCI does. Reframe stage 4 as the cost of the gap, not a labelled endpoint |
| 7 | `crisis-prevention.svelte:76` | "targets the first three stages so the fourth rarely happens" | "works in the space where the outcome can still change" |
| 8 | `crisis-prevention.svelte:44` | "When everyday pressure becomes a clinical emergency, the cost, human and financial, multiplies." | Remove "clinical emergency". "When pressure goes unaddressed, the cost to people and organisations multiplies." |
| 9 | `partners/+page.svelte:34` | "reads signals across your whole organisation, so support moves first, before a crisis" | "helps your organisation notice patterns earlier, so support can move sooner" |
| 10 | `partners/+page.svelte:124` | "an early warning system before burnout hits" | "so earlier support becomes part of how you work" |
| 11 | `champions/+page.svelte:23` | "a quiet alert when something needs attention, before it becomes a crisis" | "a quiet prompt when patterns suggest someone may need extra support" |
| 12 | `platform/+page.svelte:29` | "Early detection, not crisis reaction" | "Notice earlier, support sooner" |
| 13 | `seo.ts:36` | "moves support before a crisis" | "so support can move sooner" |
| 14 | `get-involved.svelte:108`, `ecosystem.svelte:66`, `path-finder.svelte:22`, `volunteering:31` | "responsible referral" / "responsible signposting" | Reduce to one instance, on the proposed `/support` page. Elsewhere: "connect people to trained providers" |
| 15 | `founder.svelte:89` and `performance/+page.svelte:204` | "clinical-grade depth" | Clinical claim, must go. "four decades of behavioural health practice" |

**Keep unchanged:** `contact/+page.svelte:162` ("If someone is in immediate danger, contact
local emergency services"), `terms:26-27`, `privacy:43-45`. These are correctly placed
disclaimers and are part of the safety path.

**Door order recommendation.** Current: support, tools, train, help. Proposed: tools,
train, help, support. The support door stays, moves to last position, is rewritten in
second person, and is additionally surfaced as a persistent footer link plus a dedicated
`/support` page. Net effect: a first time visitor meets a product, a distressed visitor
still finds help from any page in one click. Do not ship the reorder before `/support`
exists.

---

## 4. Redundancy audit

| Duplication | Instances | Recommendation |
|---|---|---|
| Mission bullets vs ecosystem pillars | `mission.svelte:40-75` lists five items that are ecosystem pillars 1, 2, 3, 4 and 6 verbatim in shorter form | **Confirmed duplicate.** Cut the mission list. Ecosystem is richer and links out. Mission becomes a short philosophy statement only |
| Two philosophy sections | `mission.svelte` (eyebrow "The Philosophy", heading "Our Mission") and `logo-philosophy.svelte` (the DCI mark), both on the homepage | **Confirmed.** Keep both but differentiate: Mission answers "why we exist", the mark section answers "what the symbol means". Remove the "The Philosophy" eyebrow from Mission |
| "Sponsor a kit" | 8 public surfaces: nav desktop, nav mobile, `get-involved`, `toolkit` section, `ecosystem`, `connection-miles`, `/toolkit`, plus the product name | **Confirmed, over-indexed.** Keep two: the toolkit section and `get-involved`. Remove from navigation, where it currently competes with "Get the toolkit" |
| "10% funds champion training" | `toolkit.svelte:117`, `toolkit.svelte:243`, `ecosystem.svelte:139`, `trainings:161` | Three on the homepage is two too many. Keep `toolkit.svelte:117`. The `/trainings` instance is a different context and can stay |
| Conversation Clinics | Described in 9 files; three on the homepage (`mission`, `ecosystem`, `get-involved`) | Consolidate homepage mentions to one, pointing at the new `/clinics` |
| `get-involved` cards | Venue Partner, DCI Angel, Provider Network, Sponsor = ecosystem pillars 8, 6, 7 plus donate | **Confirmed duplicate.** Keep `get-involved` as the action layer, strip the descriptive copy that repeats ecosystem, or cut the section and add CTAs to the ecosystem pillars |

---

## 5. Link and navigation audit

**Broken links:** none. Every `href` anchor target resolves to an existing `id`.

**Orphan pages (unreachable from nav or footer):** `/platform`, `/signin`, `/signup`.

**Anchor-only links that should be pages:**
- Hero primary CTA `href="#toolkit"` (`hero-v2.svelte:73`). Should be `/toolkit#toolkit-products`
- Path finder doors 2 and 4 use `#toolkit` and `#get-involved`. Acceptable in place (the
  component is homepage only) but they cannot be used as campaign destinations

**Missing pages that are already being referenced externally:**
- `/clinics`, the printed flyer QR target. **This page does not exist and will 404.**
- `/faq`, referenced by no link but needed by every audience

**Navigation depth:** everything is within two clicks. No depth problem.

**Navigation gaps:** no support or help link anywhere in the header or footer. This becomes
a requirement once the support door moves out of first position.

---

## 6. Proposed information architecture

| Page | Funnel job | Status |
|---|---|---|
| `/` | Segment the visitor into one of four doors | Exists, reorder doors |
| `/clinics` | Flyer QR target, sell the 20,000 UGX clinic seat | **New** |
| `/clinics/check-in` | Capture the attendee, issue Miles, segment the lead | **New** |
| `/faq` | Remove purchase objections, define the vocabulary | **New** |
| `/support` | Safety path made explicit: crisis resources plus Provider Network | **New** |
| `/toolkit` | Sell products | Exists, switch from browsing mode to buying mode |
| `/checkout/[slug]`, `/payment/callback` | Take money | Exists, working |
| `/performance` | Sell coaching | Exists |
| `/performance/assessment` | Lead generation for coaching | Exists, add tier recommendation |
| `/performance/apply` | Convert application to booked engagement | **New**, port from the old Next.js app |
| `/partners` | Organisational lead generation | Exists |
| `/champions` + `/trainings` | Certification | **Merge.** They sell the same product two contradictory ways |
| `/events` | Calendar of one off sessions | Exists. `/clinics` becomes the recurring product page |
| `/connection-miles` | Explain the impact currency | Exists |
| `/volunteering` | Volunteer recruitment | Exists |
| `/contact` | Catch all enquiry | Exists, now intent aware |
| `/privacy`, `/terms`, `/accessibility` | Legal | Exists |
| `/platform`, `/signin`, `/signup` | None currently | **Cut or gate.** Three coming soon pages with no function |

---

## 7. `/clinics` specification

### Page content

1. **Hero.** Next clinic date, time, venue, seats remaining, price (20,000 UGX), primary
   CTA "Book your seat".
2. **What a clinic actually is.** Three steps in plain language. No jargon, no acronyms.
3. **Who it is for, and what it is not.** Explicitly: not therapy, not a treatment session,
   not a place where you have to speak if you do not want to.
4. **Who holds the room.** A trained Community Champion, and what that training covers.
5. **What you leave with.** Concrete outcomes.
6. **Miles.** What attending contributes, in plain language, no "+" notation.
7. **Upcoming dates.** The next three, each bookable.
8. **Quiet link to `/support`** for anyone who arrives needing more than a clinic.

### Booking

Reuses the existing express checkout. `/checkout/clinic` already exists at 20,000 UGX and
is live in the codebase. Additions needed: pass the clinic date through `meta` on the
Flutterwave payment so the order email states which date was booked, and add the date to
the callback confirmation.

### Check-in (the capture point)

Reached by QR code at the venue, `/clinics/check-in` or a short `/c/[code]`.

**Captures:** name, email, phone (optional), consent checkbox (explicit, unticked by
default), and one segmentation question: "What brought you here today?" with options
covering myself / my team or organisation / I want to facilitate.

**Jobs it performs:** records attendance, issues the attendance based Connection Miles,
captures a named lead who has already experienced the product, and segments that lead for
the next rung (toolkit, programme design, or champion certification).

**What it is not.** The check-in is not the Early Warning System and must not be described
as monitoring, detection, or intelligence. Data is pseudonymised at record level and
aggregated at cohort level. Never described as anonymised.

**Blocking dependency: there is no database.** Check-in requires persistence and this
codebase has none. Options:

- **(a) Supabase.** A project already exists (`hgxvjfnvtrotzuotaaoy`) and is used by the
  old Next.js application, which has 105 files of Supabase server actions including
  applications, assessments, checkout and an admin area. Recommended, but needs an access
  token and a schema review.
- **(b) Email only.** Ships fastest, loses the lead list, defeats most of the point.
- **(c) Vercel Postgres or KV.** Clean, but a second data home alongside the Supabase the
  organisation already runs.

---

## 8. Risk register

**Blocking, decide before build starts**

1. **No database.** Check-in cannot ship without a storage decision. See 7 above.
2. **The domain is not connected to this codebase.** deeperconnectioninitiative.com is
   still served by a separate Vercel project holding the old Next.js site. **The printed
   flyer QR pointing at `/clinics` will 404 no matter what we build here**, until the
   domain cutover happens. Given the flyer is going to print, this is now the highest
   urgency item in this document.
3. **Cutover has a data consequence.** The old application holds real records
   (applications, assessments, orders, admin). Cutting the domain to the new site takes
   that offline unless it is deliberately ported.

**Content conflicts, need a human answer**

4. **Journal price.** Site says 100,000 UGX in three files. Internal documentation says
   120,000. The printed flyer supplied earlier says 100,000. Flagged, not changed.
5. **Clinic Miles rubric conflict.** This brief states 10 base Miles plus 1 per attendee
   check-in. `connection-miles/+page.svelte:104-105` states "Attend a clinic: 1 mile" and
   "Facilitate a clinic: 5 miles". These are incompatible.
6. **Partner list conflict.** `founder.svelte:13-15` names UPFMH, Butabika National
   Referral Hospital, Ministry of Education Uganda. The separate internal list names
   Ministry of Education and Sports, Nnabagereka Development Foundation, Public Relations
   Association of Uganda, Yujo Izakaya. Not merged, flagged.
7. **Champions versus trainings.** Apply and wait, or buy instantly. Same product, two
   contradictory paths.

**Claims discipline**

8. **EWS claims exceed what is live.** `/partners` and `/platform` describe signal reading
   and early detection in the present tense. The system is being finalised. The paper
   tracker, referral procedure and de-escalation checklist can be described in the present
   tense; automated flagging and dashboards cannot.
9. **"Clinical-grade depth"** appears twice and is a clinical claim.

**Safety**

10. **Do not reorder the doors before `/support` exists.** The mitigation must ship first
    or ahead of the change, not after it.
11. **Crisis resource numbers must be verified by a human.** Do not publish helpline
    numbers that have not been confirmed as current and appropriate.

**Operational**

12. **No analytics.** Every claim in this plan is currently unmeasurable. Recommend
    installing analytics before the redesign so a baseline exists.
13. **Hardcoded events decay.** The events page is a hand edited array. A monthly clinic
    needs generated dates or it will read as abandoned.
14. **Content is code.** Every copy fix needs a developer and a deploy. Worth a decision on
    whether a light CMS is in scope.

---

## 9. Implementation plan

Ordered. "Safe" means it can be automated and verified without a judgement call. "Review"
means a human must approve the output.

| # | Work | Effort | Class |
|---|---|---|---|
| 0 | Domain cutover and env vars | Blocked on third party | Review |
| 1 | Install analytics, establish baseline | 1 hour | Safe |
| 2 | `/support` page: crisis resources, Provider Network, persistent footer link | 3 hours | **Review** (numbers must be verified) |
| 3 | `/clinics` page plus booking wiring | 5 hours | Safe |
| 4 | Check-in capture plus storage | 8 hours | **Review** (needs storage decision, handles personal data) |
| 5 | `/faq` | 3 hours | Review (answers must be factually approved) |
| 6 | Positioning and language changes, items 1 to 15 in section 3 | 4 hours | Review |
| 7 | Rename the model to Connect, Equip, Understand | 2 hours | Review |
| 8 | Door reorder (only after item 2 ships) | 1 hour | Review |
| 9 | Redundancy removal per section 4 | 4 hours | Safe |
| 10 | Nav and orphan fixes, hero CTA to a real page | 2 hours | Safe |
| 11 | Merge `/champions` and `/trainings` | 3 hours | **Review** (needs the apply vs buy decision) |
| 12 | `/performance/apply`, ported from the old app | 5 hours | Review |
| 13 | Recurring clinic date generation | 3 hours | Safe |

---

## 10. Decisions log

Recorded 3 August 2026.

| Question | Decision |
|---|---|
| Journal price | **100,000 UGX.** Site is already correct, internal 120,000 figure is superseded |
| Champion certification: apply or buy | **Buy with a 30 percent deposit, joining a waitlist.** Training dates to be announced. Resolves the champions versus trainings conflict in favour of purchase |
| Deposit amounts | Foundation 150,000, Advanced 450,000, Master Trainer 900,000 |
| Clinic cadence | **Last Wednesday of every month.** Dates to be generated, not hardcoded |
| Clinic venue | Yujo Izakaya Restaurant, as the venue for the monthly clinic |
| Venue Partner programme | **No partners signed yet.** Do not publish venue partner claims |
| Flyer QR | Re-inserted after the revamp. No print deadline on `/clinics` |
| Check-in storage | Supabase project `zjymbkmhvmokkldfwzxk`, new and empty. Anon key supplied, service_role key outstanding |

**Still open:** clinic Connection Miles rubric, Supabase service_role key, seat capacity per
clinic, verified crisis helpline numbers, and the "Trusted alongside" institutional list.
