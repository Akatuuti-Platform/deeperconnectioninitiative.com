# Design Coherence Audit — deeperconnectioninitiative.com

Companion to `audit-report.md` (that one = functional/content; this one = visual coherence). Audited 2026-07-14 by comparing every page's hero and section rhythm side by side at 1280px.

**The palette is coherent** (teal `#2A6268` / cream `#F6ECD9` / dark `#1A3C40` / maroon `#6F231E` — consistent everywhere). The incoherence is in **structure, type, and rhythm** — pages built at different times to different templates, plus a few things I introduced in recent edits. I've flagged the ones I caused honestly.

---

## 1. Hero patterns are fragmented — FOUR different systems

The single most visible coherence problem. A visitor moving between pages sees the top of the page restructure itself each time:

| Hero style | Pages |
|---|---|
| **Centered, single column** | `/` (home), `/platform` |
| **Left text + dark stat/info panel** | `/trainings`, `/events`, `/volunteering`, `/signin`, `/signup`, `/contact`, `/connection-miles` |
| **Left text + photo** | `/champions`, `/partners` |
| **Left text, empty right (full-width text)** | `/performance` |

The "left text + dark panel" pattern is the *de facto* standard (7 pages). But home (centered), my new photo-heroes, and performance (no aside) all break from it.

**Self-inflicted:** I centered the home hero two edits ago at your request — which made the *most important* page the biggest outlier. And my new pages (`/champions`, `/partners`, `/performance`) introduced two more hero variants instead of reusing the established one.

**Fix:** pick ONE hero system and apply it everywhere. My recommendation: standardize on the two-column "text + right slot," where the right slot can hold a dark panel OR a photo OR stats — same skeleton, swappable content. Then home either adopts it or we deliberately make home the one grand exception.

---

## 2. Two section systems now coexist

- **Old, bespoke** (`src/lib/components/pages/sections/*`) — hand-written markup, used by the home page and inherited by inner pages.
- **New kit** (`src/lib/components/sections/*`) — the reusable `PageHero / Section / FeatureCard / CheckList / CtaBand` I built for the 4 new pages.

Right now only 4 pages use the kit; everyone else is bespoke. Two vocabularies = drift. **Fix:** finish the refactor — migrate the existing pages onto the kit so there's one source of truth. (This is the "refactor the sections" work I started but only applied to new pages.)

---

## 3. Typography is inconsistent — and partly broken

Global setup (in `layout.css`): headings = **Source Serif 4** (serif), body = **Outfit** (sans). Clean, intentional, editorial.

**But** four headings override to `font-family: 'Lato'`:
- `mission.svelte` ("Our Mission")
- `get-involved.svelte` (eyebrow + "There is a place for you here")
- `founder.svelte` ("40+ years…") ← **I did this**, copied the bad pattern

`'Lato' is never loaded` (it's not in the font tokens), so those headings silently fall back to **system sans** — meaning some headings render serif and some render in a plain system font. It reads as "why does this heading look different." **Fix:** delete all four inline `font-family` overrides so everything inherits the intended Source Serif 4.

---

## 4. Border-radius zoo

Big rounded containers wobble between values instead of snapping to a scale:
`rounded-[2rem]` (×35), `rounded-2xl` (×32), plus one-offs: `[2.5rem]`, `[1.75rem]`, `[1.5rem]`, `[1.35rem]`, `[4rem]`, `3xl`. Cards that sit next to each other don't share a corner radius.

**Fix:** define ~3 radii and use only those — e.g. **pill** = `rounded-full`, **card** = `rounded-2xl`, **panel/section** = `rounded-[2rem]`. Retire the rest.

---

## 5. Home reads as a different (richer) design than the inner pages

Home has dense, bespoke, high-craft sections (interactive path-finder, impact-stories, the dark ecosystem grid, layered product mockups). The inner pages are comparatively plain: hero → card grid → CTA band. It feels like two designers — a flagship home and templated sub-pages.

**Fix (direction call):** either (a) pull home's richer patterns *into* the kit so inner pages can borrow that craft, or (b) deliberately keep home as the showpiece and make the inner pages consistently, confidently simple. Both are valid — but decide, don't drift.

---

## 6. Dark-panel overuse

The `#1A3C40` slab appears in **7 heroes** plus multiple mid-page sections. It started as a signature accent; at this frequency it's a default. Not wrong, but vary the treatment (photo, light panel, stat band) so it stays intentional.

---

## Priority order (visual impact per effort)

1. **Kill the `font-family:'Lato'` overrides** (4 spots) — 5-minute fix, removes a visibly-wrong font. *(includes fixing my founder.svelte)*
2. **Unify the hero system** — biggest perceived-coherence win; decide the one pattern, apply everywhere (home included).
3. **Standardize border radii** to ~3 values.
4. **Migrate existing pages onto the section kit** — kills the two-vocabulary drift.
5. **Decide home-vs-inner design direction** (#5) — the strategic one.

Items 1, 3, 4 are mechanical and safe. Item 2 and 5 are **design-direction decisions I need from you** before I touch them, because they change the look of every page.
