<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from 'phosphor-svelte';
	import DraftBadge from '$lib/components/mental-models/draft-badge.svelte';
	import HelpLine from '$lib/components/mental-models/help-line.svelte';
	import ModelView from '$lib/components/mental-models/model-view.svelte';
	import { MODELS, MODEL_LIST } from '$lib/mental-models/models';
	import { parseVariants } from '$lib/mental-models/variants';
	import { DRAFT_NOTE } from '$lib/mental-models/version';

	let { data } = $props();
	let model = $derived(MODELS[data.modelId]);
	let variants = $derived(parseVariants(page.url.searchParams));
</script>

<section class="px-4 pb-12 pt-28 sm:px-6 lg:pt-36">
	<div class="mx-auto max-w-3xl">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<a href="/mental-models" class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-dci-teal-deep"><ArrowLeft class="size-4" /> All ten Models</a>
			<DraftBadge />
		</div>

		<div class="mt-8">
			<ModelView modelId={data.modelId} {variants} />
		</div>

		<div class="mt-12 rounded-2xl border border-dci-burgundy/20 bg-dci-burgundy/5 p-6">
			<h2 class="text-xl font-semibold text-dci-teal-deep">Which patterns sound like you?</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">You may recognise more than one. The scorecard takes about 4 minutes and your result stays private.</p>
			<a href="/mental-models/take" class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-dci-burgundy px-6 py-3 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90">
				Start the scorecard <ArrowRight class="size-4" />
			</a>
		</div>

		<nav class="mt-10" aria-label="Other Models">
			<p class="text-sm font-semibold text-dci-teal-deep">Other Models</p>
			<ul class="mt-3 flex flex-wrap gap-2">
				{#each MODEL_LIST.filter((m) => m.id !== model.id) as m (m.id)}
					<li><a href={`/mental-models/${m.id}`} class="inline-block rounded-full border border-dci-teal/20 px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:border-dci-teal/50">{m.name}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="mt-10 space-y-3">
			<HelpLine />
			<p class="text-xs leading-relaxed text-slate-600">{DRAFT_NOTE}</p>
		</div>
	</div>
</section>
