<script lang="ts">
	import { CopyIcon as Copy, CheckIcon as Check, WhatsappLogoIcon as Whatsapp } from 'phosphor-svelte';
	import { lineYouCanSend, whatsappUrl } from '$lib/mental-models/share';
	import type { ModelId } from '$lib/mental-models/types';

	let { modelId }: { modelId: ModelId } = $props();
	let message = $derived(lineYouCanSend(modelId));
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(message);
			copied = true;
			setTimeout(() => (copied = false), 2500);
		} catch {
			copied = false;
		}
	}
</script>

<section aria-labelledby="line-heading" class="rounded-2xl border border-dci-teal/15 bg-white/70 p-5">
	<h2 id="line-heading" class="text-lg font-semibold text-dci-teal-deep">A line you can send</h2>
	<p class="mt-1 text-sm text-slate-600">About your own pattern, for someone you trust. Send it only if you want to.</p>
	<p class="mt-3 rounded-xl bg-dci-teal/8 p-4 font-serif text-lg italic leading-relaxed text-slate-800">&ldquo;{message}&rdquo;</p>
	<div class="mt-3 flex flex-wrap gap-2">
		<a href={whatsappUrl(message)} target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-2xl bg-dci-teal-deep px-5 py-2.5 text-sm font-semibold text-dci-cream">
			<Whatsapp class="size-4" /> Copy to WhatsApp
		</a>
		<button type="button" onclick={copy} class="inline-flex items-center gap-2 rounded-2xl border border-dci-teal/25 px-4 py-2.5 text-sm font-semibold text-dci-teal-deep">
			{#if copied}<Check class="size-4" /> Copied{:else}<Copy class="size-4" /> Copy{/if}
		</button>
	</div>
</section>
