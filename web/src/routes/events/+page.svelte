<script>
	import EventsCard from "@/lib/components/events-card.svelte";

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
