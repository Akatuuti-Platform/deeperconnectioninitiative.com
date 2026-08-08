<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import ProductCarousel from '$lib/components/product-carousel.svelte';
	import CheckoutDrawer from '$lib/components/checkout-drawer.svelte';
	import { toolkitProducts } from '$lib/toolkit-products';
	import { cn } from '$lib/utils';

	import {
		ArrowUpRightIcon,
		BookOpenTextIcon,
		BuildingsIcon,
		GraduationCapIcon,
		HandshakeIcon,
		PlayIcon
	} from 'phosphor-svelte';

	// Buying happens in place: the drawer posts straight to the product's
	// checkout action, so the next page a buyer sees is Flutterwave itself.
	let buying = $state<{ slug: string; name: string; price: string } | null>(null);

	// Organisational enquiries go to WhatsApp rather than the contact form,
	// because the form silently drops messages while Resend is unconfigured.
	const WHATSAPP_ORG =
		'https://wa.me/256773855144?text=' +
		encodeURIComponent(
			'Hello DCI. I am enquiring on behalf of an organisation and would like to book a call.'
		);

	// The explainer plays on demand, so no YouTube request is made on page load.
	let playing = $state(false);
	// Reset when moving between doors, so the video never follows you.
	function selectPath(path: Pathway) {
		activePath = path;
		playing = false;
	}

	const pathways = [
		{
			id: 'tools',
			label: 'I want tools',
			kicker: 'Own your healing',
			icon: BookOpenTextIcon,
			illustration: 'toolkit',
			title: 'I am ready to own my healing.',
			description:
				'Three tools that give you somewhere to start. Everything works on paper, so a conversation can happen anywhere, with anyone, without waiting for an appointment.',
			// Products render inline instead of the three step labels.
			products: toolkitProducts,
			steps: [],
			helper: 'Want all three? The full toolkit is 200,000 UGX and earns 10 Connection Miles.',
			href: '/clinics',
			cta: 'Attend a clinic',
			accent: '#2A6268'
		},
		{
			id: 'lead',
			label: 'I want to lead',
			kicker: 'Become a champion',
			icon: GraduationCapIcon,
			illustration: 'community',
			title: 'I am a mental health advocate.',
			description:
				'There will never be enough counsellors. There are already enough people who care. Training of Trainers certifies you to facilitate a session safely, use the toolkit with a group, recognise when someone needs more than you can give, and follow the referral procedure.',
			// One offer, rendered inline instead of the three step labels.
			steps: [],
			offer: {
				name: 'Community Champion certification',
				body: 'Training of Trainers certifies you to facilitate a session safely, use the toolkit with a group, recognise when someone needs more than you can give, and follow the referral procedure.',
				total: '500,000 UGX',
				deposit: '150,000 UGX',
				depositNote: 'A 30 per cent deposit reserves your place on the waitlist. The balance of 350,000 UGX is due before training begins.',
				href: '/checkout/champion-deposit',
				cta: 'Pay deposit and join the waitlist'
			},
			helper: 'Training days are announced at the next Conversation Clinic.',
			href: '/performance',
			cta: 'Take the free Blueprint Assessment',
			accent: '#6F231E'
		},
		{
			id: 'organisation',
			label: 'I run an organisation',
			kicker: 'Early Warning System',
			icon: BuildingsIcon,
			illustration: 'care',
			title: 'I am an organisation or a funder.',
			description:
				'You can count who showed up. We help you see what changed. Participants complete a paper mood tracker themselves, trained champions collect them, and we turn them into cohort-level measures with a documented referral procedure attached. You see the pattern. Never the person.',
			steps: [],
			video: {
				id: 'wMUYQ6uZn0Q',
				title: 'How DCI works with organisations'
			},
			helper:
				"The Early Warning System earns no Connection Miles of its own. It is what makes everyone else's countable.",
			href: WHATSAPP_ORG,
			cta: 'Talk to us on WhatsApp',
			accent: '#2A6268'
		},
		{
			id: 'give',
			label: 'I want to give',
			kicker: 'Sponsor access',
			icon: HandshakeIcon,
			illustration: 'community',
			title: "I want to fund someone else's start.",
			description:
				'A toolkit for someone who cannot buy one, or a scholarship place on Champion training. One sponsored toolkit is 10 Connection Miles. Ten lives, none of them yours.',
			steps: ['Choose what to fund', 'We match it to a site', 'You see where it went'],
			helper:
				'Ten per cent of every toolkit sold already funds Champion training. Venue partners, DCI Angels and the provider network start at Volunteering.',
			href: '/checkout/donate',
			cta: 'Sponsor a kit',
			accent: '#6F231E'
		}
	] as const;

	type Pathway = (typeof pathways)[number];

	let activePath = $state<Pathway>(pathways[0]);
