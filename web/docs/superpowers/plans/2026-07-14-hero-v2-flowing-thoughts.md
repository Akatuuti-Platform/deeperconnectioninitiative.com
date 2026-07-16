# Hero V2 — Flowing Thoughts Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new hero section where two streams of text flow through the DCI head motif — bad thoughts enter and dissolve, good thoughts emerge — using SVG textPath + GSAP.

**Architecture:** Single Svelte component (`hero-v2.svelte`) containing a copy block (badge, headline, subtext, CTAs, tags) above an SVG composition. The SVG holds two invisible curved paths, the head motif as an `<image>`, gradient masks for fade effects, and `<textPath>` elements whose `startOffset` is animated by GSAP. No additional GSAP plugins needed.

**Tech Stack:** SvelteKit 2 / Svelte 5, GSAP (already installed), SVG, Tailwind CSS 4

## Global Constraints

- Existing `hero.svelte` must NOT be modified
- GSAP is already in `package.json` — no new dependencies
- All animations must respect `prefers-reduced-motion: reduce`
- Font: Outfit (sans-serif) for flowing text, Source Serif 4 for headings
- Colors: burgundy `#6F231E` for bad thoughts, teal `#2A6268` for good thoughts
- Head motif asset: `static/photos/head-motif.png` (1000x1414, transparent PNG)
- SVG viewBox: `0 0 1200 700` (final tuning in Task 2)

---

### Task 1: Create hero-v2.svelte with static copy block

**Files:**
- Create: `src/lib/components/pages/sections/hero-v2.svelte`

**Interfaces:**
- Consumes: `Button`, `buttonVariants` from `$lib/components/ui/button/button.svelte`; `cn` from `$lib/utils`; `reveal` from `$lib/actions/reveal`; `AnimateSvg` from `$lib/components/animate-svg.svelte`
- Produces: `<HeroV2 />` component — default export, no props

- [ ] **Step 1: Create the component with the copy block**

Copy the centered layout from the current `hero.svelte` and add an empty animation container div below it. The copy block is the badge, headline with underline SVG, subtext, two CTA buttons, and three descriptor tags — all centered.

```svelte
<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import { reveal } from '@/lib/actions/reveal';
</script>

<section class="relative w-full overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-8">
	<div class="pointer-events-none absolute top-28 left-0 hidden w-[42vw] opacity-45 lg:block">
		<AnimateSvg
			width="100%"
			height="100%"
			viewBox="0 0 560 240"
			path="M8 70 C112 16, 178 206, 272 142 C343 93, 374 36, 452 58 C500 72, 529 110, 552 155"
			strokeColor="oklch(0.35 0.12 25 / 0.48)"
			strokeWidth={3}
			strokeLinecap="round"
			animationDuration={1.8}
		/>
	</div>

	<div
		class="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center"
		use:reveal={{ delay: 0, y: 18 }}
	>
		<div
			class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1"
		>
			<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
			<span class="text-xs font-semibold tracking-tight text-accent">Own your healing</span>
		</div>

		<div class="space-y-5">
			<h1
				class="text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
			>
				Tools that put healing back in
				<span class="relative inline-block pb-3 text-accent sm:pb-4">
					your hands
					<span
						class="pointer-events-none absolute -bottom-1 left-[-0.04em] h-[0.32em] w-[108%] sm:-bottom-1.5"
					>
						<AnimateSvg
							width="100%"
							height="100%"
							viewBox="0 0 340 42"
							paths={[
								{
									d: 'M10 25 C58 34, 117 34, 169 28 C216 22, 267 19, 328 25',
									stroke: 'oklch(0.35 0.12 25)',
									strokeWidth: 5,
									strokeLinecap: 'round'
								},
								{
									d: 'M18 31 C76 38, 132 37, 184 31 C230 26, 278 26, 319 31',
									stroke: 'oklch(0.35 0.12 25 / 0.42)',
									strokeWidth: 2.5,
									strokeLinecap: 'round'
								}
							]}
							strokeLinecap="round"
							staggerDelay={0.12}
							animationDuration={1.25}
						/>
					</span>
				</span>
			</h1>

			<p class="mx-auto max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
				A mental health initiative helping people build emotional strength through tactile
				toolkits, guided reflection, storytelling, and community connection.
			</p>
		</div>

		<div class="flex flex-col justify-center gap-3 sm:flex-row">
			<Button href="#toolkit" class={cn(buttonVariants({ size: 'lg' }), 'bg-primary px-7')}>
				Buy or sponsor a toolkit
			</Button>

			<Button
				href="#ecosystem"
				class={cn(
					buttonVariants({ variant: 'outline', size: 'lg' }),
					'border-primary/30 bg-transparent px-7 text-primary hover:bg-primary/5'
				)}
			>
				Explore the ecosystem
			</Button>
		</div>

		<div class="grid w-full max-w-xl grid-cols-3 gap-3 pt-4 text-xs text-foreground/70">
			<div class="border-t border-primary/25 pt-3">Community-rooted</div>
			<div class="border-t border-accent/25 pt-3">Offline-first</div>
			<div class="border-t border-foreground/20 pt-3">Trauma-aware</div>
		</div>
	</div>

	<!-- Animation container — built in Task 2 -->
	<div
		class="mx-auto mt-12 max-w-5xl lg:mt-16"
		use:reveal={{ delay: 200, y: 30 }}
	>
		<div class="relative aspect-[12/7] w-full">
			<!-- SVG composition goes here -->
		</div>
	</div>
</section>
```

