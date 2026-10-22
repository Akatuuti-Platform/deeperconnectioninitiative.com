<script lang="ts">
	import { enhance } from '$app/forms';
	import { CONTENT_VERSION } from '$lib/mental-models/version';
	import type { Variants } from '$lib/mental-models/variants';
	import type { ModelId, StressState } from '$lib/mental-models/types';
	import { FEEDBACK } from '$lib/mental-models/consent-copy';

	let {
		primary,
		underPressure,
		clarity,
		variants,
		pressure,
		hardest,
		fit
	}: {
		primary: ModelId;
		underPressure: ModelId | null;
		clarity: string;
		variants: Variants;
		pressure: StressState;
		hardest: string[];
		fit: 'yes' | 'partly' | 'no' | null;
	} = $props();

	let sending = $state(false);
	let done = $state(false);
	let includeState = $state(false);
	let includeHardest = $state(false);
	let delivered = $state(true);

	// Fixed, non-identifying fields. Everything personal is opt-in and off by default.
	let meta = $derived(
		JSON.stringify({ version: CONTENT_VERSION, variants, primary, secondary: underPressure, clarity, fit })
	);
</script>

<section aria-labelledby="feedback-heading" class="">
	<h3 id="feedback-heading" class="text-base font-semibold text-dci-teal-deep">{FEEDBACK.heading}</h3>
	<p class="mt-2 text-sm leading-relaxed text-slate-600">{FEEDBACK.intro}</p>

	{#if done}
		<p class="mt-4 rounded-xl bg-dci-teal/10 p-4 text-sm text-dci-teal-deep" role="status">
			Thank you. {delivered ? 'Your feedback was sent.' : 'Your feedback was received, but could not be delivered right now.'}
		</p>
	{:else}
		<form
			method="POST"
			action="/mental-models/take?/feedback"
			class="mt-4 space-y-5"
			use:enhance={() => {
				sending = true;
				return async ({ result }) => {
					sending = false;
					done = true;
					if (result.type === 'success' && result.data && 'delivered' in result.data) {
						delivered = Boolean(result.data.delivered);
					}
				};
			}}
		>
			<input autocomplete="off" name="website" tabindex="-1" aria-hidden="true" class="hidden" />
			<input type="hidden" name="meta" value={meta} />
			{#if includeState}<input type="hidden" name="state" value={pressure} />{/if}
			{#if includeHardest}<input type="hidden" name="hardest" value={hardest.join(',')} />{/if}

			<fieldset>
				<legend class="text-sm font-semibold text-slate-800">Did this sound like you?</legend>
				<div class="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
					{#each [['yes', 'Yes, a lot'], ['partly', 'Partly'], ['no', 'Not really']] as [v, l]}
						<label class="flex items-center gap-2"><input type="radio" name="recognised" value={v} class="accent-[var(--dci-burgundy)]" /> {l}</label>
					{/each}
				</div>
			</fieldset>

			<fieldset>
				<legend class="text-sm font-semibold text-slate-800">The "Does that fit your experience?" lines felt like</legend>
				<div class="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
					{#each [['invitation', 'An invitation'], ['label', 'A label'], ['unsure', 'Not sure']] as [v, l]}
						<label class="flex items-center gap-2"><input type="radio" name="feel" value={v} class="accent-[var(--dci-burgundy)]" /> {l}</label>
					{/each}
				</div>
			</fieldset>

			<div>
				<label for="fb-comment" class="text-sm font-semibold text-slate-800">Anything that felt off, unclear or missing? (optional)</label>
				<textarea
					id="fb-comment"
					name="comment"
					rows="3"
					maxlength="800"
					class="mt-2 w-full rounded-xl border border-dci-teal/20 bg-white px-3 py-2 text-sm"
				></textarea>
			</div>

			<div class="space-y-2 text-sm text-slate-700">
				<label class="flex items-start gap-2"><input type="checkbox" bind:checked={includeState} class="mt-1 accent-[var(--dci-burgundy)]" /> {FEEDBACK.includeState}</label>
				<label class="flex items-start gap-2"><input type="checkbox" bind:checked={includeHardest} class="mt-1 accent-[var(--dci-burgundy)]" /> {FEEDBACK.includeHardest}</label>
			</div>

			<button
				type="submit"
				disabled={sending}
				class="rounded-2xl bg-dci-teal-deep px-6 py-2.5 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:opacity-50"
			>
				{sending ? 'Sending...' : 'Send anonymous feedback'}
			</button>
		</form>
	{/if}
</section>
