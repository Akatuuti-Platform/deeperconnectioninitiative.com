# Design System — DCI Wellness

> Extracted from existing code (`src/**/*.svelte`, `src/routes/layout.css`) via Impeccable `/extract`.
> Source of truth = the Tailwind v4 `@theme` block in `src/routes/layout.css`.
> Stack: SvelteKit + Svelte 5 · Tailwind v4 · shadcn-svelte · tailwind-variants.

## Direction

Warm, grounded, honest. Modern product-forward clarity on a textured, organic palette —
"a well-made physical object," never clinical. Light mode is the canonical brand expression;
dark mode is a quiet room at night, not a generic inversion.

## Spacing

- **Base:** 4px (standard Tailwind scale)
- **Scale in use:** 2, 3, 4, 5, 6, 8, 10 (`gap-*`, `p-*`, `px-*`, `py-*`)
- **Component padding:** `p-6` / `p-8` for cards & panels; `px-4` / `px-6` / `px-8` for horizontal insets
- **Gaps:** `gap-3` and `gap-2` for tight clusters; `gap-4` for grids; `gap-8`+ for major layout
- **Section vertical rhythm:** `py-24` (default), `py-16` (tighter), `py-20` — pick one per section band, don't mix within a band

## Layout

- **Outer container:** `max-w-7xl` (primary page frame)
- **Prose / centered content:** `max-w-3xl`, `max-w-2xl`, `max-w-xl`
- **Cards / narrow forms:** `max-w-md`, `max-w-lg`, `max-w-sm`

## Radius

- **Token base:** `--radius: 0.625rem` (10px) → `radius-sm/md/lg/xl`
- **Dominant usage (by frequency):**
  - `rounded-full` — pills, eyebrows, avatars, icon chips (most-used, 82×)
  - `rounded-2xl` — cards, panels, media frames (47×)
  - `rounded-xl` — buttons, inputs, smaller surfaces (29×)
- Avoid introducing `rounded-md`/`rounded-sm` on brand surfaces — they read as "un-DCI." Keep the soft, generous curve.

## Depth — **Borders-first**

Depth is carried by borders, not shadows (281 borders vs 50 shadows in the codebase).

- **Primary:** 1px borders, usually tinted — `border border-dci-teal/20`, `border-dci-teal/25`
- **Elevation (rare, intentional):** use only the 4-token shadow scale — never an arbitrary `shadow-[…]`
  - `shadow-dci-lift` → `0 24px 70px -58px rgba(0,0,0,.72)` — large neutral lift (floating cards)
  - `shadow-dci-panel` → `0 28px 90px -60px rgba(0,0,0,.75)` — XL neutral panel
  - `shadow-dci-teal` → `0 24px 72px -54px rgba(26,60,64,.55)` — large teal-tinted (brand glow)
  - `shadow-dci-soft` → `0 16px 44px -26px rgba(26,60,64,.5)` — small/tight teal-tinted
- Do **not** reach for stock `shadow-md`/`shadow-lg` or arbitrary `shadow-[…]`. Every brand shadow is one of the four tokens above.

## Color — DCI brand palette

Defined as `--dci-*` and exposed as Tailwind tokens (`text-dci-teal`, `bg-dci-cream/8`, …).

| Token            | Hex       | Role                                             | Usage |
|------------------|-----------|--------------------------------------------------|-------|
| `dci-teal-deep`  | `#1A3C40` | Primary depth, dark sections, logo               | 72×   |
| `dci-teal`       | `#2A6268` | Primary accent, borders, links                   | 203×  |
| `dci-burgundy`   | `#6F231E` | Urgent/warm accent — draws the eye, use sparingly| 59×   |
| `dci-cream`      | `#F6ECD9` | Primary warm surface / on-dark text              | 208×  |
| `dci-sand`       | `#EFE5D0` | Page background, gentle section variation        | 41×   |
| `dci-paper`      | `#FFF9EA` | Off-white card surface                           | 24×   |
| `dci-clay`       | `#D49C70` | Earth accent — rare highlight                    | 4×    |
| `dci-teal-mid`   | `#234F53` | Hover shade for teal / teal-deep surfaces        | —     |
| `dci-ink`        | `#171817` | Neutral near-black for dark cards + text         | —     |
| `dci-blush`      | `#EAD5C8` | Toolkit product-card media tint (warm)           | —     |
| `dci-mist`       | `#EEF1E5` | Toolkit product-card media tint (cool)           | —     |
| `dci-oat`        | `#ECE7DA` | Toolkit product-card media tint (neutral)        | —     |

*(The last five were added when `/audit` consolidated ~22 inline hex values into tokens — always prefer `hover:bg-dci-teal-mid` over an arbitrary `hover:bg-[#…]`.)*

- **Tints:** use opacity suffixes for soft fills/borders (`bg-dci-teal/5`, `border-dci-teal/20`, `hover:bg-dci-teal/7`).
- **Page background** is a layered dot-grid + gradient over `--dci-sand` (see `@layer base body`). Don't paint full-bleed flat white.
- Semantic shadcn tokens (`--primary`, `--muted`, …) still exist for UI primitives; brand surfaces prefer `dci-*`.

