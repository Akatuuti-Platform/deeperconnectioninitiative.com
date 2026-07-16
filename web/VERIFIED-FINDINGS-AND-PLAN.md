# Verified Findings & Implementation Plan

Supersedes `audit-report.md` and `design-coherence-report.md`. Every item below was verified at file:line or runtime (dev server `localhost:3001`, today 2026-07-14) by four independent checks plus a self-verification pass. Where my earlier reports were wrong, it's called out.

---

## Critique of my earlier reports — what I got wrong

My first audit was directionally useful but had a **structural blind spot**: I read `src/lib/config/site.ts`, saw a rich SEO/OG/canonical/twitter block, and assumed it was rendered. It is not.

- **`siteConfig` is never imported into any `<svelte:head>`.** Verified: `+layout.svelte` does not import it; the only `og:`/`canonical`/`twitter:` strings in the whole `src/` tree live *inside* the unused `site.ts`. So:
  - **My P0 "domain typo breaks canonical/SEO" was overstated** → the typo is in dead config. Downgrade to **P3 cosmetic**.
  - **My P0 "broken OG image" was the wrong framing** → there is no OG image tag *at all*. The real, larger problem: **zero OG/Twitter/canonical tags are emitted on any page**, and **every route shares one global `<title>`**. Reframe as **P1**.
- **My "sitemap likely missing new routes" undersold it.** Verified: `sitemap.xml/+server.ts` emits an empty `<urlset>` with a literal `<!-- <url> elements go here -->` and **zero URLs** — including `/`. It's broken, not stale. **P1.**
- **I missed a security issue in the forms.** The forms have no `method`, so submitting does a **GET to the current URL** — the sign-in **password lands in the URL, history, and server logs**. Not "just reloads." **Stays P0, now with a security dimension.**
- **I missed the biggest accessibility blocker entirely** (see A11Y-1 below).
- Downgrades: placeholder twitter handles + empty `description`/`slogan` in `site.ts` are **dead code → P3**, not P1.

What I got right (verified): forms inert; footer `#_` links; missing `/privacy` `/terms` `/accessibility`; events all past-dated; Lato overrides removed and Source Serif 4 / Outfit **actually loaded** (via Google Fonts); hero unification genuinely done; no console errors anywhere; svelte-check clean.

---

## Verified findings by severity

### P0 — blocks launch
1. **Forms non-functional + password leak.** contact/signin/signup have no `action`/`method`/handler/`+page.server.ts`. Submit = GET to current URL → sign-in password exposed in URL/history/logs. `signin/+page.svelte:41`, `signup:51`, `contact:153`.
2. **Three pages unreachable by keyboard / screen reader.** `/champions`, `/partners`, `/platform` are linked ONLY from the Ecosystem dropdown (`navigation.svelte:37,43,55`; footer has only `#_`). The dropdown is mouse-only: submenu is `{#if activeItem?.children}` (absent from DOM when closed), and the viewport region has no `onfocusin` to cancel the 120ms close-timer (`navigation.svelte:187,237-244`), so a keyboard user Tabbing toward the links triggers close → focus lost. No `Escape`, no arrow-key roving. Partly self-inflicted (I placed those pages in the dropdown). **Note:** the empty sitemap means these pages have no crawlable entry point either.

