<script lang="ts">
	import { CaretDownIcon as CaretDown } from 'phosphor-svelte';
	import { MODELS } from '$lib/mental-models/models';
	import { MODEL_ICONS } from '$lib/mental-models/icons';
	import { verbFor, type Variants } from '$lib/mental-models/variants';
	import { REACTION, RESPONSE, SKILL_HEADING } from '$lib/mental-models/labels';
	import type { ModelId } from '$lib/mental-models/types';

	type Fit = 'yes' | 'partly' | 'no';

	let {
		modelId,
		variants,
		showHeader = true,
		onfit
	}: {
		modelId: ModelId;
		variants: Variants;
		showHeader?: boolean;
		/** Set on a personal result so the "Does that fit?" chips are interactive. */
		onfit?: (fit: Fit) => void;
	} = $props();

	let model = $derived(MODELS[modelId]);
	let learn = $derived(MODELS[model.learnFrom.model]);
	let Icon = $derived(MODEL_ICONS[modelId]);
	let fit = $state<Fit | null>(null);

	function choose(value: Fit) {
		fit = value;
		onfit?.(value);
	}
</script>

<article class="space-y-10">
	{#if showHeader}
		<header>
			<div class="flex items-center gap-3">
				<span class="flex size-12 items-center justify-center rounded-full bg-dci-teal/10 text-dci-teal-deep">
					<Icon class="size-6" weight="regular" />
				</span>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">
					{verbFor(modelId, model.verb, variants)}
				</p>
			</div>
			<h2 class="mt-4 font-serif text-4xl font-light text-dci-teal-deep sm:text-5xl">{model.name}</h2>
			<p class="mt-3 font-serif text-xl italic text-slate-700">&ldquo;{model.signature}&rdquo;</p>
			<p class="mt-4 text-sm text-slate-600">The question it asks: {model.question}</p>
		</header>
	{/if}

	<!-- 01 Recognise -->
	<section aria-labelledby={`${modelId}-recognise`}>
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">01 &middot; Recognise</p>
		<h3 id={`${modelId}-recognise`} class="mt-2 text-lg font-semibold text-dci-teal-deep">Your familiar first move</h3>
		<p class="mt-2 text-base leading-relaxed text-slate-800">{model.firstMove}</p>
	</section>

	<!-- 02 Understand -->
	<section aria-labelledby={`${modelId}-understand`}>
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">02 &middot; Understand your pattern</p>
		<h3 id={`${modelId}-understand`} class="sr-only">Understand your pattern</h3>
		<dl class="mt-3 space-y-5">
			<div>
				<dt class="text-sm font-semibold text-dci-teal-deep">Your strength</dt>
				<dd class="mt-1 text-base leading-relaxed text-slate-800">{model.strength}</dd>
			</div>
			<div>
				<dt class="text-sm font-semibold text-dci-teal-deep">{REACTION.label} <span class="font-normal text-slate-600">({REACTION.definition.toLowerCase().replace(/\.$/, '')})</span></dt>
				<dd class="mt-1 text-base leading-relaxed text-slate-800">{model.reaction}</dd>
			</div>
			<div>
				<dt class="text-sm font-semibold text-dci-teal-deep">When it gets too much</dt>
				<dd class="mt-1 text-base leading-relaxed text-slate-800">{model.tooMuch}</dd>
			</div>
			<div>
				<dt class="text-sm font-semibold text-dci-teal-deep">What it may be protecting</dt>
				<dd class="mt-1 text-base leading-relaxed text-slate-800">
					{model.protecting}
					{#if modelId !== 'drifter'}<span class="text-slate-600"> Does that fit your experience?</span>{/if}
				</dd>
				{#if onfit}
					<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Does that fit your experience?">
						{#each [['yes', 'Yes, that fits'], ['partly', 'Partly'], ['no', 'Not really']] as [value, label]}
							<button
								type="button"
								aria-pressed={fit === value}
								onclick={() => choose(value as Fit)}
								class={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
									fit === value
										? 'border-dci-teal-deep bg-dci-teal-deep text-dci-cream'
										: 'border-dci-teal/20 text-slate-700 hover:border-dci-teal/50'
								}`}
							>
								{label}
							</button>
						{/each}
					</div>
					<p class="mt-2 text-xs text-slate-600">Only you decide whether this fits. Nothing is recorded unless you choose to send feedback.</p>
				{/if}
			</div>
			<div>
				<dt class="text-sm font-semibold text-dci-teal-deep">Blind spot</dt>
				<dd class="mt-1 text-base leading-relaxed text-slate-800">{model.blindSpot}</dd>
			</div>
		</dl>
	</section>

	<!-- 03 Choose -->
	<section aria-labelledby={`${modelId}-choose`}>
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">03 &middot; Choose</p>
		<h3 id={`${modelId}-choose`} class="mt-2 text-lg font-semibold text-dci-teal-deep">{RESPONSE.label} <span class="text-sm font-normal text-slate-600">({RESPONSE.definition.toLowerCase().replace(/\.$/, '')})</span></h3>
		<p class="mt-2 text-base leading-relaxed text-slate-800">{model.response}</p>
		<div class="mt-4 rounded-2xl border border-dci-burgundy/20 bg-dci-burgundy/5 p-5">
			<p class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-burgundy">Your tiny step</p>
			<p class="mt-2 text-base leading-relaxed text-slate-900">{model.tinyStep}</p>
		</div>
	</section>

	<!-- 04 Explore your story: optional, closed by default -->
	<section aria-labelledby={`${modelId}-story`}>
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">04 &middot; Explore your story</p>
		<details class="group mt-3 rounded-2xl border border-dci-teal/15 bg-white/60">
			<summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-dci-teal-deep">
				<span id={`${modelId}-story`}>Optional: where this may come from</span>
				<CaretDown class="size-4 shrink-0 transition-transform group-open:rotate-180" />
			</summary>
			<div class="space-y-4 px-5 pb-5 text-base leading-relaxed text-slate-800">
				<p class="text-sm text-slate-600">One possible influence, not the cause. Skip this if it does not feel useful.</p>
				<p>
					<strong class="text-dci-teal-deep">{model.origin.stage}</strong>
					<span class="text-slate-600">
						({model.origin.ageNote}, DCI Reflection Journal, {model.origin.journalLetter} letter)
					</span>
				</p>
				<p>{model.origin.body}</p>
				<div class="rounded-xl bg-dci-teal/8 p-4">
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-teal-deep">Reflect</p>
					<p class="mt-1">{model.origin.reflect}</p>
				</div>
				{#if model.origin.youMayHaveHeard}
					<p class="text-sm text-slate-600">
						<span class="font-semibold text-slate-700">You may have heard:</span>
						{model.origin.youMayHaveHeard} These are words for a pattern, never a label for you.
					</p>
				{/if}
			</div>
		</details>
	</section>

	<!-- 05 Grow with others -->
	<section aria-labelledby={`${modelId}-grow`}>
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">05 &middot; Grow with others</p>
		<h3 id={`${modelId}-grow`} class="mt-2 text-lg font-semibold text-dci-teal-deep">{SKILL_HEADING}</h3>
		<p class="mt-2 text-base leading-relaxed text-slate-800">
			<strong class="text-dci-teal-deep">{model.learnFrom.tryVerb}:</strong>
			{model.learnFrom.tryText}
		</p>
		<p class="mt-1 text-sm text-slate-600">
			A strength of the <a href={`/mental-models/${learn.id}`} class="underline underline-offset-4">{learn.name}</a> pattern.
		</p>
		<p class="mt-4 text-sm font-semibold text-dci-teal-deep">What you bring</p>
		<p class="mt-1 text-base text-slate-800">{model.canTeach}</p>
	</section>
</article>
