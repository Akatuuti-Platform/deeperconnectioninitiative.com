<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import { reveal } from '@/lib/actions/reveal';

	const badPhrase =
		'stress \u00b7 anxiety \u00b7 isolation \u00b7 burnout \u00b7 why me \u00b7 not sleeping \u00b7 always busy \u00b7 can\u2019t cope \u00b7 ';
	const goodPhrase =
		'clarity \u00b7 connection \u00b7 hope \u00b7 belonging \u00b7 healing \u00b7 supported \u00b7 seen \u00b7 I\u2019m not alone \u00b7 ';

	const badText = badPhrase.repeat(10);
	const goodText = goodPhrase.repeat(10);
</script>

<section
	class="relative w-full overflow-hidden px-4 pt-32 pb-0 sm:px-6 lg:px-8 lg:pt-40 lg:pb-0"
>
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
	</div>

	<!-- Flowing thoughts animation — side by side: [left curve] [HEAD] [right curve] -->
	<div
		class="relative mx-auto mt-4 flex w-full max-w-7xl items-center lg:mt-6"
		use:reveal={{ delay: 200, y: 30 }}
	>
		<!-- Left: bad thoughts flowing L→R into the head -->
		<div class="hero-anim-left flex-1">
			<svg
				width="100%"
				height="auto"
				viewBox="0 0 1048 594"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="curve-bad"
					d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
					stroke="#EFE5D0"
				/>
				<text x="-3300">
					<textPath id="marquee-bad" href="#curve-bad">{badText}</textPath>
					<animate
						attributeName="x"
						dur="40s"
						values="-3300; 0"
						repeatCount="indefinite"
					/>
				</text>
			</svg>
		</div>

		<!-- Center: DCI logo mark head (on top of both curves via z-index) -->
		<div class="pointer-events-none relative z-10 mx-[-4%] shrink-0">
			<img
				src="/photos/dci-logo-mark.png"
				alt=""
				class="h-[180px] w-auto object-contain sm:h-[240px] lg:h-[300px]"
				loading="lazy"
			/>
		</div>

		<!-- Right: good thoughts flowing L→R away from the head -->
		<div class="hero-anim-right flex-1">
			<svg
				width="100%"
				height="auto"
				viewBox="0 0 1024 620"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="curve-good"
					d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
					stroke="#1A3C40"
					stroke-width="30"
				/>
				<text x="-4500">
					<textPath id="marquee-good" href="#curve-good">{goodText}</textPath>
					<animate
						attributeName="x"
						dur="50s"
						values="-4500; 0"
						repeatCount="indefinite"
					/>
				</text>
			</svg>
		</div>
	</div>
</section>

<style>
	/* Bad thoughts text — ghostly, thin */
	:global(#marquee-bad) {
		font-size: inherit;
		font-weight: 400;
		fill: #1a3c40;
		baseline-shift: -20%;
		opacity: 0.4;
	}

	/* Good thoughts text — bold, cream on dark band */
	:global(#marquee-good) {
		font-size: inherit;
		font-weight: 600;
		fill: #f6ecd9;
		baseline-shift: -30%;
	}

	/* SVG paths should be transparent fill */
	:global(#curve-bad),
	:global(#curve-good) {
		fill: transparent;
	}

	/* Side-by-side layout — curves flanking the head */
	.hero-anim-left,
	.hero-anim-right {
		position: relative;
		z-index: 1;
		overflow: visible;
	}

	/* Reduced motion — pause animations */
	@media (prefers-reduced-motion: reduce) {
		:global(#marquee-bad animate),
		:global(#marquee-good animate) {
			animation-play-state: paused;
		}
	}
</style>
