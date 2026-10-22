<script lang="ts">
	import { SUPPORT_LINK } from '$lib/mental-models/labels';
	let { class: className = '' }: { class?: string } = $props();
</script>

<!-- Quiet, always present, never an alarm. -->
<p class={`text-sm text-slate-600 ${className}`}>
	<a href="/support" class="font-semibold text-dci-teal-deep underline underline-offset-4">{SUPPORT_LINK}</a>
</p>
