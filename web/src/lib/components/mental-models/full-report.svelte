<script lang="ts">
	import { LockSimpleIcon as Lock } from 'phosphor-svelte';
	import { MODELS } from '$lib/mental-models/models';
	import { orderedPathways } from '$lib/mental-models/pathways';
	import { COMPATIBLE_HEADING, REACTION, RESPONSE } from '$lib/mental-models/labels';
	import type { ModelId, StressState } from '$lib/mental-models/types';

	type Fit = 'yes' | 'partly' | 'no';

	let {
		primary,
		underPressure,
		unlocked,
		pressure,
		onfit
	}: { primary: ModelId; underPressure: ModelId | null; unlocked: boolean; pressure: StressState; onfit: (f: Fit) => void } = $props();

	let m = $derived(MODELS[primary]);
	let u = $derived(underPressure ? MODELS[underPressure] : null);
	let skillFrom = $derived(MODELS[m.learnFrom.model]);
	let steps = $derived(orderedPathways(primary, pressure).filter((p) => p.kind !== 'support'));
	let fit = $state<Fit | null>(null);

	interface Section {
		id: string;
		heading: string;
		text: string;
	}

	let sections = $derived<Section[]>([
		{ id: 'strength', heading: 'Your strength', text: m.strength },
		{ id: 'too-much', heading: 'When it gets too much', text: m.tooMuch },
		{ id: 'protecting', heading: 'What it may be protecting', text: m.protecting },
		...(u
			? [
					{
						id: 'under',
						heading: `Under pressure: ${u.name}`,
						text: `When your go-to stops working, you may land here. ${REACTION.label}: ${u.reaction} ${RESPONSE.label}: ${u.response} Blind spot: ${u.blindSpot}`
					}
				]
			: []),
		{
			id: 'story',
			heading: 'Explore your story (optional)',
			text: `One possible influence, not the cause. ${m.origin.stage} (${m.origin.ageNote}, DCI Reflection Journal, ${m.origin.journalLetter} letter). ${m.origin.body} Reflect: ${m.origin.reflect}`
		},
		{ id: 'skill', heading: `${COMPATIBLE_HEADING} ${skillFrom.name}`, text: `Why: ${m.learnFrom.why} ${m.learnFrom.tryVerb}: ${m.learnFrom.tryText} What you bring: ${m.canTeach}` },
		{ id: 'next', heading: 'Next steps for this pattern', text: steps.map((s) => `${s.label}. ${s.why}`).join(' ') }
	]);

	/** The first sentence, which stays readable before unlocking. */
	function firstLine(text: string): [string, string] {
		const match = text.match(/^(.+?[.?!])(\s|$)/);
		if (!match) return [text, ''];
		return [match[1], text.slice(match[1].length).trim()];
	}

	function choose(value: Fit) {
		fit = value;
		onfit(value);
	}
</script>

<section aria-labelledby="full-report" class="space-y-5">
	<div class="flex items-center gap-2">
		<h2 id="full-report" class="text-2xl font-semibold text-dci-teal-deep">Your full report</h2>
		{#if !unlocked}<Lock class="size-5 text-slate-500" aria-label="Locked" />{/if}
	</div>

	{#each sections as s (s.id)}
		{@const [first, rest] = firstLine(s.text)}
		<div>
			<h3 class="text-base font-semibold text-dci-teal-deep">{s.heading}</h3>
			{#if unlocked}
				<p class="mt-1 text-base leading-relaxed text-slate-800">{s.text}</p>
				{#if s.id === 'next'}
					<ul class="mt-2 space-y-1 text-sm">
						{#each steps as step (step.kind)}
							<li><a href={step.href} target="_blank" rel="noopener" class="font-semibold text-dci-teal-deep underline underline-offset-4">{step.label}</a></li>
						{/each}
					</ul>
				{/if}
				{#if s.id === 'protecting' && primary !== 'drifter'}
					<p class="mt-1 text-sm text-slate-600">Does that fit your experience?</p>
					<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Does that fit your experience?">
						{#each [['yes', 'Yes, that fits'], ['partly', 'Partly'], ['no', 'Not really']] as [value, label]}
							<button type="button" aria-pressed={fit === value} onclick={() => choose(value as Fit)} class={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${fit === value ? 'border-dci-teal-deep bg-dci-teal-deep text-dci-cream' : 'border-dci-teal/20 text-slate-700'}`}>{label}</button>
						{/each}
					</div>
				{/if}
			{:else}
				<p class="mt-1 text-base leading-relaxed text-slate-800">{first}</p>
				{#if rest}
					<p class="fade-out mt-1 text-base leading-relaxed text-slate-800" aria-hidden="true">{rest.slice(0, 90)}</p>
				{/if}
			{/if}
		</div>
	{/each}
</section>

<style>
	.fade-out {
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
		mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
		max-height: 3em;
		overflow: hidden;
		user-select: none;
	}
</style>
