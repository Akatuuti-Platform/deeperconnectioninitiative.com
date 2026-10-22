<script lang="ts">
	import { DRAFT_LABEL } from '$lib/mental-models/version';
	let { class: className = '' }: { class?: string } = $props();
</script>

<span
	class={`inline-flex items-center gap-1.5 rounded-full border border-dci-burgundy/25 bg-dci-burgundy/5 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-dci-burgundy ${className}`}
	title="A pilot prototype, still being tested with young people"
>
	<span class="size-1.5 rounded-full bg-dci-burgundy"></span>
	{DRAFT_LABEL} &middot; pilot
</span>
