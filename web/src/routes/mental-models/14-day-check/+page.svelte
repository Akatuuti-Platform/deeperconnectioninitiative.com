<script lang="ts">
	import { onMount } from 'svelte';
	import { PrinterIcon as Printer } from 'phosphor-svelte';
	import { track } from '$lib/mental-models/track';

	onMount(() => track('printable_opened'));

	const key = [
		{ colour: '#5B8C5A', name: 'Good' },
		{ colour: '#7FB3B5', name: 'Steady' },
		{ colour: '#E2B451', name: 'Strained' },
		{ colour: '#8C8FB8', name: 'Low' },
		{ colour: '#B5483F', name: 'Overwhelmed' }
	];
</script>

<section class="check px-4 pb-16 pt-28 sm:px-6 lg:pt-36 print:p-0">
	<div class="mx-auto max-w-3xl">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">DCI Mental Models &middot; free</p>
		<h1 class="mt-3 font-serif text-4xl font-light text-dci-teal-deep print:text-3xl">My 14-day check</h1>
		<p class="mt-3 text-base leading-relaxed text-slate-700">
			Once a day, give the day one colour. Add a word if you like. After two weeks, look back: which colours came up most, and what helped? This is for noticing, not for scoring.
		</p>
		<button
			type="button"
			onclick={() => window.print()}
			class="mt-5 inline-flex items-center gap-2 rounded-2xl bg-dci-burgundy px-6 py-3 text-sm font-semibold text-dci-cream print:hidden"
		>
			<Printer class="size-4" /> Print this page
		</button>

		<div class="mt-8 flex flex-wrap gap-3" aria-label="Colour key">
			{#each key as k (k.name)}
				<span class="inline-flex items-center gap-2 text-sm text-slate-800">
					<span class="inline-block size-4 rounded-full border border-black/10" style={`background:${k.colour}`}></span>{k.name}
				</span>
			{/each}
			<span class="text-sm text-slate-600">Or use your own colours.</span>
		</div>

		<table class="mt-6 w-full border-collapse text-sm">
			<thead>
				<tr class="text-left text-slate-600">
					<th class="w-14 border-b border-dci-teal/20 py-2 font-semibold">Day</th>
					<th class="w-24 border-b border-dci-teal/20 py-2 font-semibold">Colour</th>
					<th class="border-b border-dci-teal/20 py-2 font-semibold">One word</th>
					<th class="border-b border-dci-teal/20 py-2 font-semibold">What helped?</th>
				</tr>
			</thead>
			<tbody>
				{#each Array.from({ length: 14 }, (_, i) => i + 1) as day (day)}
					<tr>
						<td class="border-b border-dci-teal/10 py-3 font-semibold text-dci-teal-deep">{day}</td>
						<td class="border-b border-dci-teal/10 py-3"><span class="inline-block size-6 rounded-full border-2 border-dashed border-dci-teal/30"></span></td>
						<td class="border-b border-dci-teal/10 py-3"></td>
						<td class="border-b border-dci-teal/10 py-3"></td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="mt-8 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
			<div class="rounded-2xl border border-dci-teal/20 p-4">
				<p class="text-sm font-semibold text-dci-teal-deep">My tiny step</p>
				<p class="mt-1 text-xs text-slate-600">Copy it from your scorecard result.</p>
				<div class="mt-6 border-b border-dci-teal/20"></div>
				<div class="mt-6 border-b border-dci-teal/20"></div>
			</div>
			<div class="rounded-2xl border border-dci-teal/20 p-4">
				<p class="text-sm font-semibold text-dci-teal-deep">After 14 days</p>
				<p class="mt-1 text-sm text-slate-700">Which colour came up most? What surprised me? Who could I tell?</p>
				<div class="mt-6 border-b border-dci-teal/20"></div>
			</div>
		</div>

		<p class="mt-8 text-sm leading-relaxed text-slate-700">
			If several days in a row feel overwhelming, that is a good moment to tell someone you trust. This check cannot tell you what will happen; it only helps you notice.
			Support options: <span class="font-semibold">deeperconnectioninitiative.com/support</span>
		</p>
		<p class="mt-2 text-xs text-slate-600">DCI Wellness (Deeper Connection Initiative). Nothing you write here is sent to us.</p>
	</div>
</section>

<style>
	@media print {
		:global(header),
		:global(footer),
		:global(nav),
		:global(.noise-overlay) {
			display: none !important;
		}
		.check {
			color: #000;
		}
	}
</style>
