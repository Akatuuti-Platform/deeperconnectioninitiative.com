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

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
			<div class="space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
				>
					<HeartHandshake class="size-4 text-[#2A6268]" weight="duotone" />
					<span class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
						Training of Trainers
					</span>
				</div>
				<div class="space-y-5">
					<h1 class="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
						Train the people who keep care moving.
					</h1>
					<p class="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
						DCI certifications equip community champions, institutions, and trainers to facilitate
						grounded mental health conversations with practical tools and clear referral boundaries.
					</p>
				</div>
				<div class="flex flex-col gap-3 sm:flex-row">
					<Button href="#tiers" size="lg" class="rounded-full px-7">Compare tiers</Button>
					<Button
						href="/contact"
						size="lg"
						variant="outline"
						class="rounded-full border-[#2A6268]/25 bg-transparent px-7 text-[#1A3C40] hover:bg-[#2A6268]/7"
					>
						Talk to DCI
					</Button>
				</div>
			</div>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] bg-[#1A3C40] p-6 text-[#F6ECD9] shadow-[0_28px_90px_-65px_rgba(0,0,0,0.75)] sm:p-8"
			>
				<SpotIllustration
					variant="toolkit"
					class="pointer-events-none absolute -right-16 bottom-0 hidden w-80 rotate-2 opacity-20 lg:block"
				/>
				<div class="relative z-10 grid gap-4 sm:grid-cols-3">
					<div class="rounded-2xl border border-[#F6ECD9]/12 bg-[#F6ECD9]/6 p-5">
						<p class="text-4xl font-semibold text-white">2-5</p>
						<p class="mt-2 text-sm text-[#F6ECD9]/70">training days by tier</p>
					</div>
					<div class="rounded-2xl border border-[#F6ECD9]/12 bg-[#F6ECD9]/6 p-5">
						<p class="text-4xl font-semibold text-white">3</p>
						<p class="mt-2 text-sm text-[#F6ECD9]/70">certification paths</p>
					</div>
					<div class="rounded-2xl border border-[#F6ECD9]/12 bg-[#F6ECD9]/6 p-5">
						<p class="text-4xl font-semibold text-white">10%</p>
						<p class="mt-2 text-sm text-[#F6ECD9]/70">supports donated kits</p>
					</div>
				</div>
				<div class="relative z-10 mt-6 border-t border-[#F6ECD9]/12 pt-6">
					<p class="text-sm leading-relaxed text-[#F6ECD9]/75">
						Designed for offline-first settings, youth groups, schools, clinics, recovery spaces,
						and neighborhood venues where care needs to be practical before it can be formal.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="tiers" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div class="mb-12 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
		<p class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">Certification tiers</p>
		<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
			Choose the training depth that matches your setting.
		</h2>
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		{#each tiers as tier, index}
			{@const Icon = tier.icon}
			<article
				use:reveal={{ delay: index * 80, y: 22 }}
				class={`dci-soft-hover relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-[#F6ECD9] p-6 shadow-[0_24px_70px_-58px_rgba(0,0,0,0.72)] sm:p-7 ${tier.popular ? 'border-[#6F231E]/35 lg:-mt-4 lg:mb-4' : 'border-[#2A6268]/12'}`}
			>
				{#if tier.popular}
					<div
						class="absolute right-5 top-5 rounded-full bg-[#6F231E] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
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
						<p class="text-3xl font-bold text-[#1A3C40]">{tier.price}</p>
						<p class="mt-1 text-sm text-slate-600">{tier.duration}</p>
					</div>
					<p class="rounded-2xl border border-[#2A6268]/12 bg-white/45 p-4 text-sm text-slate-700">
						<span class="font-semibold text-slate-950">Best for:</span> {tier.bestFor}
					</p>
				</div>

				<div class="mt-7 grid gap-6">
					<div>
						<p class="mb-3 text-xs font-bold uppercase tracking-wide text-[#2A6268]">Includes</p>
						<ul class="space-y-3">
							{#each tier.includes as item}
								<li class="flex gap-3 text-sm leading-relaxed text-slate-700">
									<Check class="mt-0.5 size-4 shrink-0 text-[#2A6268]" weight="bold" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="mb-3 text-xs font-bold uppercase tracking-wide text-[#6F231E]">Outcomes</p>
						<ul class="space-y-3">
							{#each tier.outcomes as item}
								<li class="flex gap-3 text-sm leading-relaxed text-slate-700">
									<Check class="mt-0.5 size-4 shrink-0 text-[#6F231E]" weight="bold" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<Button href={tier.paymentLink} class="mt-8 rounded-full">
					Start this tier
					<ArrowUpRight class="size-4" weight="regular" />
				</Button>
			</article>
		{/each}
	</div>
</section>

<section class="bg-[#1A3C40] py-20 text-[#F6ECD9] lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
			<p class="text-xs font-semibold uppercase tracking-wide text-[#F6ECD9]/55">How it works</p>
			<h2 class="text-4xl font-semibold leading-tight text-white sm:text-5xl">
				A practical path from application to activation.
			</h2>
		</div>

		<div class="grid gap-px overflow-hidden rounded-[2rem] border border-[#F6ECD9]/12 bg-[#F6ECD9]/12 md:grid-cols-5">
			{#each processSteps as step, index}
				{@const Icon = step.icon}
				<div class="bg-[#1A3C40] p-6" use:reveal={{ delay: index * 70, y: 18 }}>
					<div class="mb-8 flex items-center justify-between">
						<div class="flex size-11 items-center justify-center rounded-xl bg-[#F6ECD9]/10 text-[#F6ECD9]">
							<Icon class="size-5" weight="duotone" />
						</div>
						<span class="text-sm font-semibold text-[#F6ECD9]/35">0{index + 1}</span>
					</div>
					<h3 class="text-xl font-semibold text-white">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#F6ECD9]/68">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div
		use:reveal={{ delay: 80, y: 18 }}
		class="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[#2A6268]/12 bg-[#F6ECD9] p-6 shadow-[0_24px_70px_-60px_rgba(0,0,0,0.75)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"
	>
		<div class="max-w-3xl space-y-3">
			<p class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">Need help choosing?</p>
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
