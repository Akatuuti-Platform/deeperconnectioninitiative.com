<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let {
		eyebrow,
		title,
		description,
		actions
	}: {
		eyebrow?: string;
		title: string;
		description?: string;
		actions?: import('svelte').Snippet;
	} = $props();
</script>

<section class="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div
		use:reveal={{ delay: 80, y: 18 }}
		class="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"
	>
		<div class="max-w-3xl space-y-3">
			{#if eyebrow}
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">{eyebrow}</p>
			{/if}
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950">{title}</h2>
			{#if description}
				<p class="text-base leading-relaxed text-slate-700">{description}</p>
			{/if}
		</div>
		{#if actions}
			<div class="flex flex-col gap-3 sm:flex-row">
				{@render actions()}
			</div>
		{/if}
	</div>
</section>
