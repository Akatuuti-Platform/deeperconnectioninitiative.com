<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	let { form } = $props();
	let token = $derived(page.url.searchParams.get('token') ?? '');
	let busy = $state(false);
	let done = $derived(form?.status === 'withdrawn' || form?.status === 'missing');
</script>

<section class="px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
	<div class="mx-auto max-w-xl">
		{#if done}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">Done</h1>
			<p class="mt-4 text-base leading-relaxed text-slate-700" role="status">
				Your details are deleted and you will not hear from us again. We keep only a scrambled marker of your address, so it is never added back by mistake.
			</p>
		{:else if form?.status === 'unavailable'}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">Please try again shortly</h1>
			<p class="mt-4 text-base text-slate-700">We could not reach our service just now. Your link still works.</p>
		{:else if token && form?.status !== 'invalid'}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">Stop emails and delete my details</h1>
			<p class="mt-4 text-base leading-relaxed text-slate-700">This stops every reminder and deletes your email address and anything you asked us to remember. It cannot be undone, but you can sign up again from the scorecard any time.</p>
			<form method="POST" class="mt-8" use:enhance={() => { busy = true; return async ({ update }) => { await update(); busy = false; }; }}>
				<input type="hidden" name="token" value={token} />
				<button disabled={busy} class="rounded-2xl bg-dci-burgundy px-8 py-3 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:opacity-50">
					{busy ? 'Deleting...' : 'Stop and delete my details'}
				</button>
			</form>
		{:else}
			<h1 class="font-serif text-4xl font-light text-dci-teal-deep">This link is not valid</h1>
			<p class="mt-4 text-base text-slate-700">Please use the stop link in your most recent email, or contact us and we will delete your details.</p>
		{/if}
	</div>
</section>
