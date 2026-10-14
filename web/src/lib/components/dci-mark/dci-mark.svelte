<script lang="ts">
	import DciRibbons from './dci-ribbons.svelte';
	import { MARK_SRC } from './paths';

	// Header lockup. Pass compact from the compact-header observer.
	let {
		compact = false,
		href = '/',
		showWord = true,
		ribbons = true
	}: { compact?: boolean; href?: string; showWord?: boolean; ribbons?: boolean } = $props();
</script>

<a href={href} class={`dci-mark${compact ? ' is-compact' : ''}`} aria-label="DCI Wellness, home">
	<span class="dci-mark__head">
		<img class="dci-mark__img" src={MARK_SRC} alt="" />
	</span>
	{#if ribbons}
		<DciRibbons />
	{/if}
	{#if showWord}
		<span class="dci-mark__words">
			<span class="dci-mark__word">DCI Wellness</span>
			<span class="dci-mark__sub">Deeper Connection Initiative</span>
		</span>
	{/if}
</a>