</script>

<section
	id="find-your-path"
	class="relative z-10 scroll-mt-28 overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
>
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-dci-teal-deep text-dci-cream shadow-dci-panel lg:grid-cols-[0.82fr_1.18fr]"
	>
		<div class="relative p-6 sm:p-8 lg:p-10">
			<div
				class="pointer-events-none absolute inset-0 opacity-10"
				style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 28px 28px;"
			></div>
			<div class="relative">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
					Find your path
				</p>
				<h2 class="mt-4 max-w-md text-4xl font-semibold leading-tight text-white sm:text-5xl">
					Start where you are.
				</h2>
				<p class="mt-4 max-w-md text-base leading-relaxed text-dci-cream/72">
					DCI can be a toolkit, a training path, a measurement system, or a way to sponsor access. Choose
					the entry point that matches what brought you here.
				</p>

				<div class="mt-8 grid gap-2">
					{#each pathways as path}
						{@const Icon = path.icon}
						<button
							type="button"
							class={cn(
								'group grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition duration-300',
								activePath.id === path.id
									? 'border-dci-cream/28 bg-dci-cream/12 text-white'
									: 'border-dci-cream/10 bg-dci-cream/5 text-dci-cream/78 hover:bg-dci-cream/9'
							)}
							aria-pressed={activePath.id === path.id}
							onclick={() => selectPath(path)}
						>
							<span
								class={cn(
									'flex size-11 items-center justify-center rounded-xl transition',
									activePath.id === path.id ? 'bg-dci-cream text-dci-teal-deep' : 'bg-dci-cream/10'
								)}
							>
								<Icon class="size-5" weight="duotone" />
							</span>
							<span>
								<span class="block text-sm font-semibold">{path.label}</span>
								<span class="mt-1 block text-xs text-dci-cream/58">{path.kicker}</span>
							</span>
							<span
								class={cn(
									'h-2 w-2 rounded-full transition',
									activePath.id === path.id ? 'bg-dci-clay' : 'bg-dci-cream/18'
								)}
							></span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="relative min-h-[34rem] overflow-hidden bg-dci-cream p-6 text-slate-950 sm:p-8 lg:p-10">
			<SpotIllustration
				variant={activePath.illustration}
				class="dci-float-slow pointer-events-none absolute -right-28 -bottom-6 hidden w-[27rem] opacity-16 [--float-rotate:2deg] lg:block"
			/>
			<div class="relative z-10 flex h-full max-w-2xl flex-col justify-between">
				<div>
					<div
						class="inline-flex items-center rounded-full border border-dci-teal/15 bg-dci-paper/70 px-3 py-1"
					>
						<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
							{activePath.kicker}
						</span>
					</div>
					<h3 class="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
						{activePath.title}
					</h3>
					<p class="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
						{activePath.description}
					</p>
				</div>

				<div class="mt-10">
					{#if 'video' in activePath && activePath.video}
						<!-- Click to play, so no YouTube request is made until it is wanted. -->
						<div class="max-w-md overflow-hidden rounded-2xl border border-dci-teal/12 bg-dci-ink">
							{#if playing}
								<div class="aspect-video w-full">
									<iframe
										src={`https://www.youtube-nocookie.com/embed/${activePath.video.id}?autoplay=1&rel=0`}
										title={activePath.video.title}
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
										class="h-full w-full"
									></iframe>
								</div>
							{:else}
								<button
									type="button"
									onclick={() => (playing = true)}
									aria-label={`Play video: ${activePath.video.title}`}
									class="group relative flex aspect-video w-full items-center justify-center"
								>
									<img
										src="/photos/ann-banya.jpg"
										alt=""
										loading="lazy"
										class="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-80"
									/>
									<span
										class="relative flex size-14 items-center justify-center rounded-full bg-dci-cream/95 text-dci-teal-deep shadow-dci-lift transition group-hover:scale-105"
									>
										<PlayIcon class="ml-0.5 size-6" weight="fill" />
									</span>
									<span class="absolute bottom-3 left-4 right-4 text-left text-sm font-semibold text-dci-cream">
										{activePath.video.title}
									</span>
								</button>
							{/if}
						</div>
					{:else if 'products' in activePath && activePath.products}
						<!-- Buyable inline. Horizontal rows on phones, three columns above that,
						     so the panel does not balloon on small screens. -->
						<div class="grid gap-3 sm:grid-cols-3">
							{#each activePath.products as product}
								<article
									class="flex items-center gap-3 rounded-2xl border border-dci-teal/12 bg-dci-paper/65 p-3 sm:flex-col sm:items-stretch sm:gap-2"
								>
									<!-- object-contain, so no product is cropped despite the three
									     photo sets having different aspect ratios. -->
									<ProductCarousel
										images={product.photos}
										alt={product.name}
										showDots={false}
										class="size-16 shrink-0 rounded-xl sm:hidden"
									/>
									<ProductCarousel
										images={product.photos}
										alt={product.name}
										class="hidden aspect-[4/3] w-full rounded-xl sm:block"
									/>
									<div class="min-w-0 flex-1 sm:flex-none">
										<p class="text-sm font-semibold leading-tight text-slate-950">{product.name}</p>
										<p class="mt-0.5 text-xs font-semibold text-dci-teal-deep">
											{product.price} · {product.miles}
										</p>
										<p class="mt-1 text-xs leading-snug text-slate-600">{product.line}</p>
									</div>
									<button
										type="button"
										onclick={() => (buying = { slug: product.slug, name: product.name, price: product.price })}
										class="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-dci-teal-deep px-4 text-xs font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.98] sm:w-full"
									>
										Buy
									</button>
								</article>
							{/each}
						</div>
					{:else if 'offer' in activePath && activePath.offer}
						<article
							class="rounded-2xl border border-dci-teal/15 bg-dci-paper/65 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6"
						>
							<div class="min-w-0">
								<p class="text-sm font-semibold leading-tight text-slate-950">
									{activePath.offer.name}
								</p>
								<p class="mt-2 text-xs leading-relaxed text-slate-600">{activePath.offer.body}</p>
								<p class="mt-3 text-sm font-semibold text-dci-teal-deep">
									{activePath.offer.deposit} deposit
									<span class="font-normal text-slate-500">of {activePath.offer.total}</span>
								</p>
								<p class="mt-1 text-xs leading-snug text-slate-600">
									{activePath.offer.depositNote}
								</p>
							</div>
							<a
								href={activePath.offer.href}
								class="mt-4 inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-dci-teal-deep px-6 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.98] sm:mt-0"
							>
								{activePath.offer.cta}
							</a>
						</article>
					{:else}
						<div class="grid gap-3 sm:grid-cols-3">
							{#each activePath.steps as step, index}
								<div class="rounded-2xl border border-dci-teal/12 bg-dci-paper/65 p-4">
									<p class="text-xs font-semibold text-dci-burgundy/70">0{index + 1}</p>
									<p class="mt-3 text-sm font-semibold leading-snug text-dci-teal-deep">{step}</p>
								</div>
							{/each}
						</div>
					{/if}

					<div class="mt-8 flex flex-col gap-3 border-t border-dci-teal/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
						<div class="max-w-sm space-y-2">
							<p class="text-sm leading-relaxed text-slate-600">{activePath.helper}</p>
							{#if activePath.href !== '/performance'}
							<p class="text-sm leading-relaxed text-slate-600">
								Not sure where to start?
								<a href="/performance" class="font-semibold text-dci-teal underline underline-offset-4">
									Take the free Blueprint Assessment
								</a>
								and see what the patterns say.
							</p>
						{/if}
						</div>
						<a
							href={activePath.href}
							class="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-dci-teal-deep px-6 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.98]"
						>
							{activePath.cta}
							<ArrowUpRightIcon class="size-4" weight="regular" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<CheckoutDrawer bind:product={buying} />
