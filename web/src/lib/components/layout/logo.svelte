<script lang="ts" module>
	import { cn } from '@/lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	export type LogoProps = {
		class?: HTMLAttributes<HTMLElement>['class'];
		isLink?: boolean;
	};
</script>

<script lang="ts">
	let { class: className, isLink = false }: LogoProps = $props();
</script>

{#snippet mark()}
	<span class={cn('inline-flex items-center gap-2.5', className)}>
		<img src="/photos/dci-logo-mark.png" alt="DCI Wellness" class="h-9 w-auto shrink-0" />
		<span class="flex flex-col leading-none">
			<span class="text-lg font-bold uppercase tracking-tight text-dci-teal-deep">DCI</span>
			<span class="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-dci-burgundy">
				Wellness
			</span>
		</span>
	</span>
{/snippet}

{#if isLink}
	<a href="/" class="inline-flex" aria-label="DCI Wellness home">
		{@render mark()}
	</a>
{:else}
	{@render mark()}
{/if}