### P1 — fix before launch
3. **No per-page `<title>`/description.** Only `+layout.svelte:33-37` sets them; all 13 routes render identical title/description. SEO + shareability gap.
4. **No OG/Twitter/canonical tags emitted anywhere** + no real `og-image`. `+layout.svelte` head has none; `site.ts` block is unused.
5. **Sitemap is an empty stub** (0 URLs). `sitemap.xml/+server.ts`.
6. **PWA manifest broken.** `static/site.webmanifest`: `"name":""`, `"short_name":""`, and icon `src` point at root (`/android-chrome-192x192.png`) but files live under `/favicon/` → 404.
7. **Footer email/phone are `href="#_"`** (dead). `footer.svelte:52,58`.
8. **`/privacy` `/terms` `/accessibility` → 404** (linked `footer.svelte:16-18`).
9. **Events all past-dated** (2026-06-03/12/20), no upcoming/past filter. `events/+page.svelte:15,25,35`.
10. **Decorative icons not `aria-hidden`.** phosphor renders `<svg role="img">` with no name; announced as unlabeled graphics. Site-wide (inputs, nav submenu, section kit).
11. **No skip-to-content link**; long fixed header, no bypass.
12. **Contrast failures (WCAG AA).** `text-[#F6ECD9]/45` on `#1A3C40` = **3.35:1** (fails all sizes — impact-stories "Before/During/After" `:93,99,105`); `/55` = **4.25:1** (fails normal text — eyebrows site-wide).
13. **PERF: 3.6 MB of eager illustration PNGs on the homepage.** 3 cutouts ~1.2-1.3 MB each, `loading="eager"` (`spot-illustration.svelte:36`), displayed at ~320px. Wrong format + ~4x oversized.
14. **PERF: 424 KB logo shown at 36px.** `photos/dci-logo-mark.png` 512×512 at `h-9` (`logo.svelte:16`).
15. **PERF: render-blocking Google Fonts `@import`**, 2 families/8 weights, no preconnect. `layout.css:1`.

### P2 — should fix
16. Payment CTAs navigate **same-tab** (~10 of 12 anchors, no `target="_blank"`); the 2 blank-target ones lack `rel="noopener"`. Off-site with no return path + tabnabbing.
17. No custom `+error.svelte` (404s fall back to bare SvelteKit default).
18. Videos: `autoplay` with no `preload="none"` and no viewport-gating → ~1.5 MB eager, 2 decoding at once; no `width`/`height`. `toolkit.svelte:112-120`.
19. Missing `width`/`height`/`aspect-ratio` on most `<img>`/`<video>` → CLS. Site-wide.
20. **525 raw hex literals** (`#2A6268` etc.) bypass **existing `@theme` tokens** (`--color-primary`, `--dci-teal` defined `layout.css:16-22,126-161`). Rebrand = 500-site find-replace.
21. **26 distinct arbitrary `shadow-[...]`** values, near-identical.
22. Raw `<a class="rounded-full…">` CTAs instead of `<Button>` in 9 section files → inconsistent CTA behavior/focus.
23. Reduced-motion not honored by spin animations (`layout.css:249-255`) or video autoplay; video has no `<track>`.
24. Form `required` state / errors not conveyed (no `aria-required`, no `aria-live` error region).
25. No JSON-LD (Organization/NGO/LocalBusiness; Event on `/events`); robots.txt has no `Sitemap:` line.

### P3 — polish / debt
26. `ecosystem-two.svelte` — **orphan** (imported nowhere), near-dup of `ecosystem.svelte`. Delete.
27. Dead GSAP/ScrollSmoother/ModeWatcher scaffolding in `+layout.svelte:3-28`; live-but-purposeless `#smooth-wrapper`/`#smooth-content` divs; dark theme fully styled but never activatable.
28. Unused deps (`gsap`, `mode-watcher`) still in `package.json`; unused `static/photos/head-motif.png` (872 KB).
29. `rounded-xl ×29` off the intended radius scale; `[4rem]`/`[2px]` one-offs survive.
30. Section-kit debt: `icon?: any` typing (→ `import('svelte').Component`); `CtaBand` re-implements `SectionHeading`; `CheckList` used once (premature); `SectionHeading` hardcodes `<h2>` (no level prop); duplicate `<meta>` tags in `+layout.svelte:47-55`.

---

## Implementation plan (sequenced)

Rule of thumb: do Phase 0 before any launch; Phases 1-2 before a *public* launch; 3-5 are quality/scale hardening.

