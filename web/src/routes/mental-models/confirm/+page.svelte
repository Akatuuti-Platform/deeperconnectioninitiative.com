<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	let { form } = $props();
	let token = $derived(page.url.searchParams.get('token') ?? '');
	let busy = $state(false);

	const messages: Record<string, { title: string; body: string }> = {
		confirmed: { title: 'You are all set', body: 'Your reminders are confirmed. A short welcome email is on its way. Every email has a link to stop and delete your details.' },
		already: { title: 'Already confirmed', body: 'This was confirmed before. There is nothing more to do.' },
		expired: { title: 'This link has expired', body: 'Confirmation links work for 7 days, and only the newest one works. You can ask again from the scorecard result page.' },
		missing: { title: 'Nothing to confirm', body: 'We could not find this request. It may have expired, or been stopped.' },
		invalid: { title: 'This link is not valid', body: 'Please use the most recent link in your email.' },
		unavailable: { title: 'Please try again shortly', body: 'We could not reach our service just now. Your link still works.' }
	};
	let outcome = $derived(form?.status ? messages[form.status] ?? messages.invalid : null);
</script>

<section class="px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
	<div class="mx-auto max-w-xl">
		{#if outcome}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">{outcome.title}</h1>
			<p class="mt-4 text-base leading-relaxed text-slate-700" role="status">{outcome.body}</p>
			<a href="/mental-models" class="mt-8 inline-block text-sm font-semibold text-dci-teal-deep underline underline-offset-4">Back to the scorecard</a>
		{:else if token}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">Confirm your reminders</h1>
			<p class="mt-4 text-base leading-relaxed text-slate-700">Press the button to confirm you asked DCI Wellness for these reminders. If it was not you, just close this page and we will delete the request within 7 days.</p>
			<form method="POST" class="mt-8" use:enhance={() => { busy = true; return async ({ update }) => { await update(); busy = false; }; }}>
				<input type="hidden" name="token" value={token} />
				<button disabled={busy} class="rounded-2xl bg-dci-burgundy px-8 py-3 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:opacity-50">
					{busy ? 'Confirming...' : 'Yes, confirm my reminders'}
				</button>
			</form>
		{:else}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">{messages.invalid.title}</h1>
			<p class="mt-4 text-base text-slate-700">{messages.invalid.body}</p>
		{/if}
	</div>
</section>
