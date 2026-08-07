<script lang="ts">
	import { reveal } from '@/lib/actions/reveal';

	// Thoughts flow in from the left, pass through the head, and leave along the
	// band on the right.
	//
	// Head and band live in ONE viewBox, so the band always crosses the head at
	// the same point in artwork coordinates. Nothing about the viewport can move
	// them relative to each other.
	//
	// HEAD_CY is the single source of truth: the head is centred on it and the
	// band is drawn flat along it, so the strip passes through the middle of the
	// head by construction rather than by tuning.
	const HEAD_CX = 1000;
	const HEAD_CY = 260;
	const HEAD_SIZE = 340;

	// The head does not sit in the middle of its own PNG: the frame has
	// transparent padding above the crown and the shoulders fill the bottom.
	// Measured from dci-mark-2026.png, crown at row 63 and neck at row 361, so
	// the centre of the head itself is 0.424 down the frame, not 0.5. Aligning
	// to the frame centre puts the strip across the jaw instead of the head.
	const HEAD_CENTRE_FRAC = 0.424;

	const BAND_W = 80; // strip thickness, so it spans HEAD_CY plus or minus 40

	// Flat along HEAD_CY from before the head onward, so the crossing is exact.
	// The second control point shares HEAD_CY so the curve leaves horizontally
	// and meets the straight run without a kink.
	const GOOD_PATH = `M -300 400 C 150 400, 500 ${HEAD_CY}, 700 ${HEAD_CY} L 2300 ${HEAD_CY}`;
	// Tangles in from the left and resolves into the head.
	const BAD_PATH = `M -300 120 C 100 60, 260 300, 520 300 C 700 300, 760 180, 620 170 C 500 162, 520 300, 700 330 C 830 352, 900 300, ${HEAD_CX} ${HEAD_CY}`;

	const badPhrase =
		'stress · anxiety · isolation · burnout · why me · not sleeping · always busy · can’t cope · ';
	const goodPhrase =
		'clarity · connection · hope · belonging · healing · supported · seen · I’m not alone · ';

	const badText = badPhrase.repeat(12);
	const goodText = goodPhrase.repeat(12);
</script>

<section
	class="dci-thoughts relative w-full overflow-hidden"
	aria-label="What people carry in, and what they carry out"
	use:reveal={{ delay: 0, y: 24 }}
>
	<!--
		preserveAspectRatio slice: on narrow screens the composition crops at the
		sides instead of shrinking, so the head stays a readable size and the band
		stays legible. xMid keeps the head centred while it crops.
	-->
	<svg
		class="dci-thoughts__svg"
		viewBox="0 0 2000 560"
		preserveAspectRatio="xMidYMid slice"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<path id="dci-curve-bad" d={BAD_PATH} fill="none" />
			<path id="dci-curve-good" d={GOOD_PATH} fill="none" />
		</defs>

		<!-- 1. Bad thoughts, behind the head -->
		<g class="dci-thoughts__bad">
			<text x="-6000">
				<textPath href="#dci-curve-bad">{badText}</textPath>
				<animate attributeName="x" dur="44s" values="-6000; 0" repeatCount="indefinite" />
			</text>
		</g>

		<!-- 2. The head, centred on HEAD_CY -->
		<image
			href="/photos/dci-mark-2026.png"
			x={HEAD_CX - HEAD_SIZE / 2}
			y={HEAD_CY - HEAD_SIZE * HEAD_CENTRE_FRAC}
			width={HEAD_SIZE}
			height={HEAD_SIZE}
			preserveAspectRatio="xMidYMid meet"
		/>

		<!-- 3. The strip, in front of the head, flat along HEAD_CY -->
		<path d={GOOD_PATH} fill="none" stroke="#1A3C40" stroke-width={BAND_W} stroke-linecap="butt" />
		<g class="dci-thoughts__good">
			<text x="-7000">
				<textPath href="#dci-curve-good">{goodText}</textPath>
				<animate attributeName="x" dur="54s" values="-7000; 0" repeatCount="indefinite" />
			</text>
		</g>
	</svg>
</section>

<style>
	.dci-thoughts {
		/* Height drives how much of the 2000 unit width is visible. */
		height: clamp(190px, 24vw, 340px);
	}

	.dci-thoughts__svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* Bad thoughts: ghostly, thin */
	.dci-thoughts__bad text {
		font-family: 'Outfit', sans-serif;
		font-size: 46px;
		font-weight: 400;
		fill: #1a3c40;
		fill-opacity: 0.4;
		dominant-baseline: central;
	}

	/* Good thoughts: bold cream, riding the strip */
	.dci-thoughts__good text {
		font-family: 'Outfit', sans-serif;
		font-size: 44px;
		font-weight: 600;
		fill: #f6ecd9;
		dominant-baseline: central;
	}

	/*
		No prefers-reduced-motion rule here on purpose. These marquees are SMIL,
		which CSS cannot stop. useReducedMotionSvg() in the root layout pauses
		them properly via pauseAnimations().
	*/
</style>
