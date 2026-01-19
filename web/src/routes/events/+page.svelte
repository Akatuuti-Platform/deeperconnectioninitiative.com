<script>
	import EventsCard from "@/lib/components/events-card.svelte";
	const events = [
		{
			title: 'Community Garden cleanup',
			description: 'Join us for our monthly community garden cleanup. Gloves and tools provided!',
			url: '/events/1',
			startDate: '2024-03-15T09:00:00',
			endDate: '2024-03-15T12:00:00',
			location: 'Central Park Community Garden'
		},
		{
			title: 'City Council Meeting',
			description: 'Quarterly public meeting to discuss neighborhood improvements and budget allocation.',
			url: '/events/2',
			startDate: '2024-03-20T18:00:00',
			endDate: '2024-03-20T20:00:00',
			location: 'City Hall, Room 101'
		},
		{
			title: 'Spring Festival Planning',
			description: 'Help us plan the upcoming Spring Festival. We need volunteers for various committees.',
			url: '/events/3',
			startDate: '2024-03-25T17:30:00',
			endDate: '2024-03-25T19:00:00',
			location: 'Community Center Main Hall'
		}
	];
</script>

<section>
	<div class=" max-w-7xl mx-auto px-8 w-full 2xl:max-w-[100rem] py-24 lg:pt-32">
		<div class="max-w-xl">
			<span class="uppercase text-xs font-medium text-accent-700"> Community </span>

			<h1 class="text-base-900 mt-12 tracking-tigt font-display text-balance">Upcoming Events</h1>

			<p class="text-base sm:text-lg md:text-xl text-base-600 mt-4 text-balance">
				Meetings, hearings, and local gatherings you’ll want on your calendar.
			</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-12">
			{#each events as event}
				<EventsCard {event} />
			{/each}
		</div>
	</div>
</section>
