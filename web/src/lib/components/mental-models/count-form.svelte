<script lang="ts">
	import { enhance } from '$app/forms';
	import { COUNT, UNAVAILABLE } from '$lib/mental-models/consent-copy';
	import type { ModelId, StressState } from '$lib/mental-models/types';

	let {
		primary,
		underPressure,
		clarity,
		pressure,
		available
	}: { primary: ModelId; underPressure: ModelId | null; clarity: string; pressure: StressState; available: boolean } = $props();

	let sending = $state(false);
	let done = $state(false);
	let error = $state('');
</script>

<div>
	<h3 class="text-base font-semibold text-dci-teal-deep">{COUNT.heading}</h3>
	<p class="mt-1 text-sm leading-relaxed text-slate-600">{COUNT.body}</p>
	{#if !available}
		<p class="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-700" role="status">{UNAVAILABLE}</p>
	{:else if done}
		<p class="mt-3 rounded-xl bg-dci-teal/10 p-3 text-sm text-dci-teal-deep" role="status">{COUNT.done}</p>
	{:else}
		<form
			method="POST"
			action="/mental-models/take?/contribute"
			class="mt-3 space-y-3"
			use:enhance={() => {
				sending = true;
				error = '';
				return async ({ result }) => {
					sending = false;
					if (result.type === 'success') done = true;
					else error = (result.type === 'failure' && (result.data?.contributeError as string)) || 'Please try again.';
				};
			}}
		>
			<input autocomplete="off" name="website" tabindex="-1" aria-hidden="true" class="hidden" />
			<input type="hidden" name="primary" value={primary} />
			<input type="hidden" name="secondary" value={underPressure ?? ''} />
			<input type="hidden" name="clarity" value={clarity} />
			<input type="hidden" name="state" value={pressure} />
			<div class="grid gap-3 sm:grid-cols-2">
				<div>
					<label for="ct-age" class="text-sm font-semibold text-slate-800">Age (optional)</label>
					<select id="ct-age" name="ageBand" class="mt-1 w-full rounded-xl border border-dci-teal/25 bg-white px-3 py-2 text-base">
						<option value="">Prefer not to say</option>
						<option value="under18">Under 18</option>
						<option value="18to24">18 to 24</option>
						<option value="25to34">25 to 34</option>
						<option value="35plus">35 or older</option>
					</select>
				</div>
				<div>
					<label for="ct-region" class="text-sm font-semibold text-slate-800">Where you live (optional)</label>
					<select id="ct-region" name="region" class="mt-1 w-full rounded-xl border border-dci-teal/25 bg-white px-3 py-2 text-base">
						<option value="">Prefer not to say</option>
						<option value="uganda">Uganda</option>
						<option value="eastAfrica">Elsewhere in East Africa</option>
						<option value="elsewhere">Somewhere else</option>
					</select>
				</div>
			</div>
			{#if pressure !== 'unsaid'}
				<label class="flex items-start gap-2 text-sm text-slate-800"><input type="checkbox" name="includeState" class="mt-1 accent-[var(--dci-burgundy)]" /> {COUNT.includeState}</label>
			{/if}
			{#if error}<p class="text-sm text-dci-burgundy" role="alert">{error}</p>{/if}
			<button type="submit" disabled={sending} class="rounded-2xl border border-dci-teal/30 px-6 py-2.5 text-sm font-semibold text-dci-teal-deep disabled:opacity-50">
				{sending ? 'Counting...' : COUNT.submit}
			</button>
		</form>
	{/if}
</div>
