<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '@/lib/components/ui/button';
	import { LockSimpleIcon as LockSimple, ShieldCheckIcon as ShieldCheck } from 'phosphor-svelte';

	let { data, form } = $props();
	let submitting = $state(false);

	const donationPresets = [20_000, 69_000, 200_000];
	let donationAmount = $state('');

	const formatUgx = (n: number) => `${n.toLocaleString('en-US')} UGX`;
</script>

<svelte:head>
	<title>Checkout: {data.product.name} | DCI Wellness</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift sm:p-10"
		>
			<div class="mb-8 space-y-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Secure checkout</p>
				<h1 class="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
					{data.product.name}
				</h1>
				<p class="text-base leading-relaxed text-slate-600">{data.product.description}</p>
				{#if data.product.amount !== null}
					<p class="text-2xl font-bold text-dci-teal-deep">{formatUgx(data.product.amount)}</p>
				{/if}
			</div>

			{#if form?.errors?.form}
				<div
					class="mb-6 rounded-2xl border border-dci-burgundy/25 bg-dci-burgundy/8 px-5 py-4 text-sm text-dci-burgundy"
					role="alert"
				>
					{form.errors.form}
				</div>
			{/if}

			<form
				class="space-y-6"
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				{#if data.product.amount === null}
					<div class="space-y-3">
						<span class="text-sm font-semibold text-slate-950">Choose an amount (UGX)</span>
						<div class="flex flex-wrap gap-2">
							{#each donationPresets as preset}
								<button
									type="button"
									class="rounded-full border px-4 py-2 text-sm font-semibold transition {donationAmount ===
									String(preset)
										? 'border-dci-teal bg-dci-teal text-white'
										: 'border-dci-teal/20 bg-dci-paper text-slate-700 hover:border-dci-teal/50'}"
									onclick={() => (donationAmount = String(preset))}
								>
									{preset.toLocaleString('en-US')}
								</button>
							{/each}
						</div>
						<input
							id="amount"
							name="amount"
							type="text"
							inputmode="numeric"
							required
							bind:value={donationAmount}
							aria-invalid={form?.errors?.amount ? 'true' : undefined}
							placeholder="Enter amount in UGX"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
						{#if form?.errors?.amount}
							<p class="text-sm text-dci-burgundy">{form.errors.amount}</p>
						{/if}
					</div>
				{/if}

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="name" class="text-sm font-semibold text-slate-950">Your name</label>
						<input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							required
							value={form?.values?.name ?? ''}
							aria-invalid={form?.errors?.name ? 'true' : undefined}
							placeholder="Full name"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
						{#if form?.errors?.name}
							<p class="text-sm text-dci-burgundy">{form.errors.name}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="email" class="text-sm font-semibold text-slate-950">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							value={form?.values?.email ?? ''}
							aria-invalid={form?.errors?.email ? 'true' : undefined}
							placeholder="you@example.com"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
						{#if form?.errors?.email}
							<p class="text-sm text-dci-burgundy">{form.errors.email}</p>
						{/if}
					</div>
				</div>

				<div class="space-y-2">
					<label for="phone" class="text-sm font-semibold text-slate-950"
						>Phone number <span class="font-normal text-slate-500">(optional)</span></label
					>
					<input
						id="phone"
						name="phone"
						type="tel"
						autocomplete="tel"
						value={form?.values?.phone ?? ''}
						placeholder="+256..."
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
					/>
				</div>

				<div
					class="flex flex-col gap-4 border-t border-dci-teal/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
				>
					<p class="flex max-w-md items-center gap-2 text-sm leading-relaxed text-slate-600">
						<ShieldCheck class="size-4 shrink-0 text-dci-teal" weight="duotone" />
						You will complete payment on Flutterwave's secure page.
					</p>
					<Button type="submit" size="lg" disabled={submitting} class="rounded-full px-8">
						<LockSimple class="size-4" weight="bold" />
						{submitting ? 'Preparing payment…' : 'Continue to payment'}
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>
