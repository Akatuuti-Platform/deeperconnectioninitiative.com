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
    const {event:{
         title, description, url, startDate, endDate, location 
    }}:{event:EventProps}= $props()

const FmtStartDate =new Date(startDate)

const formattedTime = FmtStartDate.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
});
const monthLabel = FmtStartDate.toLocaleDateString("en-US", { month: "short" });
const dayLabel = FmtStartDate.getDate();
</script>

<article
	class="flex flex-col group h-full justify-between p-4 lg:p-8 rounded-3xl bg-accent-50 transition-colors duration-200"
>
	<p class="lg:col-span-2">
		<div class="flex items-center gap-3">
			<div
				class="flex flex-col items-center justify-center size-14 bg-white rounded-xl text-base-900 shrink-0"
			>
				<span   class="text-xs font-semibold uppercase">{monthLabel}</span>
				<span     class="text-lg sm:text-xl md:text-2xl font-medium text-base-600 font-display italicx"
					>{dayLabel}</Text
				>
			</div>
			<div class="flex flex-col">
				<span    class="text-xs text-base-600 uppercase font-medium">
					<time datetime={FmtStartDate.toISOString()}>{formattedTime}</time>
                </span>
				<span   class="text-xs text-base-600">
					{location}
                </span>
			</div>
		</div>

		<h3 class="text-base font-medium text-base-900 mt-8">
			{title}
		</h3>
		<p class="text-sm text-base-600 mt-2">
			{description}
		</p>
	</p>
	<Button
		href={url}
		title={`View event: ${title}`}
		aria-label={`View event: ${title}`}
		class={cn('w-fit mt-8', buttonVariants({ variant: 'ghost', size: 'sm' }))}
	>
		View event
	</Button>
</article>
