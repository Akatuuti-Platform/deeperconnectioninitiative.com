<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon as ArrowUpRight, LockKeyIcon as LockKeyhole, EnvelopeIcon as Mail } from 'phosphor-svelte';

	// Accounts are not open yet — prevent the form from submitting (a plain
	// <form> with no method would GET, leaking the password into the URL).
	let notice = $state(false);
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		notice = true;
	}
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
		<aside
			use:reveal={{ delay: 0, y: 18 }}
			class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-8 text-dci-cream lg:p-10"
		>
			<SpotIllustration
				variant="toolkit"
				class="pointer-events-none absolute -right-20 bottom-0 hidden w-80 rotate-2 opacity-20 lg:block"
			/>
			<div class="relative z-10">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">DCI access</p>
				<h1 class="mt-4 max-w-lg text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
					Sign in to continue your DCI work.
				</h1>
				<p class="mt-5 max-w-lg text-base leading-relaxed text-dci-cream/72">
					Access profile details, training materials, toolkit resources, and community program
					follow-ups from one place.
				</p>
			</div>
		</aside>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-5 shadow-dci-lift sm:p-8 lg:p-10"
		>
			<div class="mb-8 space-y-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Welcome back</p>
				<h2 class="text-3xl font-semibold leading-tight tracking-tight text-slate-950">
					Use your email and password.
				</h2>
			</div>

			<form class="space-y-6" onsubmit={handleSubmit}>
				{#if notice}
					<p class="rounded-2xl border border-dci-teal/20 bg-dci-teal/5 px-4 py-3 text-sm text-dci-teal-deep" role="status">
						Accounts aren't open yet — the DCI platform is coming soon. <a href="/platform" class="font-semibold underline underline-offset-4">Learn more</a>.
					</p>
				{/if}

				<div class="space-y-2">
					<label for="email" class="text-sm font-semibold text-slate-950">Email address</label>
					<div class="relative">
						<Mail class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dci-teal" weight="regular" aria-hidden="true" />
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							placeholder="you@example.com"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
					</div>
				</div>

				<div class="space-y-2">
					<label for="password" class="text-sm font-semibold text-slate-950">Password</label>
					<div class="relative">
						<LockKeyhole class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dci-teal" weight="regular" aria-hidden="true" />
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							placeholder="Your password"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4 border-t border-dci-teal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-sm text-slate-600">
						New here? <a href="/signup" class="font-semibold text-dci-teal underline underline-offset-4">Create a profile</a>
					</p>
					<Button type="submit" size="lg" class="rounded-full px-8">
						Sign in
						<ArrowUpRight class="size-4" weight="regular" />
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>
