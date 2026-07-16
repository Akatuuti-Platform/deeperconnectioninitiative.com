<script lang="ts">
	import {
		ArrowUpRightIcon as ArrowUpRight,
		MedalIcon as Award,
		BookOpenTextIcon as BookOpenCheck,
		BuildingsIcon as Building2,
		CheckIcon as Check,
		ClipboardTextIcon as ClipboardList,
		CreditCardIcon as CreditCard,
		FileTextIcon as FileText,
		GraduationCapIcon as GraduationCap,
		HandshakeIcon as HeartHandshake,
		UsersThreeIcon as UsersRound
	} from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero } from '$lib/components/sections';
	import { coursesStructuredData } from '$lib/config/structured-data';

	const tiers = [
		{
			name: 'Foundation Level',
			subtitle: 'Community Champion Certification',
			price: 'UGX 500,000',
			duration: '2-day training',
			bestFor: 'Individuals, venue teams, volunteers',
			icon: UsersRound,
			accent: '#2A6268',
			paymentLink: paymentLinks.certifications.foundationLevelCommunityChampionCertification,
			includes: [
				'T.O.T manual in digital and print formats',
				'DCI Card Game facilitation practice',
				'Conversation Clinic setup guide',
				'Access to the low-data digital library',
				'Public Champion directory listing'
			],
			outcomes: [
				'Facilitate weekly community circles',
				'Use the toolkit with confidence',
				'Support 30-50 people per session'
			]
		},
		{
			name: 'Advanced Level',
			subtitle: 'Institutional Scale Certification',
			price: 'UGX 1,500,000',
			duration: '3-day training + follow-up',
			bestFor: 'Schools, NGOs, rehabs, corporates',
			icon: Building2,
			accent: '#6F231E',
			popular: true,
			paymentLink: paymentLinks.certifications.advancedLevelInstitutionalChampionCertification,
			includes: [
				'Everything in Foundation Level',
				'Train up to 3 Champions in one cohort',
				'Institutional customization workshop',
				'Mood tracker training for support teams',
				'Impact measurement tools and check-ins'
			],
			outcomes: [
				'Launch an internal wellness program',
				'Adapt tools for a specific population',
				'Integrate DCI with existing services'
			]
		},
		{
			name: 'Master Trainer',
			subtitle: 'Certified Trainer Certification',
			price: 'UGX 3,000,000',
			duration: '5-day intensive + practicum',
			bestFor: 'Mental health professionals, facilitators, founders',
			icon: GraduationCap,
			accent: '#2A6268',
			paymentLink: paymentLinks.certifications.masterTrainerCertification,
			includes: [
				'Everything in Advanced Level',
				'Train-the-trainer methodology',
				'Curriculum delivery certification',
				'Independent training rights',
				'Official DCI trainer listing'
			],
			outcomes: [
				'Train Champions independently',
				'Build a regional support network',
				'Deliver DCI programs with quality guardrails'
			]
		}
	];

	const processSteps = [
		{
			title: 'Apply',
			description: 'Tell us who you serve, where you work, and which certification path fits.',
			icon: ClipboardList
		},
		{
			title: 'Confirm',
			description: 'Complete payment and receive the training brief, schedule, and preparation pack.',
			icon: CreditCard
		},
		{
			title: 'Prepare',
			description: 'Review the manual, toolkit materials, and facilitation expectations before training.',
			icon: FileText
		},
		{
			title: 'Train',
			description: 'Practice trauma-aware facilitation, group setup, referral boundaries, and tool use.',
			icon: BookOpenCheck
		},
		{
			title: 'Activate',
			description: 'Launch your DCI clinic, champion circle, or institutional wellness program.',
			icon: Award
		}
	];
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${coursesStructuredData(tiers)}</script>`}
</svelte:head>

<PageHero
	eyebrow="Training of Trainers"
	eyebrowIcon={HeartHandshake}
	title="Train the people who keep care moving."
	description="DCI certifications equip community champions, institutions, and trainers to facilitate grounded mental health conversations with practical tools and clear referral boundaries."
>
	{#snippet actions()}
		<Button href="#tiers" size="lg" class="rounded-full px-7">Compare tiers</Button>
		<Button
			href="/contact"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			Talk to DCI
		</Button>
	{/snippet}
	{#snippet aside()}
		<div
			class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream shadow-dci-panel sm:p-8"
		>
			<SpotIllustration
				variant="toolkit"
				class="pointer-events-none absolute -right-16 bottom-0 hidden w-80 rotate-2 opacity-20 lg:block"
			/>
			<div class="relative z-10 grid gap-4 sm:grid-cols-3">
				<div class="rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-5">
					<p class="text-4xl font-semibold text-white">2-5</p>
					<p class="mt-2 text-sm text-dci-cream/70">training days by tier</p>
				</div>
				<div class="rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-5">
					<p class="text-4xl font-semibold text-white">3</p>
					<p class="mt-2 text-sm text-dci-cream/70">certification paths</p>
				</div>
				<div class="rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-5">
					<p class="text-4xl font-semibold text-white">10%</p>
					<p class="mt-2 text-sm text-dci-cream/70">supports donated kits</p>
				</div>
			</div>
			<div class="relative z-10 mt-6 border-t border-dci-cream/12 pt-6">
				<p class="text-sm leading-relaxed text-dci-cream/75">
					Designed for offline-first settings, youth groups, schools, clinics, recovery spaces,
					and neighborhood venues where care needs to be practical before it can be formal.
				</p>
			</div>
		</div>
	{/snippet}
</PageHero>

<section id="tiers" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div class="mb-12 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
		<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Certification tiers</p>
		<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
			Choose the training depth that matches your setting.
		</h2>
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		{#each tiers as tier, index}
			{@const Icon = tier.icon}
			<article
				use:reveal={{ delay: index * 80, y: 22 }}
				class={`dci-soft-hover relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-dci-cream p-6 shadow-dci-lift sm:p-7 ${tier.popular ? 'border-dci-burgundy/35 lg:-mt-4 lg:mb-4' : 'border-dci-teal/12'}`}
			>
				{#if tier.popular}
					<div
						class="absolute right-5 top-5 rounded-full bg-dci-burgundy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
					>
						Most requested
					</div>
				{/if}
				<div class="mb-7 flex size-12 items-center justify-center rounded-xl bg-white/65" style={`color:${tier.accent}`}>
					<Icon class="size-6" weight="duotone" />
				</div>
				<div class="space-y-4">
					<div>
						<h3 class="text-3xl font-semibold leading-tight text-slate-950">{tier.name}</h3>
						<p class="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-600">
							{tier.subtitle}
						</p>
					</div>
					<div>
						<p class="text-3xl font-bold text-dci-teal-deep">{tier.price}</p>
						<p class="mt-1 text-sm text-slate-600">{tier.duration}</p>
					</div>
					<p class="rounded-2xl border border-dci-teal/12 bg-white/45 p-4 text-sm text-slate-700">
						<span class="font-semibold text-slate-950">Best for:</span> {tier.bestFor}
					</p>
				</div>

				<div class="mt-7 grid gap-6">
					<div>
						<p class="mb-3 text-xs font-bold uppercase tracking-wide text-dci-teal">Includes</p>
						<ul class="space-y-3">
							{#each tier.includes as item}
								<li class="flex gap-3 text-sm leading-relaxed text-slate-700">
									<Check class="mt-0.5 size-4 shrink-0 text-dci-teal" weight="bold" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="mb-3 text-xs font-bold uppercase tracking-wide text-dci-burgundy">Outcomes</p>
						<ul class="space-y-3">
							{#each tier.outcomes as item}
								<li class="flex gap-3 text-sm leading-relaxed text-slate-700">
									<Check class="mt-0.5 size-4 shrink-0 text-dci-burgundy" weight="bold" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<Button href={tier.paymentLink} target="_blank" rel="noopener noreferrer" class="mt-8 rounded-full">
					Start this tier
					<ArrowUpRight class="size-4" weight="regular" />
				</Button>
			</article>
		{/each}
	</div>
</section>

<section class="bg-dci-teal-deep py-20 text-dci-cream lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">How it works</p>
			<h2 class="text-4xl font-semibold leading-tight text-white sm:text-5xl">
				A practical path from application to activation.
			</h2>
		</div>

		<div class="grid gap-px overflow-hidden rounded-[2rem] border border-dci-cream/12 bg-dci-cream/12 md:grid-cols-5">
			{#each processSteps as step, index}
				{@const Icon = step.icon}
				<div class="bg-dci-teal-deep p-6" use:reveal={{ delay: index * 70, y: 18 }}>
					<div class="mb-8 flex items-center justify-between">
						<div class="flex size-11 items-center justify-center rounded-xl bg-dci-cream/10 text-dci-cream">
							<Icon class="size-5" weight="duotone" />
						</div>
						<span class="text-sm font-semibold text-dci-cream/35">0{index + 1}</span>
					</div>
					<h3 class="text-xl font-semibold text-white">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-dci-cream/68">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div
		use:reveal={{ delay: 80, y: 18 }}
		class="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"
	>
		<div class="max-w-3xl space-y-3">
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Need help choosing?</p>
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950">
				We can help match the certification to your community context.
			</h2>
			<p class="text-base leading-relaxed text-slate-700">
				Use the contact page if you are training a team, sponsoring Champions, or adapting the model
				for a school, clinic, recovery space, or venue.
			</p>
		</div>
		<Button href="/contact" size="lg" class="rounded-full px-8">Contact DCI</Button>
	</div>
</section>
