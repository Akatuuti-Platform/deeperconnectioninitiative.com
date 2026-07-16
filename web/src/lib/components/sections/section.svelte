<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		id,
		tone = 'light',
		container = true,
		class: className,
		children
	}: {
		id?: string;
		tone?: 'light' | 'dark' | 'cream';
		container?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	} = $props();
</script>

<section
	{id}
	class={cn(
		'px-4 py-16 sm:px-6 lg:px-8 lg:py-24',
		tone === 'dark' && 'bg-dci-teal-deep text-dci-cream',
		tone === 'cream' && 'bg-dci-cream/40',
		className
	)}
>
	{#if container}
		<div class="mx-auto max-w-7xl">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</section>
