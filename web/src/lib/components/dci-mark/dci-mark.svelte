<script lang="ts">
	import DciRibbons from './dci-ribbons.svelte';
	import { MARK_SRC } from './paths';

	// Header lockup. Pass compact from the compact-header observer.
	let {
		compact = false,
		href = '/',
		showWord = true
	}: { compact?: boolean; href?: string; showWord?: boolean } = $props();
</script>

<a href={href} class={`dci-mark${compact ? ' is-compact' : ''}`} aria-label="DCI Wellness, home">
	<span class="dci-mark__head">
		<img class="dci-mark__img" src={MARK_SRC} alt="" />
	</span>
	<DciRibbons />
	{#if showWord}
		<span class="dci-mark__word">DCI Wellness</span>
	{/if}
</a>
