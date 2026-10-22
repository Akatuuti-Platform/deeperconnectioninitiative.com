<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { env as publicEnv } from '$env/dynamic/public';
	import { MODELS } from '$lib/mental-models/models';
	import { UNLOCK, UNAVAILABLE } from '$lib/mental-models/consent-copy';
	import type { ModelId } from '$lib/mental-models/types';

	// "Keep noticing": email me my full report. That works on its own. The 90-day reminder, DCI
	// updates and research contact are three separate, unticked choices.
	let {
		primary,
		underPressure,
		available,
		onunlocked
	}: { primary: ModelId; underPressure: ModelId | null; available: boolean; onunlocked: () => void } = $props();

	let followUp = $state(false);
	let updates = $state(false);
	let research = $state(false);
	let adult = $state(false);
	let sending = $state(false);
	let done = $state(false);
	let errors = $state<Record<string, string>>({});

	const siteKey = publicEnv.PUBLIC_TURNSTILE_SITE_KEY;
	let turnstileBox = $state<HTMLElement | null>(null);
	onMount(() => {
		if (!available || !siteKey || !turnstileBox) return;
		const w = window as unknown as { turnstile?: { render: (el: HTMLElement, o: object) => void } };
		const render = () => w.turnstile?.render(turnstileBox!, { sitekey: siteKey });
		if (w.turnstile) return render();
		const s = document.createElement('script');
		s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		s.async = true;
		s.onload = render;
		document.head.appendChild(s);
	});

	let modelName = $derived(MODELS[primary].name);
</script>

<div id="unlock" class="scroll-mt-24 rounded-2xl border border-dci-teal/20 bg-white p-5">
	<h3 class="text-base font-semibold text-dci-teal-deep">{UNLOCK.heading}</h3>
	{#if done}
		<p class="mt-2 rounded-xl bg-dci-teal/10 p-4 text-sm leading-relaxed text-dci-teal-deep" role="status">{UNLOCK.sent}</p>
	{:else if !available}
		<p class="mt-2 rounded-xl bg-slate-100 p-4 text-sm text-slate-700" role="status">{UNAVAILABLE}</p>
		<p class="mt-3 text-sm text-slate-700">
			You can still read the whole <a href={`/mental-models/${primary}`} target="_blank" rel="noopener" class="font-semibold text-dci-teal-deep underline underline-offset-4">{modelName} page</a>, free.
		</p>
	{:else}
		<p class="mt-1 text-sm text-slate-600">{UNLOCK.intro}</p>
		<form
			method="POST"
			action="/mental-models/take?/keepNoticing"
			class="mt-3 space-y-4"
			use:enhance={() => {
				sending = true;
				errors = {};
				return async ({ result }) => {
					sending = false;
					if (result.type === 'success') {
						done = true;
						onunlocked();
					} else if (result.type === 'failure') errors = (result.data?.keepErrors as Record<string, string>) ?? { form: 'Please try again.' };
					else errors = { form: 'Please try again.' };
				};
			}}
		>
			<input autocomplete="off" name="website" tabindex="-1" aria-hidden="true" class="hidden" />
			<input type="hidden" name="primary" value={primary} />
			<input type="hidden" name="underPressure" value={underPressure ?? ''} />
			<fieldset class="space-y-2 text-sm text-slate-800">
				<legend class="text-sm font-semibold text-slate-800">Also, only if you want (all optional)</legend>
				<label class="flex items-start gap-2"><input type="checkbox" name="followUp" bind:checked={followUp} class="mt-1 accent-[var(--dci-burgundy)]" /> {UNLOCK.choices.followUp}</label>
				<label class="flex items-start gap-2"><input type="checkbox" name="updates" bind:checked={updates} class="mt-1 accent-[var(--dci-burgundy)]" /> {UNLOCK.choices.updates}</label>
				<label class="flex items-start gap-2"><input type="checkbox" name="research" bind:checked={research} class="mt-1 accent-[var(--dci-burgundy)]" /> {UNLOCK.choices.research}</label>
			</fieldset>
			<div class="grid gap-3 sm:grid-cols-2">
				<div>
					<label for="kn-email" class="text-sm font-semibold text-slate-800">{UNLOCK.emailLabel}</label>
					<input id="kn-email" name="email" type="email" required autocomplete="email" class="mt-1 w-full rounded-xl border border-dci-teal/25 bg-white px-3 py-2 text-base" />
					{#if errors.email}<p class="mt-1 text-sm text-dci-burgundy">{errors.email}</p>{/if}
				</div>
				<div>
					<label for="kn-name" class="text-sm font-semibold text-slate-800">{UNLOCK.firstNameLabel}</label>
					<input id="kn-name" name="firstName" type="text" maxlength="40" autocomplete="given-name" class="mt-1 w-full rounded-xl border border-dci-teal/25 bg-white px-3 py-2 text-base" />
				</div>
			</div>
			<label class="flex items-start gap-2 text-sm text-slate-800"><input type="checkbox" name="adult" bind:checked={adult} class="mt-1 accent-[var(--dci-burgundy)]" /> {UNLOCK.adult}</label>
			{#if errors.adult}<p class="text-sm text-dci-burgundy">{errors.adult}</p>{/if}
			{#if siteKey}<div bind:this={turnstileBox}></div>{/if}
			<p class="text-xs leading-relaxed text-slate-600">
				{UNLOCK.notice}
				<a href="/mental-models/privacy" target="_blank" rel="noopener" class="font-semibold underline underline-offset-4">{UNLOCK.noticeLink}</a>
			</p>
			{#if errors.form}<p class="text-sm text-dci-burgundy" role="alert">{errors.form}</p>{/if}
			<button type="submit" disabled={sending || !adult} class="rounded-2xl bg-dci-teal-deep px-6 py-2.5 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
				{sending ? 'Sending...' : UNLOCK.submit}
			</button>
		</form>
	{/if}
	<p class="mt-3 text-xs leading-relaxed text-slate-600">
		{UNLOCK.under18}
		<a href={`/mental-models/${primary}`} target="_blank" rel="noopener" class="underline underline-offset-4">Read the {modelName} page</a>
	</p>
</div>
