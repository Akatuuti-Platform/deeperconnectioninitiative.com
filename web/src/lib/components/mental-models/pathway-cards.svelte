<script lang="ts">
	import { ArrowRightIcon as ArrowRight } from 'phosphor-svelte';
	import type { OrderedPathway } from '$lib/mental-models/pathways';

	let { pathways }: { pathways: OrderedPathway[] } = $props();
</script>

<ol class="space-y-3">
	{#each pathways as p, i (p.kind)}
		<li>
			<a
				href={p.href}
				class="group flex items-start gap-4 rounded-2xl border border-dci-teal/15 bg-white/70 p-4 transition-colors hover:border-dci-burgundy/40 sm:p-5"
			>
				<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-dci-teal/10 text-sm font-semibold text-dci-teal-deep">{i + 1}</span>
				<span class="min-w-0 flex-1">
					<span class="block text-xs font-semibold uppercase tracking-[0.18em] text-dci-burgundy">{p.kindLabel}</span>
					<span class="mt-0.5 block text-base font-semibold text-dci-teal-deep">{p.label}</span>
					<span class="mt-1 block text-sm leading-relaxed text-slate-600">{p.why}</span>
				</span>
				<ArrowRight class="mt-1 size-5 shrink-0 text-dci-burgundy transition-transform group-hover:translate-x-0.5" />
			</a>
		</li>
	{/each}
</ol>
