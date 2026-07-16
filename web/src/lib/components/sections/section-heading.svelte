<script lang="ts">
	import { cn } from '$lib/utils';
	import { reveal } from '$lib/actions/reveal';

	let {
		eyebrow,
		title,
		description,
		tone = 'light',
		align = 'left',
		class: className
	}: {
		eyebrow?: string;
		title: string;
		description?: string;
		tone?: 'light' | 'dark';
		align?: 'left' | 'center';
		class?: string;
	} = $props();
</script>

<div
	use:reveal={{ delay: 0, y: 18 }}
	class={cn('max-w-3xl space-y-3', align === 'center' && 'mx-auto text-center', className)}
>
	{#if eyebrow}
		<p
			class={cn(
				'text-xs font-semibold uppercase tracking-wide',
				tone === 'dark' ? 'text-dci-cream/70' : 'text-dci-teal'
			)}
		>
			{eyebrow}
		</p>
	{/if}
	<h2
		class={cn(
			'text-4xl font-semibold leading-tight tracking-tight sm:text-5xl',
			tone === 'dark' ? 'text-white' : 'text-slate-950'
		)}
	>
		{title}
	</h2>
	{#if description}
		<p
			class={cn(
				'text-base leading-relaxed',
				tone === 'dark' ? 'text-dci-cream/75' : 'text-slate-700'
			)}
		>
			{description}
		</p>
	{/if}
</div>