## Typography

- **Headings:** `--font-serif: 'Fraunces'` (auto-applied to `h1–h6`). Editorial, grounded.
- **Body:** `--font-sans: 'Outfit'`. Clean, readable at small sizes.
- **Weight:** `font-semibold` is the workhorse (176×); `font-bold` for emphasis; `font-light` for large serif display.
- **Scale in use:**
  - Body/UI: `text-sm` (dominant), `text-xs` (labels/eyebrows), `text-base`
  - Display: `text-4xl` / `text-5xl` headings, up to `text-7xl` for hero
- **Helpers:** `text-balance` (headings), `text-pretty` (paragraphs).

## Components / Patterns

### Button (`$lib/components/ui/button`, tailwind-variants)
- **Base:** `rounded-xl text-sm font-medium`, `gap-2`, `transition-all`, `hover:scale-95`, `focus-visible:ring-[3px]`
- **Sizes:** `sm` h-8 · `default` h-9 (`px-4 py-2`) · `lg` h-11 (`px-8`) · `xl` h-12 (`px-10 text-base`) · icon `size-8/9/10`
- **Variants:** default (`bg-primary`), outline (`border bg-background`), secondary, ghost, link, destructive
- **Brand CTA (custom):** `rounded-full bg-dci-teal px-6 py-2 text-sm font-bold text-white hover:bg-[#1f4a4e]`

### Eyebrow / pill
`inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1 text-xs`

### Card / panel
- `rounded-2xl` + `border border-dci-teal/20` + `bg-dci-paper` (or `bg-off-white`) + `p-6`/`p-8`
- Optional lift: `shadow-dci-lift` and/or `.dci-soft-hover`

### Product card (toolkit)
Two-column split (`md:grid-cols-[0.82fr_1fr]`), media one side + copy the other, image side **alternates** per row (`index % 2` → `md:order-2`). Container: `rounded-[2rem] border bg-dci-paper shadow-dci-lift md:min-h-[22rem]`, hover `-translate-y-1` + media `group-hover:scale-[1.03]`.
- **Never fix the height** (`md:h-[...]` + `overflow-hidden` clips the price/CTA). Use `md:min-h-[...]` so content-rich cards grow.
- **Copy column** (`justify-between`): title (`text-3xl` Fraunces) → description → optional italic `credit` line → **Connection Miles badge** → price + CTA row (`justify-between`).
- **Connection Miles™ badge** (the signature): a short `whitespace-nowrap` pill (`inline-flex rounded-full border px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest`) holding **only the metric** (`8 Connection Miles™`), with the plain-language gloss (`8 lives impacted`) beside it as `text-sm text-slate-500` — never inside the pill (long copy wraps a `rounded-full` pill onto two ugly lines on mobile). Colored per product via a single `badge` token string, e.g. `border-dci-burgundy/25 bg-dci-burgundy/10 text-dci-burgundy` (also teal / teal-deep). Use `/10` fill so the pill actually reads (`/5` is too faint). Anchor the term once per section with a gloss linking to `/connection-miles`.
- **Badge-only accent:** the per-product accent color lives **only** in the Miles badge. Prices stay a consistent `text-dci-teal-deep` ink so they never compete with the teal primary CTA. (This is how burgundy stays a spotlight, not a fill.)
- **Bundle/upsell card:** invert to `bg-dci-ink text-dci-cream` with cream CTAs — the one dark surface in the set signals "the complete thing."

### Input
`rounded-full border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-dci-teal focus:outline-none`

## Motion

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (the house curve) — used everywhere
- **Reveal on scroll:** `[data-reveal]` fades + rises 22px over 640ms, staggered via `--reveal-delay`
- **Soft hover:** `.dci-soft-hover` — lifts `-4px` + soft shadow over 280ms (cards, links)
- **Ambient float:** `.dci-float` / `.dci-float-slow` (8s / 11s), `.animate-spin-slow` (20s) for decorative marks
- **Always** honor `prefers-reduced-motion` — all of the above are disabled in the reduce block. Keep it that way.

## Guardrails (from usage — "the DCI way")

- Borders over shadows. If you shadow, use a `dci-` token.
- Generous radius (`rounded-full` / `rounded-2xl` / `rounded-xl`) — nothing sharp or clinical.
- Warm surfaces (cream/sand/paper) over flat white; keep the textured page background.
- Burgundy is a spotlight, not a fill — use it to draw the eye, sparingly.
- **Badge-only accent** on multi-item card sets: one colored element (the badge) carries identity; shared elements (price, CTA) stay neutral/consistent so accents never compete.
- `font-semibold` + Fraunces headings; keep body at `text-sm`/`text-base`.
- One section rhythm per band (`py-24` default); don't mix vertical spacing arbitrarily.
