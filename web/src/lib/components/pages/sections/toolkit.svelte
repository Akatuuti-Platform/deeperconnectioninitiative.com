<script lang="ts">
	import {
		ArrowUpRightIcon as ArrowUpRight,
		HandshakeIcon as HeartHandshake,
		QrCodeIcon as QrCode,
		SparkleIcon as Sparkles
	} from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';

	// Only autoplay the product videos when the user hasn't asked for reduced
	// motion. Starts off (poster shown) and enables on the client if allowed,
	// so motion-sensitive users never see a flash of playback.
	let allowMotion = $state(false);
	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const products = [
		{
			name: 'DCI Card Game',
			kicker: 'Conversation Cards',
			description:
				"60 conversation cards that open the doors you've been keeping closed. Play with friends, family, or use them solo alongside your journal. Start light, go as deep as you're ready for — each card is a question worth sitting with.",
			credit: 'Compiled by Ann Banya — Early Child Development Specialist, 40+ years of experience.' as
				| string
				| null,
			miles: '8 Connection Miles™',
			impact: '8 lives impacted',
			price: '69,000 UGX',
			image: '/photos/product-card-game.jpg',
			video: null as string | null,
			paymentLink: paymentLinks.cardGame,
			border: 'border-dci-burgundy/20',
			badge: 'border-dci-burgundy/25 bg-dci-burgundy/10 text-dci-burgundy'
		},
		{
			name: 'DCI Reflection Journal',
			kicker: 'Guided Reflection',
			description:
				'A year-long emotional healing journey, guided by Ann Banya. Each month explores a different stage of your development — helping you understand where your patterns, habits, and feelings actually came from. Because healing starts with understanding your story.',
			credit: null as string | null,
			miles: '1 Connection Mile™',
			impact: 'Your life, on the map',
			price: '120,000 UGX',
			image: '/photos/product-journal.jpg',
			video: '/videos/journal.mp4',
			paymentLink: paymentLinks.journal,
			border: 'border-dci-teal/20',
			badge: 'border-dci-teal/25 bg-dci-teal/10 text-dci-teal'
		},
		{
			name: 'DCI Mood Tracker',
			kicker: 'Daily Awareness',
			description:
				'12 months. Daily check-ins. One colour at a time. Track how you actually feel — not how you think you should feel. Look back weekly or monthly and start to see your patterns: what triggers you, what restores you, what your stress has been trying to tell you all along.',
			credit: null as string | null,
			miles: '1 Connection Mile™',
			impact: '1 life tracked',
			price: '31,000 UGX',
			image: '/photos/product-mood-tracker.jpg',
			video: '/videos/mood-tracker.mp4',
			paymentLink: paymentLinks.moodTracker,
			border: 'border-dci-teal-deep/20',
			badge: 'border-dci-teal-deep/25 bg-dci-teal-deep/10 text-dci-teal-deep'
		}
	];
</script>