- [ ] **Step 2: Wire into the page to verify the copy block renders**

In `src/routes/+page.svelte`, replace the `Hero` import with `HeroV2`:

```svelte
<script>
	import Ecosystem from "@/lib/components/pages/sections/ecosystem.svelte";
	import GetInvolved from "@/lib/components/pages/sections/get-involved.svelte";
	import HeroV2 from "@/lib/components/pages/sections/hero-v2.svelte";
	import Founder from "@/lib/components/pages/sections/founder.svelte";
	import ImpactStories from "@/lib/components/pages/sections/impact-stories.svelte";
	import Mission from "@/lib/components/pages/sections/mission.svelte";
	import PathFinder from "@/lib/components/pages/sections/path-finder.svelte";
	import Toolkit from "@/lib/components/pages/sections/toolkit.svelte";
</script>

<HeroV2 />
<PathFinder />
<Mission />
<Founder />
<ImpactStories />
<Toolkit />
<Ecosystem />
<GetInvolved />
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev` (if not already running)

Check the homepage in the browser. The copy block (badge, headline, subtext, buttons, tags) should render centered with an empty space below for the animation container.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/pages/sections/hero-v2.svelte src/routes/+page.svelte
git commit -m "feat: scaffold hero-v2 component with centered copy block"
```

---

### Task 2: Build the SVG composition with paths, head motif, and gradient masks

**Files:**
- Modify: `src/lib/components/pages/sections/hero-v2.svelte`

**Interfaces:**
- Consumes: `static/photos/head-motif.png` as `/photos/head-motif.png`
- Produces: Complete SVG with `id="input-path"`, `id="output-path"`, `id="input-text"`, `id="output-text"` — ready for GSAP in Task 3

- [ ] **Step 1: Add the SVG with defs, paths, head motif, and static text streams**

Replace the `<!-- SVG composition goes here -->` comment inside the animation container div in `hero-v2.svelte` with the full SVG. The key elements:

1. `<defs>` block containing:
   - `inputPath` — curve from right side, arcing into the back of the head
   - `outputPath` — curve from the face area, arcing out to the left
   - `inputMask` — linearGradient-based mask that fades text near the head (right-to-left fade)
   - `outputMask` — linearGradient-based mask that fades text near the head (left-to-right fade)
   - `headGlow` — radialGradient for subtle glow behind the head

2. Head motif `<image>` centered in the viewBox

3. Two `<text>` elements with `<textPath>` referencing their respective paths, with `startOffset` attributes that GSAP will animate

Replace the `<!-- SVG composition goes here -->` placeholder:

```svelte
<svg
	viewBox="0 0 1200 700"
	class="h-full w-full"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	aria-hidden="true"
