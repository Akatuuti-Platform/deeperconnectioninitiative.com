<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Eyebrow from './eyebrow.svelte';

	let {
		eyebrow,
		eyebrowIcon,
		title,
		description,
		actions,
		aside
	}: {
		eyebrow?: string;
		eyebrowIcon?: any;
		title: string;
		description?: string;
		actions?: import('svelte').Snippet;
		aside?: import('svelte').Snippet;
	} = $props();
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class={aside ? 'grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end' : ''}>
			<div class="space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				{#if eyebrow}
					<Eyebrow label={eyebrow} icon={eyebrowIcon} />
				{/if}
				<div class="space-y-5">
					<h1
						class="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
					>
						{title}
					</h1>
					{#if description}
						<p class="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
							{description}
						</p>
					{/if}
				</div>
				{#if actions}
					<div class="flex flex-col gap-3 sm:flex-row">
						{@render actions()}
					</div>
				{/if}
			</div>

			{#if aside}
				<div use:reveal={{ delay: 120, y: 18 }}>
					{@render aside()}
				</div>
			{/if}
		</div>
	</div>
</section>
