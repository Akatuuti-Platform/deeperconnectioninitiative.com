<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		icon: Icon,
		kicker,
		title,
		description,
		accent = '#2A6268',
		class: className,
		children
	}: {
		icon?: any;
		kicker?: string;
		title: string;
		description?: string;
		accent?: string;
		class?: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<article
	class={cn(
		'dci-soft-hover flex h-full flex-col rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift sm:p-7',
		className
	)}
>
	{#if Icon}
		<div
			class="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/65"
			style={`color:${accent}`}
		>
			<Icon class="size-6" weight="duotone" aria-hidden="true" />
		</div>
	{/if}
	{#if kicker}
		<p class="mb-2 text-xs font-bold uppercase tracking-wide" style={`color:${accent}`}>{kicker}</p>
	{/if}
	<h3 class="text-2xl font-semibold leading-tight text-slate-950">{title}</h3>
	{#if description}
		<p class="mt-3 text-base leading-relaxed text-slate-700">{description}</p>
	{/if}
	{#if children}
		<div class="mt-5">
			{@render children()}
		</div>
	{/if}
</article>
