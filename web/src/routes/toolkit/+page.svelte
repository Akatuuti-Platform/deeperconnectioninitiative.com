<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import ToolkitDemo from '$lib/components/pages/sections/toolkit-demo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';
	import { ArrowUpRightIcon as ArrowUpRight, SparkleIcon } from 'phosphor-svelte';

	// Autoplay the flipbook previews only when reduced motion isn't requested.
	let allowMotion = $state(false);
	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const products = [
		{
			name: 'DCI Card Game',
			description: 'Conversation prompts for low-pressure emotional check-ins.',
			price: '69,000 UGX',
			href: paymentLinks.cardGame,
			image: '/photos/product-card-game.jpg',
			video: null as string | null,
			bg: 'bg-[#EAD5C8]'
		},
		{
			name: 'DCI Reflection Journal',
			description: 'Guided pages for processing, naming, and noticing what is happening.',
			price: '120,000 UGX',
			href: paymentLinks.journal,
			image: '/photos/product-journal.jpg',
			video: '/videos/journal.mp4',
			bg: 'bg-[#EEF1E5]'
		},
		{
			name: 'DCI Mood Tracker',
			description: 'A simple daily rhythm for noticing emotional patterns over time.',
			price: '31,000 UGX',
			href: paymentLinks.moodTracker,
			image: '/photos/product-mood-tracker.jpg',
			video: '/videos/mood-tracker.mp4',
			bg: 'bg-[#ECE7DA]'
		}
	];
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="mb-12 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
			<div class="space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
				>
					<SparkleIcon class="size-4 text-dci-teal" weight="duotone" />
					<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
						Open the kit
					</span>
				</div>
				<div class="space-y-5">
					<h1
						class="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
					>
						Explore the tools before choosing what fits.
					</h1>
					<p class="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
						The DCI toolkit is designed to be tactile and practical: cards to open conversation, a
						journal to shape reflection, and a mood tracker to notice patterns.
					</p>
				</div>
			</div>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="rounded-[2rem] bg-dci-cream p-6 shadow-dci-lift sm:p-8"
			>
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
					How to use this page
				</p>
				<p class="mt-4 text-2xl font-semibold leading-tight text-slate-950">
					Tap through the kit demo, then choose the individual tool or full kit that matches your
					setting.
				</p>
			</div>
		</div>

		<ToolkitDemo />
	</div>
</section>

<section id="toolkit-products" class="scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Choose a tool</p>
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
				Buy one piece or support access to the full kit.
			</h2>
		</div>

		<div class="grid gap-5 lg:grid-cols-[1fr_1fr_1fr_1.1fr]">
			{#each products as product, index}
				<article
					use:reveal={{ delay: index * 80, y: 18 }}
					class="dci-soft-hover flex min-h-72 flex-col overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-cream shadow-dci-lift"
				>
					<div class={`relative aspect-[4/3] overflow-hidden ${product.bg}`}>
						{#if product.video}
							<video
								src={product.video}
								poster={product.image}
								autoplay={allowMotion}
								loop
								muted
								playsinline
								preload="none"
								aria-label={`${product.name} preview`}
								class="h-full w-full object-cover"
							></video>
						{:else}
							<img
								src={product.image}
								alt={product.name}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						{/if}
					</div>
					<div class="flex flex-1 flex-col justify-between p-6">
						<div>
							<h3 class="text-2xl font-semibold leading-tight text-slate-950">{product.name}</h3>
							<p class="mt-3 text-sm leading-relaxed text-slate-700">{product.description}</p>
						</div>
						<div class="mt-8">
							<p class="text-lg font-bold text-dci-teal-deep">{product.price}</p>
							<Button
								href={product.href}
								target="_blank"
								rel="noopener noreferrer"
								class="mt-4 rounded-full"
							>
								Get this tool
								<ArrowUpRight class="size-4" weight="regular" />
							</Button>
						</div>
					</div>
				</article>
			{/each}

			<article
				use:reveal={{ delay: 260, y: 18 }}
				class="flex min-h-72 flex-col justify-between rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream shadow-dci-lift"
			>
				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
						Complete kit
					</p>
					<h3 class="mt-4 text-3xl font-semibold leading-tight text-white">All tools together.</h3>
					<p class="mt-3 text-sm leading-relaxed text-dci-cream/72">
						Card Game, Reflection Journal, Mood Tracker, and QR access bundled for personal and
						group support.
					</p>
				</div>
				<div class="mt-8 flex flex-col gap-3">
					<Button
						href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer"
						size="lg"
						class="rounded-full bg-dci-cream text-dci-teal-deep hover:bg-white"
					>
						Buy complete kit
					</Button>
					<Button
						href={paymentLinks.donation} target="_blank" rel="noopener noreferrer"
						size="lg"
						variant="outline"
						class="rounded-full border-dci-cream/30 bg-transparent text-dci-cream hover:bg-dci-cream/10"
					>
						Sponsor a kit
					</Button>
				</div>
			</article>
		</div>
	</div>
</section>