### Phase 0 — Launch blockers (est. 0.5-1 day)
- **Forms decision.**
  - **Auth (`/signin`, `/signup`):** no backend exists. Recommend **remove the pages + all links for launch** (they pair with `/platform` "coming soon"). This also erases the password-leak (P0-1) and shrinks the keyboard-a11y surface. Re-add when the platform ships.
  - **Contact form:** wire to a real endpoint — fastest is Web3Forms/Formspree (the `_redirect` scaffold is already there; add `action` + `access_key` + real redirect), or a SvelteKit `+page.server.ts` action with `use:enhance`. Add `method="POST"`.
- **Keyboard a11y (nav dropdown):** add `onfocusin`/`onfocus` on the viewport region to cancel the close-timer, add `Escape`-to-close, and ensure Tab reaches submenu links. **Backstop:** also link champions/partners/platform from the footer and the (now-populated) sitemap so they never depend solely on the JS dropdown.

### Phase 1 — SEO + meta foundation (est. 0.5 day)
- Per-page `<svelte:head>` with unique title + description on all 13 routes (a tiny `<Seo>` helper component keeps it DRY).
- Emit canonical + OG + Twitter tags in `+layout.svelte` (wire `siteConfig` properly *or* hardcode), driven by page data. Create a real 1200×630 `og-image.png`.
- Populate `sitemap.xml/+server.ts` with all routes; add `Sitemap:` to `robots.txt`.
- Fix `site.webmanifest` (name + icon paths → `/favicon/`).
- Fix the `deeperconnectioniniative` typo in `site.ts` while here.

### Phase 2 — Content + links (est. 0.5 day)
- Footer `#_` → `mailto:`/`tel:`.
- Create `/privacy`, `/terms`, `/accessibility` (even minimal) or remove the links.
- Events: add upcoming/past filtering or refresh to real dates.
- Payment CTAs: systematic `target="_blank" rel="noopener noreferrer"`.

### Phase 3 — Accessibility hardening (est. 0.5-1 day)
- `aria-hidden="true"` on all decorative icons (add to section-kit components + input adornments once, covers most).
- Skip-to-content link in `+layout.svelte` → `#main`.
- Contrast: raise `/45`→`/70`+ and `/55`→`/70`+ for small text (or enlarge/bold).
- Reduced-motion guard for spin animations + video autoplay; add video `<track>` or `aria-label`.
- Events heading order; `SectionHeading` gains an `as`/`level` prop.

### Phase 4 — Performance (est. 0.5-1 day) — biggest UX win
- Illustrations → WebP, downscale ~700px, `loading="lazy"` (−~3 MB on `/`).
- Logo → small SVG/PNG (−~420 KB every page).
- Fonts → `<link rel="preconnect">` + `<link rel="stylesheet">` (drop CSS `@import`); trim to ~3 weights.
- Videos → `preload="none"` + IntersectionObserver-gated autoplay + explicit dimensions.
- Adopt `@sveltejs/enhanced-img` (fixes format + `srcset` + intrinsic size/CLS in one), or add `width`/`height` to every `<img>` and pre-resize photos.
- Remove `gsap`, `mode-watcher`, unused `head-motif.png`.

### Phase 5 — Coherence / code-quality debt (est. 1-2 days, incremental)
- Tokenize color: map the 4 brand hexes to Tailwind theme colors and sweep `#2A6268`→`primary` etc. (mechanical, high future-payoff).
- Consolidate shadows → 2-3 utilities; fold `rounded-xl` into the radius scale.
- Replace raw `<a>` CTAs with `<Button>` in the 9 section files.
- Delete `ecosystem-two.svelte`; remove dead GSAP scaffolding + `#smooth-wrapper` divs (or re-enable intentionally); decide dark-mode in/out.
- Section-kit: fix `icon` typing, dedupe `CtaBand`→`SectionHeading`, reconsider `CheckList`.
- (Optional, per earlier decision) leave home + auth/contact as intentional hero exceptions, or finish migrating them.

---

## Recommended first move
Phase 0 + Phase 1 together make the difference between "looks done" and "can actually launch." If auth is pulled (recommended), Phase 0 collapses to: wire the contact form + fix the nav-dropdown keyboard trap + populate the sitemap — roughly half a day.
