<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import { reveal } from '@/lib/actions/reveal';
</script>

<section class="relative w-full overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-28">
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

	<div class="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center" use:reveal={{ delay: 0, y: 18 }}>
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
</section>
