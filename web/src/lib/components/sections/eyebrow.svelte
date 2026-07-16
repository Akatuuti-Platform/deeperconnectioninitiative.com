<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		label,
		icon: Icon,
		tone = 'light',
		class: className
	}: {
		label: string;
		icon?: any;
		tone?: 'light' | 'dark';
		class?: string;
	} = $props();

	const accent = $derived(tone === 'dark' ? 'text-dci-cream/70' : 'text-dci-teal');
</script>

<div
	class={cn(
		'inline-flex items-center gap-2 rounded-full border px-3 py-1',
		tone === 'dark' ? 'border-dci-cream/20 bg-dci-cream/5' : 'border-dci-teal/20 bg-dci-teal/5',
		className
	)}
>
	{#if Icon}
		<Icon class={cn('size-4', accent)} weight="duotone" aria-hidden="true" />
	{/if}
	<span class={cn('text-xs font-semibold uppercase tracking-wide', accent)}>{label}</span>
</div>
