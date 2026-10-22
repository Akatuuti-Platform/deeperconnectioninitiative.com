<script lang="ts">
	import { ShareNetworkIcon as ShareNetwork, CopyIcon as Copy, CheckIcon as Check, WhatsappLogoIcon as Whatsapp } from 'phosphor-svelte';
	import { MODELS } from '$lib/mental-models/models';
	import { buildShareText, whatsappUrl } from '$lib/mental-models/share';
	import { track } from '$lib/mental-models/track';
	import type { ModelId } from '$lib/mental-models/types';

	let { primary, underPressure }: { primary: ModelId; underPressure: ModelId | null } = $props();

	// Default: the Go-to Model only. Adding the Under-pressure Model is the person's choice.
	let includeUnder = $state(false);
	let showFallback = $state(false);
	let copied = $state(false);

	const url = () => `${location.origin}/mental-models`;
	const text = () => buildShareText(primary, underPressure, includeUnder, url());

	async function share() {
		track('share_clicked');
		if (navigator.share) {
			try {
				await navigator.share({ text: text() });
				return;
			} catch {
				// Closed the share sheet, or sharing failed: offer the other ways.
			}
		}
		showFallback = true;
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(text());
			copied = true;
			setTimeout(() => (copied = false), 2500);
		} catch {
			copied = false;
		}
	}
</script>

<div class="space-y-3">
	{#if underPressure}
		<label class="flex items-center gap-2 text-sm text-slate-700">
			<input type="checkbox" bind:checked={includeUnder} class="accent-[var(--dci-burgundy)]" />
			Include my under-pressure Model ({MODELS[underPressure].name})
		</label>
	{/if}
	<div class="flex flex-wrap gap-2">
		<button type="button" onclick={share} class="inline-flex items-center gap-2 rounded-2xl bg-dci-burgundy px-5 py-2.5 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90">
			<ShareNetwork class="size-4" /> Share
		</button>
		{#if showFallback}
			<button type="button" onclick={copyLink} class="inline-flex items-center gap-2 rounded-2xl border border-dci-teal/25 px-4 py-2.5 text-sm font-semibold text-dci-teal-deep">
				{#if copied}<Check class="size-4" /> Copied{:else}<Copy class="size-4" /> Copy link{/if}
			</button>
			<a href={whatsappUrl(text())} target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-2xl border border-dci-teal/25 px-4 py-2.5 text-sm font-semibold text-dci-teal-deep">
				<Whatsapp class="size-4" /> WhatsApp
			</a>
		{/if}
	</div>
	<p class="text-xs text-slate-600">Shares: "{text().replace(/ https?:\/\/\S+$/, '')}" and a link to the scorecard. Nothing else.</p>
</div>
