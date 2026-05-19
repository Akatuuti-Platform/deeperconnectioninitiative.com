<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
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

	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="max-w-2xl space-y-8">
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

				<p class="max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
					A mental health initiative helping people build emotional strength through tactile
					toolkits, guided reflection, storytelling, and community connection.
				</p>
			</div>

			<div class="flex flex-col gap-3 sm:flex-row">
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

			<div class="grid max-w-xl grid-cols-3 gap-3 pt-4 text-xs text-foreground/70">
				<div class="border-t border-primary/25 pt-3">Community-rooted</div>
				<div class="border-t border-accent/25 pt-3">Offline-first</div>
				<div class="border-t border-foreground/20 pt-3">Trauma-aware</div>
			</div>
		</div>

		<div class="relative min-h-[560px]">
			<div
				class="absolute right-0 top-0 h-[460px] w-[74%] overflow-hidden rounded-[2rem] bg-[#183D3F] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.7)]"
			>
				<div
					class="absolute inset-0 opacity-20"
					style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 24px 24px;"
				></div>
				<div class="relative flex h-full items-end justify-end">
					<div class="grid w-[78%] grid-cols-3 gap-3 -rotate-6">
						{#each Array(9) as _, index}
							<div
								class={`aspect-[3/4] rounded-xl border border-[#F6ECD9]/20 p-3 ${index % 3 === 0 ? 'bg-[#F6ECD9]' : index % 3 === 1 ? 'bg-[#DFA169]' : 'bg-[#F4D5D0]'}`}
							>
								<div class="h-1.5 w-10 rounded-full bg-[#183D3F]/45"></div>
								<div class="mt-8 space-y-1.5">
									<div class="h-1 rounded-full bg-[#183D3F]/20"></div>
									<div class="h-1 rounded-full bg-[#183D3F]/20"></div>
									<div class="h-1 w-2/3 rounded-full bg-[#183D3F]/20"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="absolute left-0 top-24 w-[48%] overflow-hidden rounded-[1.6rem] border-[10px] border-background bg-white shadow-[0_22px_50px_-35px_rgba(0,0,0,0.65)]"
			>
				<div class="aspect-[4/5] bg-[#F6ECD9] p-6">
					<div class="h-full rounded-xl border-2 border-[#2A6268]/25 p-5">
						<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">
							Reflection Journal
						</p>
						<div class="mt-12 space-y-3">
							<div class="h-2 rounded-full bg-[#2A6268]/25"></div>
							<div class="h-2 rounded-full bg-[#2A6268]/20"></div>
							<div class="h-2 w-2/3 rounded-full bg-[#2A6268]/20"></div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="absolute right-12 bottom-0 w-[38%] overflow-hidden rounded-[1.5rem] border-[10px] border-background bg-white shadow-[0_22px_50px_-35px_rgba(0,0,0,0.65)]"
			>
				<div class="aspect-[4/5] bg-[#EEF1E5] p-5">
					<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">Mood Tracker</p>
					<div class="mt-10 grid grid-cols-5 gap-2">
						{#each Array(25) as _, index}
							<div
								class={`aspect-square rounded-full ${index % 5 === 0 ? 'bg-[#6F231E]' : index % 4 === 0 ? 'bg-[#DFA169]' : 'bg-[#2A6268]/25'}`}
							></div>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="absolute bottom-24 left-[22%] max-w-[250px] rounded-2xl border border-[#EFE5D0] bg-[#ffffeb] p-4 shadow-[0_18px_45px_-32px_rgba(0,0,0,0.75)]"
			>
				<p class="text-[0.65rem] font-bold uppercase tracking-widest text-accent">Inside the kit</p>
				<p class="mt-2 text-sm leading-snug text-foreground/75">
					Cards, journal prompts, mood tracking, and QR access for guided wellness learning.
				</p>
			</div>
		</div>
	</div>
</section>
