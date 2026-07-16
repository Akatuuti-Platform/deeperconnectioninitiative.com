# Hero V2 — Flowing Thoughts Animation

## Overview

A new hero section component (`hero-v2.svelte`) featuring the DCI head motif as a central transformation engine. Two streams of text flow along curved SVG paths through the head: dark/agitated "bad thoughts" enter from the right and dissolve into it, while calm/warm "good thoughts" emerge from the left. The animation communicates DCI's thesis visually — raw pain goes in, processed understanding comes out.

The existing `hero.svelte` remains untouched.

## Layout (top to bottom)

1. **Badge pill** — "Own your healing" (same design as current hero)
2. **Headline** — centered, single-column, max-width ~640px
3. **Subtext paragraph** — same content as current hero
4. **Two CTA buttons** — "Buy or sponsor a toolkit" + "Explore the ecosystem" (centered, stacked on mobile)
5. **Three descriptor tags** — "Community-rooted", "Offline-first", "Trauma-aware"
6. **Animation container** — full-width, centered, containing the SVG composition

The copy block switches from the current two-column grid to a centered single-column layout since the animation lives below the copy, not beside it.

## SVG Composition

A single `<svg>` element with a viewBox (roughly `0 0 1200 600`) containing:

### Head Motif

- `head-motif.png` (1000x1414, transparent background, geometric African mosaic pattern)
- Embedded as an SVG `<image>` element, centered horizontally in the viewBox
- Sized to roughly 300-400px tall on desktop
- Positioned so the two paths converge naturally at the silhouette
- Static — no animation on the head itself. It's the still anchor.
- A soft radial gradient `<radialGradient>` behind the head (cream/teal, low opacity) to create a subtle glow at the transformation point

### Input Path (bad thoughts entering)

- An SVG `<path>` curving from off-screen right, arcing upward, and converging into the back of the head (the right side of the silhouette, which faces left)
- The path is invisible (`stroke: none`, `fill: none`) — it only exists as a motion guide
- Path geometry will be hand-tuned to align with the head silhouette's contour

### Output Path (good thoughts exiting)

- An SVG `<path>` starting from the face/mouth area of the head, arcing outward and trailing off-screen left
- Also invisible — motion guide only
- Path geometry mirrors the input path's organic feel but exits in the direction the head faces

## Text Streams

### Input Stream (bad thoughts)

**Words:** "stress", "anxiety", "isolation", "burnout", "I can't cope", "why me", "not sleeping", "always busy"

**Implementation:**
- SVG `<text>` elements with `<textPath>` referencing the input path
- Words separated by adequate spacing (using `dx` or space characters) and repeated to fill the path for seamless looping
- GSAP tweens the `startOffset` attribute from `100%` to `0%` (right-to-left, flowing into the head)

**Styling:**
- `font-family: 'Outfit', sans-serif`
- `font-weight: 600`
- `fill: #6F231E` (burgundy) at 70% opacity
- `font-size`: scaled to viewBox, roughly 18-22px equivalent
- Words **fade out** as they approach the head — achieved via an SVG `<linearGradient>` mask on the text, or by animating individual text element opacity based on position

### Output Stream (good thoughts)

**Words:** "clarity", "connection", "hope", "belonging", "I'm not alone", "healing", "supported", "seen"

**Implementation:**
- Same `<text>` + `<textPath>` approach referencing the output path
- GSAP tweens `startOffset` from `0%` to `100%` (left, away from the head)

**Styling:**
- `font-family: 'Outfit', sans-serif`
- `font-weight: 500`
- `fill: #2A6268` (teal)
- Full opacity — these words are clear and settled
- Words **fade in** as they emerge from the head — inverse of the input fade

### Animation Timing

- Both streams: ~25-30 second linear cycle, `repeat: -1` (infinite loop)
- No easing — smooth, constant flow
- Streams run independently (not synchronized to each other)
- Animation starts when the SVG enters the viewport (Svelte `onMount` or IntersectionObserver)

## Fade Effect at the Head

The transformation point — where bad thoughts dissolve and good thoughts appear — is the key visual beat.

**Approach:** SVG `<mask>` elements with gradient opacity. A mask applied to each text stream that goes from opaque → transparent as it approaches the head (for input) or transparent → opaque as it leaves (for output). This creates the dissolve effect without per-word JavaScript.

The mask is a `<linearGradient>` in the mask definition:
- Input mask: white (visible) on the right, fading to black (hidden) near the head
- Output mask: black (hidden) near the head, fading to white (visible) on the left

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `lg+` (1024px+) | Full SVG visible, both streams animate, head ~350px tall |
| `md` (768px) | Proportionally scaled down via viewBox, same layout |
| `sm` (< 768px) | Container height reduced. Paths may be simplified (less curvature). Text size scales with viewBox. Head ~200px tall. |

The SVG's `viewBox` handles scaling naturally — no breakpoint-specific path changes needed. The container's height is constrained via CSS at smaller screens.

## Reduced Motion

When `prefers-reduced-motion: reduce`:
- GSAP animations do not start
- Text streams are rendered at static positions along their paths (words visible, no movement)
- The visual metaphor is preserved: bad thoughts on the right, head in the center, good thoughts on the left
- The gradient masks still apply, showing the fade effect as a static state

Implemented by checking `window.matchMedia('(prefers-reduced-motion: reduce)')` before starting GSAP timelines.

## Performance

- Animation is attribute-level (`startOffset`) — no layout or paint thrashing
- `will-change: contents` on text elements (minimal, only during animation)
- GSAP manages the render loop via its internal ticker
- Head motif PNG loads with `loading="lazy"` since it sits below CTA buttons
- Total DOM: ~4-6 `<text>` elements, 2 `<path>` elements, 1 `<image>`, gradient/mask defs — lightweight

## Dependencies

- **GSAP** (already in `package.json`) — core timeline + attribute tweening
- **No additional plugins needed** — `startOffset` is a regular SVG attribute, animatable via `gsap.to()` with `attr: {}`. MotionPathPlugin is NOT needed for this approach.

## File Structure

```
src/lib/components/pages/sections/hero-v2.svelte   # New component
```

The component imports:
- `gsap` from 'gsap'
- `Button`, `buttonVariants` from the existing UI
- `reveal` action from existing actions
- `cn` utility

## Integration

In `src/routes/+page.svelte`, swap the `<Hero />` import for `<HeroV2 />` (or conditionally render based on preference). The original hero remains available.

## Out of Scope

- Interactive behavior (clicking words, pausing on hover)
- Sound/audio
- 3D effects
- Changes to the head motif asset itself
- New copy for the headline/subtext (reuses current hero copy)
