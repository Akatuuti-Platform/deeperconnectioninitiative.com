<script lang="ts">
	import { XIcon as X, LockSimpleIcon as LockSimple, ShieldCheckIcon as ShieldCheck } from 'phosphor-svelte';

	export type DrawerProduct = { slug: string; name: string; price: string };

	let {
		product = $bindable<DrawerProduct | null>(null)
	}: { product?: DrawerProduct | null } = $props();

	let emailField: HTMLInputElement | undefined = $state();
	let submitting = $state(false);

	function close() {
		product = null;
		submitting = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}

	// Focus the one field as soon as the panel opens, so buying is a single
	// keystroke away rather than a hunt.
	$effect(() => {
		if (product && emailField) emailField.focus();
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if product}
	<!--
		The form posts natively to the product's own checkout action, which
		redirects straight to Flutterwave. That keeps the buyer on this page until
		the payment page itself, and still works with JavaScript disabled.
	-->
	<div class="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
		<button
			type="button"
			aria-label="Close checkout"
			onclick={close}
			class="absolute inset-0 bg-dci-ink/45 backdrop-blur-sm"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-label={`Buy ${product.name}`}
			class="relative w-full max-w-md rounded-t-[2rem] border border-dci-teal/15 bg-dci-cream p-6 shadow-dci-lift sm:rounded-[2rem] sm:p-8"
		>
			<button
				type="button"
				onclick={close}
				aria-label="Close"
				class="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-dci-teal/8 hover:text-slate-800"
			>
				<X class="size-4" weight="bold" />
			</button>

			<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Secure checkout</p>
			<h2 class="mt-2 pr-10 text-2xl font-semibold leading-tight text-slate-950">{product.name}</h2>
			<p class="mt-2 text-2xl font-bold text-dci-teal-deep">{product.price}</p>

			<form
				method="POST"
				action={`/checkout/${product.slug}`}
				class="mt-6 space-y-4"
				onsubmit={() => (submitting = true)}
			>
				<input autocomplete="off" name="company" type="text" tabindex="-1" aria-hidden="true" class="hidden" />

				<div class="space-y-2">
					<label for="drawer-email" class="text-sm font-semibold text-slate-950">
						Email for your receipt
					</label>
					<input
						bind:this={emailField}
						id="drawer-email"
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="you@example.com"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
					/>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-dci-teal-deep text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.99] disabled:opacity-70"
				>
					<LockSimple class="size-4" weight="bold" />
					{submitting ? 'Taking you to payment…' : `Pay ${product.price}`}
				</button>

				<p class="flex items-center justify-center gap-2 text-center text-xs text-slate-600">
					<ShieldCheck class="size-4 shrink-0 text-dci-teal" weight="duotone" />
					Mobile Money or card, on Flutterwave's secure page.
				</p>
			</form>
		</div>
	</div>
{/if}
