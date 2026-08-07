<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import HeadCarousel from '@/lib/components/head-carousel.svelte';
	import { heroCarouselImages } from '@/lib/hero-carousel-images';
	import { reveal } from '@/lib/actions/reveal';
</script>

<section class="relative w-full overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
	<!-- Soft brand wash behind the carousel column, desktop only. -->
	<div
		class="pointer-events-none absolute top-1/2 right-[-10%] hidden size-[36rem] -translate-y-1/2 rounded-full bg-dci-teal/8 blur-3xl lg:block"
	></div>

	<div
		class="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
	>
		<!-- Message first in the DOM, so it also comes first when the layout stacks. -->
		<div class="max-w-2xl space-y-7" use:reveal={{ delay: 0, y: 18 }}>
			<div
				class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
				<span class="text-xs font-semibold tracking-tight text-accent">Own your healing</span>
			</div>

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

			<p class="max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
				A mental health initiative equipping individuals and communities with a physical toolkit
				and an AI-powered early warning system for emotional wellbeing.
			</p>

			<div class="flex flex-col gap-3 pt-1 sm:flex-row">
				<Button
					href="/toolkit#toolkit-products"
					class={cn(buttonVariants({ size: 'lg' }), 'bg-primary px-8')}
				>
					Buy a Toolkit
				</Button>
				<Button
					href="/checkout/donate"
					variant="outline"
					size="lg"
					class="rounded-md border-dci-teal/25 bg-transparent px-8 text-dci-teal-deep hover:bg-dci-teal/7"
				>
					Sponsor a Toolkit
				</Button>
			</div>
		</div>

		<!-- Carousel second in the DOM: below the message on small screens. -->
		<div class="relative mx-auto w-full max-w-md lg:max-w-none" use:reveal={{ delay: 160, y: 24 }}>
			<HeadCarousel
				images={heroCarouselImages}
				class="w-full"
				label="Moments from DCI clinics and community sessions"
			/>
		</div>
	</div>
</section>
