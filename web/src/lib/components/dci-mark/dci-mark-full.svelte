<script lang="ts">
	import DciRibbons from './dci-ribbons.svelte';
	import { MARK_SRC } from './paths';

	// Large variant for The mark section. Ribbons rise from the crown.
</script>

<div class="dci-mark dci-mark--full">
	<span class="dci-mark__head">
		<img class="dci-mark__img" src={MARK_SRC} alt="The DCI mark" />
	</span>
	<DciRibbons />
</div>
