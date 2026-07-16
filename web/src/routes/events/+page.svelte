<script lang="ts">
	import EventsCard from '$lib/components/events-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon as ArrowUpRight, CalendarDotsIcon as CalendarDays } from 'phosphor-svelte';
	import { PageHero } from '$lib/components/sections';
	import { eventsStructuredData } from '$lib/config/structured-data';

	const events = [
		{
			title: 'Wellness Wednesday Conversation Clinic',
			description:
				'A guided community session using DCI cards, reflection prompts, and low-pressure group conversation.',
			url: '/contact',
			startDate: '2026-07-29T17:30:00',
			endDate: '2026-07-29T19:00:00',
			location: 'Partner venue, Kampala',
			type: 'Clinic'
		},
		{
			title: 'Community Champion Orientation',
			description:
				'An introduction for volunteers, venue partners, and facilitators interested in supporting DCI clinics.',
			url: '/volunteering',
			startDate: '2026-08-07T10:00:00',
			endDate: '2026-08-07T12:00:00',
			location: 'Acacia Avenue, Kampala',
			type: 'Training'
		},
		{
			title: 'Toolkit Demo for Schools and Youth Groups',
			description:
				'A practical walkthrough of the card game, reflection journal, mood tracker, and referral workflow.',
			url: '/trainings',
			startDate: '2026-08-19T14:00:00',
			endDate: '2026-08-19T16:00:00',
			location: 'Hybrid session',
			type: 'Demo'
		}
	];

	// Split into upcoming vs past so the listing self-maintains as dates roll by.
	const now = Date.now();
	const upcoming = events
		.filter((e) => new Date(e.endDate).getTime() >= now)
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
	const past = events
		.filter((e) => new Date(e.endDate).getTime() < now)
		.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

	const gallery = Array.from({ length: 8 }, (_, i) => `/photos/events/event-${i + 1}.jpg`);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${eventsStructuredData(events)}</script>`}
</svelte:head>

<PageHero
	eyebrow="Events and clinics"
	eyebrowIcon={CalendarDays}
	title="Places to practice connection in real life."
	description="DCI events are built around practical mental wellness: conversation clinics, facilitator orientations, toolkit demos, and partner sessions."
>
	{#snippet aside()}
		<div class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream sm:p-8">
			<SpotIllustration
				variant="care"
				class="pointer-events-none absolute -right-20 bottom-0 hidden w-80 rotate-2 opacity-24 lg:block"
			/>
			<div class="relative z-10 max-w-lg">
				<p class="text-sm font-semibold uppercase tracking-wide text-dci-cream/70">
					Host a DCI session
				</p>
				<p class="mt-4 text-2xl font-semibold leading-tight text-white">
					Bring a clinic, demo, or champion orientation into your school, venue, clinic, or youth
					group.
				</p>
				<Button href="/contact" class="mt-7 rounded-full bg-dci-cream text-dci-teal-deep hover:bg-white">
					Request an event
					<ArrowUpRight class="size-4" weight="regular" />
				</Button>
			</div>
		</div>
	{/snippet}
</PageHero>

<section class="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
			Upcoming sessions
		</h2>
		{#if upcoming.length > 0}
			<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{#each upcoming as event, index}
					<div use:reveal={{ delay: index * 80, y: 20 }}>
						<EventsCard {event} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-8 text-slate-700">
				<p class="text-lg font-semibold text-slate-950">No sessions on the calendar right now.</p>
				<p class="mt-2 max-w-xl">
					New clinics and demos are added regularly. Want to host one, or hear when the next is
					scheduled? <a href="/contact" class="font-semibold text-dci-teal underline underline-offset-4">Get in touch</a>.
				</p>
			</div>
		{/if}

		{#if past.length > 0}
			<h2 class="mt-16 mb-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
				Past sessions
			</h2>
			<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{#each past as event, index}
					<div use:reveal={{ delay: index * 80, y: 20 }} class="opacity-75">
						<EventsCard {event} />
					</div>
				{/each}
			</div>
		{/if}

		<div class="mt-20" use:reveal={{ delay: 0, y: 18 }}>
			<div class="max-w-2xl space-y-3">
				<div
					class="inline-flex items-center rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
				>
					<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
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
