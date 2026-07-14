# Content Update Map — dropping the founder's real photos into the local site

The founder's images are now in `static/photos/` (servable at `/photos/<name>`).
The local site currently uses **CSS-drawn fake mockups everywhere** — no real photography. Each spot below is a fake placeholder that a real photo should replace.

## Available assets (`/photos/...`)
| File | Dimensions | Best used as |
|---|---|---|
| `product-mood-tracker.jpg` | 440×641 (portrait) | Mood Tracker product shot |
| `product-card-game.jpg` | 260×325 | Card Game product shot |
| `product-journal.jpg` | 290×641 (portrait) | Journal product shot |
| `product-full-toolkit.jpg` | 1000×593 (landscape) | Full-kit hero shot |
| `champion-training-hero.jpg` | 1080×720 | Champion/training lifestyle |
| `partner-training-room.jpg` | 1080×720 | Partner/school session |
| `section7-clinics.jpg` | 600×600 (square) | Conversation Clinic |
| `section7-champions.jpg` | 600×600 (square) | Community Champion |
| `section7-venue.jpg` | 600×600 (square) | Venue Partner |
| `ann-banya.jpg` | 600×663 | Founder portrait |
| `head-motif.png` | 1000×1414 (transparent) | Brand motif / hero backdrop |
| `head-icon.jpg` | 409×394 | Logo mark |

---

## Priority 1 — swap fake product mockups for real photos

### 1. `hero.svelte` (lines 96–161)
The entire right column is three fake CSS mockups: a fake "Reflection Journal" card (122–137), a fake "Mood Tracker" dot grid (139–152), and a 9-cell fake card grid (104–119).
- **Swap:** journal mockup → `product-journal.jpg`; mood mockup → `product-mood-tracker.jpg`; card grid → `product-card-game.jpg` (or a single `product-full-toolkit.jpg` for a cleaner hero).
- Keep the floating/rotated framing (`dci-float`, rounded borders, shadows) — just put `<img>` inside instead of the fake `<div>` skeletons.

### 2. `toolkit.svelte` (lines 102–155)
Each product card renders a fake mockup panel (`bg-[#EAD5C8]` etc., 106) with fake cards/journal-lines/mood-dots keyed off `index`. Product order in the data array (13–44): **Card Game, Journal, Mood Tracker**.
- **Swap per index:** 0 → `product-card-game.jpg`, 1 → `product-journal.jpg`, 2 → `product-mood-tracker.jpg`.
- Prices already match the founder site (69k / 120k / 31k) — no copy change needed here.

### 3. `toolkit-demo.svelte` (lines 122–182)
Interactive tool preview uses a fake card fan (127–145), fake journal (149–164), fake mood grid (167–184).
- **Swap:** the preview for each tool → the matching real product photo, driven by `activeTool.id`.

---

## Priority 2 — add lifestyle/people photos to abstract panels

### 4. `get-involved.svelte` (lines 52–108) — four role cards
Role cards use tiny icon squares (`h-12 w-12 rounded-lg bg-[#EFE5D0]`). Founder has real photos for three of these roles:
- **Venue Partner** (60) → `section7-venue.jpg`
- **DCI Angel** (76) → `champion-training-hero.jpg` or `section7-champions.jpg`
- **Provider Network** (92) → `section7-clinics.jpg`
- Add the photo as a card-top banner above the icon, or as a background with an overlay.

### 5. `path-finder.svelte` (right panel, lines 140+)
The result panel is all type + abstract boxes. Add a contextual lifestyle photo per path (`champion-training-hero.jpg`, `section7-clinics.jpg`, `partner-training-room.jpg`) to make each recommendation feel real.

### 6. `impact-stories.svelte` (dark story card, lines 65–115)
The featured story card (65) is a dark panel with an icon (78). Drop in `section7-clinics.jpg` or `champion-training-hero.jpg` as the story image behind/beside the Before/During/After copy.

---

## Priority 3 — new content the local site is missing

### 7. Founder credibility block (does not exist locally)
`ann-banya.jpg` has no home. The founder site leans hard on her as proof ("recognised infrastructure, not an emerging idea"). Add a small section — near `mission.svelte` or before `get-involved` — with:
- `ann-banya.jpg` portrait
- "Ann Banya — Early Child Development Specialist, 40 years of experience"
- Affiliation logos/text: UPFMH · Butabika National Referral Hospital · Ministry of Education Uganda

### 8. Brand motif
`head-motif.png` (transparent, tall) is the site's signature visual. Use it as a faint hero backdrop in `hero.svelte` (behind the current `AnimateSvg` squiggle) or as a section divider. `head-icon.jpg` can replace/supplement the logo mark in the nav/footer.

---

## Implementation notes
- Use `<img src="/photos/xyz.jpg" alt="..." loading="lazy">` (files are in `static/photos/`). This is SvelteKit — `static/` maps to `/`.
- Portrait shots (journal, mood tracker) fit the existing `aspect-[4/5]` / `aspect-[3/4]` frames; use `object-cover rounded-…` to match current card radii.
- The DCI Shirt has **no photo** on the founder site (placeholder only), and `og-image.png` is missing there too — you'll need to source/create both yourself.
- Founder product order differs slightly from local, but names/prices align. No pricing edits required.