<section id="toolkit" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
	<div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
		<header class="relative space-y-6 lg:sticky lg:top-28 lg:self-start" use:reveal={{ delay: 0, y: 18 }}>
			<div
				class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
			>
				<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
					The DCI Wellness Toolkit
				</span>
			</div>
			<div class="space-y-4">
				<h2
					class="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl"
				>
					Physical tools for conversations people can actually start.
				</h2>
				<p class="max-w-md text-base leading-relaxed text-slate-700 sm:text-lg">
					Designed for homes, schools, clinics, youth groups, and community circles where support
					needs to work without perfect internet, expert language, or a formal therapy room.
				</p>
				<p class="max-w-md text-sm leading-relaxed text-slate-600">
					Every tool is measured in
					<a
						href="/connection-miles"
						class="font-semibold text-dci-teal underline-offset-2 hover:underline"
					>
						Connection Miles™
					</a>
					— our way of tracking the real connection each purchase puts into the world.
				</p>
			</div>

			<div class="grid max-w-md grid-cols-2 gap-3 text-sm text-slate-700">
				<div class="rounded-2xl border border-dci-teal/15 bg-white/45 p-4">
					<QrCode class="mb-5 size-5 text-dci-teal" weight="duotone" />
					QR access to low-data digital resources.
				</div>
				<div class="rounded-2xl border border-dci-burgundy/15 bg-white/45 p-4">
					<HeartHandshake class="mb-5 size-5 text-dci-burgundy" weight="duotone" />
					10% supports training and donated kits.
				</div>
			</div>

			<Button
				href="/toolkit"
				variant="outline"
				class="rounded-full border-dci-teal/25 bg-dci-paper/60 px-5 text-dci-teal-deep hover:bg-dci-teal/7"
			>
				Open the kit
				<ArrowUpRight class="size-4" weight="regular" />
			</Button>

			<div class="pointer-events-none relative hidden h-44 max-w-md lg:block">
				<SpotIllustration
					variant="toolkit"
					class="dci-float-slow absolute -left-8 -top-5 w-80 opacity-95 [--float-rotate:-3deg]"
				/>
			</div>
		</header>

		<div class="space-y-6">
			<div id="toolkit-products" class="scroll-mt-28"></div>
			{#each products as product, index}
				<article
					use:reveal={{ delay: index * 90, y: 22 }}
					class={`group grid overflow-hidden rounded-[2rem] border bg-dci-paper shadow-dci-lift transition duration-500 hover:-translate-y-1 md:grid-cols-[0.82fr_1fr] md:min-h-[22rem] ${product.border}`}
				>
					<div class={`relative min-h-72 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
						{#if product.video}
							<video
								src={product.video}
								poster={product.image}
								autoplay={allowMotion}
								loop
								muted
								playsinline
								preload="none"
								aria-label={product.name}
								class={`h-full min-h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] ${index === 0 ? 'bg-dci-blush' : index === 1 ? 'bg-dci-mist' : 'bg-dci-oat'}`}
							></video>
						{:else}
							<img
								src={product.image}
								alt={product.name}
								loading="lazy"
								class={`h-full min-h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] ${index === 0 ? 'bg-dci-blush' : index === 1 ? 'bg-dci-mist' : 'bg-dci-oat'}`}
							/>
						{/if}
						<div
							class="absolute top-4 left-4 rounded-full bg-dci-paper/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-slate-700"
						>
							{product.kicker}
						</div>
					</div>

					<div class="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
						<div class="space-y-4">
							<h3 class="text-3xl font-semibold leading-tight text-slate-950">{product.name}</h3>
							<p class="max-w-md text-base leading-relaxed text-slate-700">{product.description}</p>
							{#if product.credit}
								<p class="max-w-md text-sm italic leading-relaxed text-slate-500">{product.credit}</p>
							{/if}
							<div class="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
								<span
									class={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest ${product.badge}`}
								>
									{product.miles}
								</span>
								<span class="text-sm text-slate-500">{product.impact}</span>
							</div>
						</div>

						<div class="flex flex-wrap items-center justify-between gap-4">
							<p class="text-2xl font-bold tracking-tight text-dci-teal-deep">{product.price}</p>
							<Button href={product.paymentLink} target="_blank" rel="noopener noreferrer" class="rounded-full px-5">
								Get this tool
								<ArrowUpRight class="size-4" weight="regular" />
							</Button>
						</div>
					</div>
				</article>
			{/each}

			<article
				use:reveal={{ delay: 120, y: 22 }}
				class="overflow-hidden rounded-[2rem] border border-dci-cream/15 bg-dci-ink text-dci-cream"
			>
				<img
					src="/photos/product-full-toolkit.jpg"
					alt="The complete DCI toolkit: card game, reflection journal, and mood tracker"
					loading="lazy"
					class="h-56 w-full object-cover sm:h-64 lg:h-72"
				/>
				<div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
					<div class="space-y-5">
						<div
							class="inline-flex items-center gap-2 rounded-full border border-dci-cream/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-dci-cream/75"
						>
							<Sparkles class="size-3.5" weight="duotone" />
							Recommended
						</div>
						<h3 class="text-4xl font-semibold leading-tight text-white">The full toolkit</h3>
						<p class="max-w-xl text-base leading-relaxed text-dci-cream/75">
							Card Game, Reflection Journal, Mood Tracker, and QR access bundled for everyday
							self-awareness, group facilitation, and community support.
						</p>
					</div>

					<div
						class="flex flex-col justify-between gap-8 border-t border-dci-cream/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
					>
						<div>
							<p class="text-sm uppercase tracking-widest text-dci-cream/70">Complete kit</p>
							<div class="mt-2 flex items-end gap-3">
								<span class="text-5xl font-bold text-white">200k</span>
								<span class="mb-2 text-sm text-dci-cream/60">UGX</span>
							</div>
							<p class="mt-3 text-xs text-dci-cream/70">10% funds community champion training.</p>
						</div>

						<div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
							<Button
								href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer"
								size="lg"
								class="rounded-full bg-dci-cream text-dci-ink hover:bg-white"
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
					</div>
				</div>
			</article>
		</div>
	</div>
</section>