>
	<defs>
		<!-- Input path: curves from right edge into the back of the head -->
		<path
			id="input-path"
			d="M1250 480 C1100 380, 1000 280, 880 260 C780 245, 720 300, 670 350"
			fill="none"
		/>
		<!-- Output path: curves from the face outward to the left -->
		<path
			id="output-path"
			d="M530 320 C470 280, 400 250, 320 260 C220 275, 120 340, -50 400"
			fill="none"
		/>

		<!-- Mask for input text: visible on right, fades near head -->
		<linearGradient id="input-fade" x1="100%" y1="0%" x2="40%" y2="0%">
			<stop offset="0%" stop-color="white" />
			<stop offset="70%" stop-color="white" />
			<stop offset="100%" stop-color="black" />
		</linearGradient>
		<mask id="input-mask">
			<rect x="0" y="0" width="1200" height="700" fill="url(#input-fade)" />
		</mask>

		<!-- Mask for output text: fades near head, visible on left -->
		<linearGradient id="output-fade" x1="0%" y1="0%" x2="60%" y2="0%">
			<stop offset="0%" stop-color="white" />
			<stop offset="30%" stop-color="white" />
			<stop offset="100%" stop-color="black" />
		</linearGradient>
		<mask id="output-mask">
			<rect x="0" y="0" width="1200" height="700" fill="url(#output-fade)" />
		</mask>

		<!-- Glow behind the head -->
		<radialGradient id="head-glow" cx="50%" cy="45%" r="35%">
			<stop offset="0%" stop-color="#2A6268" stop-opacity="0.12" />
			<stop offset="60%" stop-color="#F6ECD9" stop-opacity="0.06" />
			<stop offset="100%" stop-color="#F6ECD9" stop-opacity="0" />
		</radialGradient>
	</defs>

	<!-- Subtle glow behind the head -->
	<ellipse cx="600" cy="340" rx="280" ry="260" fill="url(#head-glow)" />

	<!-- Head motif -->
	<image
		href="/photos/head-motif.png"
		x="430"
		y="60"
		width="340"
		height="480"
		preserveAspectRatio="xMidYMid meet"
	/>

	<!-- Input stream (bad thoughts) -->
	<g mask="url(#input-mask)">
		<text
			font-family="'Outfit', sans-serif"
			font-weight="600"
			font-size="22"
			fill="#6F231E"
			fill-opacity="0.7"
		>
			<textPath
				id="input-text-1"
				href="#input-path"
				startOffset="0%"
			>
				stress &#x2022; anxiety &#x2022; isolation &#x2022; burnout &#x2022; I can't cope &#x2022; why me &#x2022; not sleeping &#x2022; always busy &#x2022;
			</textPath>
		</text>
		<text
			font-family="'Outfit', sans-serif"
			font-weight="600"
			font-size="22"
			fill="#6F231E"
			fill-opacity="0.7"
		>
			<textPath
				id="input-text-2"
				href="#input-path"
				startOffset="50%"
			>
				stress &#x2022; anxiety &#x2022; isolation &#x2022; burnout &#x2022; I can't cope &#x2022; why me &#x2022; not sleeping &#x2022; always busy &#x2022;
			</textPath>
		</text>
	</g>

	<!-- Output stream (good thoughts) -->
	<g mask="url(#output-mask)">
		<text
			font-family="'Outfit', sans-serif"
			font-weight="500"
			font-size="22"
			fill="#2A6268"
		>
			<textPath
				id="output-text-1"
				href="#output-path"
				startOffset="0%"
			>
				clarity &#x2022; connection &#x2022; hope &#x2022; belonging &#x2022; I'm not alone &#x2022; healing &#x2022; supported &#x2022; seen &#x2022;
			</textPath>
		</text>
		<text
			font-family="'Outfit', sans-serif"
			font-weight="500"
			font-size="22"
			fill="#2A6268"
		>
			<textPath
				id="output-text-2"
				href="#output-path"
				startOffset="50%"
			>
				clarity &#x2022; connection &#x2022; hope &#x2022; belonging &#x2022; I'm not alone &#x2022; healing &#x2022; supported &#x2022; seen &#x2022;
			</textPath>
		</text>
	</g>
</svg>
```

Note: Two `<textPath>` elements per stream (offset 0% and 50%) ensures seamless coverage as text scrolls. The `&#x2022;` is a bullet separator between words.

- [ ] **Step 2: Verify in browser — static SVG**

Check the homepage. You should see:
- The head motif centered in the animation container
- A subtle glow behind it
- Bad thought words visible along a curve on the right side
- Good thought words visible along a curve on the left side
- Words fading near the head due to the gradient masks

The text is static at this point — no animation yet.

- [ ] **Step 3: Tune path geometry and head position**

Open the browser dev tools. Adjust the `d` attributes of `#input-path` and `#output-path`, and the `x`/`y`/`width`/`height` of the `<image>` element until:
- The input path's endpoint aligns with the back of the head silhouette
- The output path's start point aligns with the face/mouth area
- The curves feel organic — not too sharp, not too flat
- The head is vertically centered in the viewBox

Update the SVG in `hero-v2.svelte` with the tuned values.

- [ ] **Step 4: Take a screenshot to verify visual alignment**

Use the Ship Studio preview screenshot tool to capture the hero section. Verify:
- Head motif is centered and prominently visible
- Text streams curve naturally toward/away from the head
- Gradient masks create a visible fade effect near the head
- No text overlaps the head motif

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/pages/sections/hero-v2.svelte
git commit -m "feat: add SVG composition with paths, head motif, and text streams"
```

---

### Task 3: Add GSAP animation with reduced motion support

**Files:**
- Modify: `src/lib/components/pages/sections/hero-v2.svelte`

**Interfaces:**
- Consumes: `gsap` from `'gsap'`; SVG elements with IDs `input-text-1`, `input-text-2`, `output-text-1`, `output-text-2` from Task 2
- Produces: Running GSAP animation on mount, cleaned up on destroy

- [ ] **Step 1: Add GSAP import and animation logic to the script block**

Add `gsap` import and `onMount`/`onDestroy` lifecycle handling. The animation tweens the `startOffset` attribute on each `<textPath>` element. Two textPaths per stream (offset by 50%) create seamless looping.

Add these lines to the `<script lang="ts">` block in `hero-v2.svelte`:

```ts
import gsap from 'gsap';
import { onMount } from 'svelte';
import { browser } from '$app/environment';

