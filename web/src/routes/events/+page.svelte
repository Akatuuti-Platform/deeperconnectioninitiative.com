<script lang="ts">
	import EventsCard from '$lib/components/events-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon as ArrowUpRight, CalendarDotsIcon as CalendarDays } from 'phosphor-svelte';

	const events = [
		{
			title: 'Wellness Wednesday Conversation Clinic',
			description:
				'A guided community session using DCI cards, reflection prompts, and low-pressure group conversation.',
			url: '/contact',
			startDate: '2026-06-03T17:30:00',
			endDate: '2026-06-03T19:00:00',
			location: 'Partner venue, Kampala',
			type: 'Clinic'
		},
		{
			title: 'Community Champion Orientation',
			description:
				'An introduction for volunteers, venue partners, and facilitators interested in supporting DCI clinics.',
			url: '/volunteering',
			startDate: '2026-06-12T10:00:00',
			endDate: '2026-06-12T12:00:00',
			location: 'Acacia Avenue, Kampala',
			type: 'Training'
		},
		{
			title: 'Toolkit Demo for Schools and Youth Groups',
			description:
				'A practical walkthrough of the card game, reflection journal, mood tracker, and referral workflow.',
			url: '/trainings',
			startDate: '2026-06-20T14:00:00',
			endDate: '2026-06-20T16:00:00',
			location: 'Hybrid session',
			type: 'Demo'
		}
	];

	const gallery = Array.from({ length: 8 }, (_, i) => `/photos/events/event-${i + 1}.jpg`);
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
			<div class="max-w-3xl space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
				>
					<CalendarDays class="size-4 text-[#2A6268]" weight="duotone" />
					<span class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
						Events and clinics
					</span>
				</div>
				<div class="space-y-5">
					<h1 class="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
						Places to practice connection in real life.
					</h1>
					<p class="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
						DCI events are built around practical mental wellness: conversation clinics,
						facilitator orientations, toolkit demos, and partner sessions.
					</p>
				</div>
			</div>
			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] bg-[#1A3C40] p-6 text-[#F6ECD9] sm:p-8"
			>
				<SpotIllustration
					variant="care"
					class="pointer-events-none absolute -right-20 bottom-0 hidden w-80 rotate-2 opacity-24 lg:block"
				/>
				<div class="relative z-10 max-w-lg">
					<p class="text-sm font-semibold uppercase tracking-wide text-[#F6ECD9]/55">
						Host a DCI session
					</p>
					<p class="mt-4 text-2xl font-semibold leading-tight text-white">
						Bring a clinic, demo, or champion orientation into your school, venue, clinic, or youth
						group.
					</p>
					<Button href="/contact" class="mt-7 rounded-full bg-[#F6ECD9] text-[#1A3C40] hover:bg-white">
						Request an event
						<ArrowUpRight class="size-4" weight="regular" />
					</Button>
				</div>
			</div>
		</div>

		<div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each events as event, index}
				<div use:reveal={{ delay: index * 80, y: 20 }}>
					<EventsCard {event} />
				</div>
			{/each}
		</div>

		<div class="mt-20" use:reveal={{ delay: 0, y: 18 }}>
			<div class="max-w-2xl space-y-3">
				<div
					class="inline-flex items-center rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
				>
					<span class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
						From the field
					</span>
				</div>
				<h2 class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
					Moments from recent clinics and gatherings
				</h2>
				<p class="text-base leading-relaxed text-slate-700">
					Real sessions, real conversations. This is what connection looks like when a community
					holds space for itself.
				</p>
			</div>

			<div class="mt-8 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
				{#each gallery as src, index}
					<img
						{src}
						alt={`DCI community moment ${index + 1}`}
						loading="lazy"
						class="w-full break-inside-avoid rounded-2xl object-cover shadow-[0_20px_60px_-50px_rgba(0,0,0,0.7)]"
					/>
				{/each}
			</div>
		</div>
	</div>
</section>
