<script lang="ts">
	import { CheckIcon as Check } from 'phosphor-svelte';
	import { cn } from '$lib/utils';

	let {
		items,
		accent = '#2A6268',
		class: className
	}: {
		items: string[];
		accent?: string;
		class?: string;
	} = $props();
</script>

<ul class={cn('space-y-3', className)}>
	{#each items as item}
		<li class="flex gap-3 text-sm leading-relaxed text-slate-700">
			<Check class="mt-0.5 size-4 shrink-0" color={accent} weight="bold" aria-hidden="true" />
			<span>{item}</span>
		</li>
	{/each}
</ul>
