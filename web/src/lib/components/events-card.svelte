<script lang="ts">
	import {
		ArrowUpRightIcon as ArrowUpRight,
		CalendarDotsIcon as CalendarDays,
		MapPinIcon as MapPin
	} from 'phosphor-svelte';
	import { Button } from './ui/button';

	type EventProps = {
		url: string;
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		location: string;
		type: string;
	};

	let { event }: { event: EventProps } = $props();

	const startDate = $derived(new Date(event.startDate));
	const endDate = $derived(new Date(event.endDate));
	const monthLabel = $derived(startDate.toLocaleDateString('en-US', { month: 'short' }));
	const dayLabel = $derived(startDate.getDate());
	const timeLabel = $derived(
		`${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
	);
</script>

<article
	class="group dci-soft-hover flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-5 shadow-dci-lift transition duration-300 sm:p-6"
>
	<div>
		<div class="flex items-start justify-between gap-4">
			<div class="flex gap-3">
				<div
					class="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-dci-teal-deep text-dci-cream"
				>
					<span class="text-[0.65rem] font-bold uppercase tracking-wide">{monthLabel}</span>
					<span class="text-2xl font-semibold leading-none">{dayLabel}</span>
				</div>
				<div class="pt-1">
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-burgundy">{event.type}</p>
					<p class="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
						<CalendarDays class="size-3.5" weight="regular" />
						{timeLabel}
					</p>
				</div>
			</div>
		</div>

		<h3 class="mt-8 text-2xl font-semibold leading-tight text-slate-950">{event.title}</h3>
		<p class="mt-3 text-sm leading-relaxed text-slate-700">{event.description}</p>
		<p class="mt-5 flex items-start gap-2 text-sm font-medium text-dci-teal-deep">
			<MapPin class="mt-0.5 size-4 shrink-0" weight="regular" />
			<span>{event.location}</span>
		</p>
	</div>

	<Button
		href={event.url}
		variant="outline"
		class="mt-8 w-fit rounded-full border-dci-teal/20 bg-transparent text-dci-teal-deep hover:bg-dci-teal/7"
		title={`View event: ${event.title}`}
		aria-label={`View event: ${event.title}`}
	>
		View event
		<ArrowUpRight class="size-4" weight="regular" />
	</Button>
</article>
