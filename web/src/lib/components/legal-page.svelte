<script lang="ts">
	import { PageHero } from '$lib/components/sections';

	let {
		eyebrow,
		title,
		description,
		updated,
		children
	}: {
		eyebrow: string;
		title: string;
		description?: string;
		updated?: string;
		children: import('svelte').Snippet;
	} = $props();
</script>

<PageHero {eyebrow} {title} {description} />

<section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto max-w-3xl">
		{#if updated}
			<p class="mb-10 text-sm text-slate-500">Last updated: {updated}</p>
		{/if}
		<div
			class="space-y-5 text-base leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-dci-teal [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:mb-1 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-950 [&_li]:ml-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
		>
			{@render children()}
		</div>
	</div>
</section>
