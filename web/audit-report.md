# Launch-Readiness Audit — deeperconnectioninitiative.com (local build)

Audited 2026-07-14. Bar: **launch-ready** (real content, working links/forms, no placeholders, no dead routes). Scope: all 13 routes + nav/footer/config. Depth: content + functionality + design/a11y.

**Method:** static scan of every route, plus live checks in headless browser (console errors, mobile overflow at 375px, image alt, form structure).

## Verdict at a glance

| Severity | Count | Theme |
|---|---|---|
| **P0 — blocks launch** | 4 | Inert forms, broken SEO domain, missing OG image, no auth backend |
| **P1 — fix before launch** | 6 | Dead footer links, missing legal pages, stale event dates, placeholder social handles |
| **P2 — should fix** | 4 | Sitemap coverage, auth UX gaps, coming-soon dead-ends |
| **P3 — polish** | 3 | Content-freshness patterns, verify intended pricing/scope |

Good news up front: **no mobile overflow on any page, no console errors anywhere, every image has alt text, contact-form labels are properly associated.** The design layer is solid. The gaps are **functional and content**, not visual.

---

## P0 — Launch blockers

### 1. All forms are inert (contact, sign-in, sign-up)
`src/routes/contact`, `/signin`, `/signup` each have a styled `<form>` with **no `action`, no `use:enhance`, no `on:submit`, no `fetch`, and no `+page.server.ts`**. There is a `<input type="hidden" name="_redirect" value="#">` — the shape of a static-form service (Formspree / Web3Forms) — but it was never wired to an endpoint. Submitting does nothing (page just reloads).
- **Impact:** Contact form silently fails. Sign-in / sign-up do nothing — there is no auth system at all.
- **Fix:** Either connect the forms to a real endpoint (static-form service or a `+page.server.ts` action), or, if auth isn't ready, remove `/signin` + `/signup` from the build and any links to them.

### 2. Broken domain in SEO config (`src/lib/config/site.ts`)
Every canonical/OG URL is `https://deeperconnectioniniative.com/` — **missing the second "t"** (should be `deeperconnectioninitiative.com`). Affects `url`, `canonical`, `openGraph.url`, and the `github` handle.
- **Impact:** Canonical tags point at a domain that likely doesn't resolve → SEO self-sabotage.

### 3. Open Graph image is a placeholder
`openGraph.images[0].url = "https://yourwebsite.com/og-image.jpg"`. No real OG image exists (the founder's `og-image.png` 404s too).
- **Impact:** Every social/WhatsApp/Slack share shows a broken image. In Uganda where WhatsApp sharing is primary, this matters.
- **Fix:** Create a 1200×630 OG image, host at `/og-image.png`, update config.

### 4. No authentication backend
Beyond the inert form (P0-1): there's no session handling, no `+page.server.ts`, no auth provider. `/signin` and `/signup` are visual mockups.
- **Fix:** Decide — build auth, or pull these pages until the platform is ready (they pair with the `/platform` "coming soon" page).

---

## P1 — Fix before launch

1. **Footer contact links are dead** — `footer.svelte` lines 52 & 58 use `href="#_"` for the email and phone. (The contact page does this correctly with `mailto:`/`tel:` — the footer just wasn't updated.)
2. **Legal/compliance pages missing** — footer links `/accessibility`, `/privacy`, `/terms` → none of these routes exist → 404. Either create the pages or remove the links.
3. **Events are all in the past** — `/events` lists three events dated **2026-06-03, 06-12, 06-20**; today is 2026-07-14. The page shows only expired events. Needs current dates or a "past/upcoming" split.
4. **Placeholder social handles** — `site.ts` twitter `handle: "@yourhandle"`, `site: "@yourwebsite"`. Real handle is `@dci_wellness` (from founder site).
5. **Empty config fields** — `site.ts` `description: ""` and `slogan: ""` are blank (the SEO `description` is set, but the top-level one feeds other meta).
6. **Sign-in/up have no recovery path** — no "forgot password", no OAuth, no email verification. Minimal even once wired.

---

## P2 — Should fix

1. **Sitemap likely missing new routes** — `sitemap.xml/+server.ts` doesn't appear to enumerate `champions`, `partners`, `performance`, `platform`. Verify and add.
2. **`/platform` is a dead-end** — intentional coming-soon, but the only action is "Back to DCI Wellness." Add an email-capture ("notify me") so the traffic isn't wasted.
3. **`/performance` free-assessment goes nowhere real** — "Take the free assessment" and "Join the waitlist" both point to `/contact`. There's no actual assessment. Fine for launch if intended, but the CTA over-promises.
4. **Auth pages reachable but non-functional** — if kept, they'll frustrate; if the platform is "coming soon," gate them behind the same status.

---

## P3 — Polish / verify

1. **`/performance` is a distinct product line** (coaching, Emily as lead, UGX 700k–7M, "DCI Inner Circle™"). Confirm you want this public now — it reads as a separate business from the toolkit/community mission.
2. **Verify intended pricing** — `/partners` states "from USD 20,000 annually" (pulled from founder site); everything else on the local site is UGX. Confirm the mixed currency is intentional.
3. **Hardcoded content that will age** — events, "next clinic" dates, and cohort references are inline in components. Consider a small data file or CMS so they don't silently go stale.

---

## Per-page status

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Complete | Polished. Real products, payment links, founder photos. |
| `/champions` | ✅ Complete | New build. Real content + pricing. |
| `/partners` | ✅ Complete | New build. Verify USD pricing intent (P3). |
| `/performance` | ✅ Complete | New build. Verify scope/pricing (P3); assessment CTA is a contact link (P2). |
| `/platform` | 🟡 Intentional stub | Coming-soon. Dead-end — add capture (P2). |
| `/toolkit` | ✅ Complete | Real products + Flutterwave links. |
| `/connection-miles` | ✅ Complete | Substantial, real content + payment links. |
| `/events` | 🟡 Content stale | Built well, but all events are past-dated (P1). |
| `/trainings` | ✅ Complete | Real tiers + payment links. |
| `/volunteering` | ✅ Complete | CTAs route to /contact & /trainings (no dedicated apply form — acceptable). |
| `/contact` | 🔴 Form inert | Looks done; mailto/tel real; **form doesn't submit (P0)**. |
| `/signin` | 🔴 Non-functional | Visual only; **no auth (P0)**. |
| `/signup` | 🔴 Non-functional | Visual only; **no auth (P0)**. |

---

## Recommended launch sequence

1. **Unblock (P0):** wire the contact form to a real endpoint; fix the domain typo in `site.ts`; add a real OG image; decide auth in-or-out.
2. **Clean (P1):** footer `mailto:`/`tel:`; create or remove `/privacy` `/terms` `/accessibility`; refresh event dates; fix social handles.
3. **Tighten (P2/P3):** sitemap, platform capture, confirm performance/partners scope + pricing.

The three "🔴" pages (contact, signin, signup) and the SEO config are what stand between this and a clean launch. Everything else is either done or a quick content edit.
