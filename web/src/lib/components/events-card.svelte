<script lang="ts">
	import { cn } from "../utils";
	import Button, { buttonVariants } from "./ui/button/button.svelte";

    // Foundations
type EventProps = {
  url: string,
  title: string,
  description:string,
  startDate:string,
  endDate: string,
  location: string,
};
    let { event }: { event: EventProps } = $props();

    let FmtStartDate = $derived(new Date(event.startDate));
    
    let formattedTime = $derived(FmtStartDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }));
    let monthLabel = $derived(FmtStartDate.toLocaleDateString("en-US", { month: "short" }));
    let dayLabel = $derived(FmtStartDate.getDate());
</script>

<article
	class="flex flex-col group h-full justify-between p-4 lg:p-8 rounded-3xl bg-accent-50 transition-colors duration-200"
>
	<div class="lg:col-span-2">
		<div class="flex items-center gap-3">
			<div
				class="flex flex-col items-center justify-center size-14 bg-white rounded-xl text-base-900 shrink-0"
			>
				<span class="text-xs font-semibold uppercase">{monthLabel}</span>
				<span class="text-lg sm:text-xl md:text-2xl font-medium text-base-600 font-display italicx"
					>{dayLabel}</span
				>
			</div>
			<div class="flex flex-col">
				<span class="text-xs text-base-600 uppercase font-medium">
					<time datetime={FmtStartDate.toISOString()}>{formattedTime}</time>
				</span>
				<span class="text-xs text-base-600">
					{event.location}
				</span>
			</div>
		</div>

		<h3 class="text-base font-medium text-base-900 mt-8">
			{event.title}
		</h3>
		<p class="text-sm text-base-600 mt-2">
			{event.description}
		</p>
	</div>
	<Button
		href={event.url}
		title={`View event: ${event.title}`}
		aria-label={`View event: ${event.title}`}
		class={cn('w-fit mt-8', buttonVariants({ variant: 'ghost', size: 'sm' }))}
	>
		View event
	</Button>
</article>