let animationCtx: gsap.Context | undefined;

onMount(() => {
	if (!browser) return;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	animationCtx = gsap.context(() => {
		// Input stream: flows right-to-left (100% → -100%)
		// Two textPaths offset by 50% for seamless coverage
		gsap.to('#input-text-1', {
			attr: { startOffset: '-100%' },
			duration: 28,
			ease: 'none',
			repeat: -1
		});
		gsap.to('#input-text-2', {
			attr: { startOffset: '-50%' },
			duration: 28,
			ease: 'none',
			repeat: -1
		});

		// Output stream: flows left (0% → 100%)
		gsap.to('#output-text-1', {
			attr: { startOffset: '100%' },
			duration: 25,
			ease: 'none',
			repeat: -1
		});
		gsap.to('#output-text-2', {
			attr: { startOffset: '150%' },
			duration: 25,
			ease: 'none',
			repeat: -1
		});
	});

	return () => {
		animationCtx?.revert();
	};
});
```

Key details:
- Input stream duration 28s, output stream 25s — slightly different speeds so they don't look mechanically locked
- `ease: 'none'` — linear, smooth, constant flow
- `repeat: -1` — infinite loop
- `gsap.context()` scopes all tweens for clean teardown
- The `onMount` return function handles cleanup (Svelte 5 convention)
- `startOffset` goes from `0%` → `-100%` for input (pulling text leftward into the head) and `0%` → `100%` for output (pushing text leftward away from the head)

- [ ] **Step 2: Verify the animation runs in the browser**

Check the homepage. You should see:
- Bad thought words flowing from the right, curving along the input path, and fading as they reach the head
- Good thought words emerging from the head area, flowing along the output path to the left
- Both streams running continuously and smoothly
- No visible seam/gap in the text as it loops

- [ ] **Step 3: Test reduced motion**

In browser dev tools, enable "Prefers reduced motion" (Chrome: Rendering panel → Emulate CSS media feature → prefers-reduced-motion: reduce). Reload the page.

Verify:
- No animation runs
- Text streams are visible at their initial static positions
- The visual metaphor is still clear (bad thoughts on right, head in center, good thoughts on left)

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/pages/sections/hero-v2.svelte
git commit -m "feat: add GSAP flowing text animation with reduced motion support"
```

---

### Task 4: Final polish and visual verification

**Files:**
- Modify: `src/lib/components/pages/sections/hero-v2.svelte` (if adjustments needed)
- Modify: `src/routes/+page.svelte` (confirm final wiring)

**Interfaces:**
- Consumes: Complete `<HeroV2 />` component from Tasks 1-3
- Produces: Production-ready hero section on the homepage

- [ ] **Step 1: Check desktop rendering (lg+ breakpoint)**

Using the Ship Studio preview at full width. Verify:
- Copy block is centered and readable
- Animation container has appropriate spacing below the CTAs
- Head motif is prominent and well-sized (~350px tall)
- Both text streams are visible and flowing
- Gradient fade masks create a natural dissolve at the head
- No horizontal overflow / scrollbar

- [ ] **Step 2: Check mobile rendering (sm breakpoint)**

Set viewport to mobile width (375px). Verify:
- Copy block stacks properly (buttons stack vertically)
- Animation container scales down proportionally via the SVG viewBox
- Head motif is still recognizable at smaller size
- Text is readable (may be small — this is acceptable since it's decorative)
- No horizontal overflow

- [ ] **Step 3: Performance check**

Open browser dev tools Performance tab. Record 5 seconds of the animation. Verify:
- Consistent 60fps (no frame drops)
- No layout thrashing (no forced reflows in the timeline)
- Paint operations are minimal (attribute-level animation only)

- [ ] **Step 4: Tune any visual issues found**

If path alignment, text sizing, mask gradients, or spacing need adjustment, make the changes in `hero-v2.svelte`. Common adjustments:
- Path `d` attributes for curve alignment with the head
- `startOffset` initial values for text positioning
- Mask gradient stop positions for fade timing
- `font-size` on the text elements
- Head motif `x`/`y`/`width`/`height` positioning

- [ ] **Step 5: Final commit**

```bash
git add src/lib/components/pages/sections/hero-v2.svelte src/routes/+page.svelte
git commit -m "feat: finalize hero-v2 flowing thoughts animation"
```
