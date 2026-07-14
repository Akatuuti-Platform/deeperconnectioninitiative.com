<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		ArrowUpRightIcon as ArrowUpRight,
		HandshakeIcon as HeartHandshake,
		EnvelopeIcon as Mail,
		UserCircleIcon as UserRound
	} from 'phosphor-svelte';
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-24">
		<aside
			use:reveal={{ delay: 0, y: 18 }}
			class="relative overflow-hidden rounded-[2rem] bg-[#1A3C40] p-8 text-[#F6ECD9] lg:p-10"
		>
			<SpotIllustration
				variant="community"
				class="pointer-events-none absolute -right-20 bottom-0 hidden w-80 rotate-2 opacity-20 lg:block"
			/>
			<div class="relative z-10">
				<div
					class="mb-8 flex size-12 items-center justify-center rounded-xl bg-[#F6ECD9]/10 text-[#F6ECD9]"
				>
					<HeartHandshake class="size-6" weight="duotone" />
				</div>
				<p class="text-xs font-semibold uppercase tracking-wide text-[#F6ECD9]/55">Join DCI</p>
				<h1 class="mt-4 max-w-lg text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
					Create your Deeper Connection profile.
				</h1>
				<p class="mt-5 max-w-lg text-base leading-relaxed text-[#F6ECD9]/72">
					Use this when you are joining as a Champion, volunteer, partner, or toolkit supporter. We
					will connect your profile to the right DCI pathway.
				</p>
			</div>
		</aside>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="rounded-[2rem] border border-[#2A6268]/12 bg-[#F6ECD9] p-5 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10"
		>
			<div class="mb-8 space-y-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">Account details</p>
				<h2 class="text-3xl font-semibold leading-tight tracking-tight text-slate-950">
					Start with your basic information.
				</h2>
			</div>

			<form class="space-y-6">
				<input autocomplete="off" name="hidden" type="text" style="display: none" aria-hidden="true" tabindex="-1" />
				<input type="hidden" name="_redirect" value="#" />

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="name" class="text-sm font-semibold text-slate-950">Full name</label>
						<div class="relative">
							<UserRound class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#2A6268]" weight="regular" />
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								required
								placeholder="Your name"
								class="h-12 w-full rounded-2xl border border-[#2A6268]/15 bg-[#FFF9EA] pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2A6268]/50 focus:bg-white focus:ring-4 focus:ring-[#2A6268]/10"
							/>
						</div>
					</div>
					<div class="space-y-2">
						<label for="email" class="text-sm font-semibold text-slate-950">Email address</label>
						<div class="relative">
							<Mail class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#2A6268]" weight="regular" />
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								placeholder="you@example.com"
								class="h-12 w-full rounded-2xl border border-[#2A6268]/15 bg-[#FFF9EA] pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2A6268]/50 focus:bg-white focus:ring-4 focus:ring-[#2A6268]/10"
							/>
						</div>
					</div>
				</div>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="password" class="text-sm font-semibold text-slate-950">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							placeholder="Create a password"
							class="h-12 w-full rounded-2xl border border-[#2A6268]/15 bg-[#FFF9EA] px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2A6268]/50 focus:bg-white focus:ring-4 focus:ring-[#2A6268]/10"
						/>
					</div>
					<div class="space-y-2">
						<label for="pathway" class="text-sm font-semibold text-slate-950">Pathway</label>
						<select
							id="pathway"
							name="pathway"
							class="h-12 w-full rounded-2xl border border-[#2A6268]/15 bg-[#FFF9EA] px-4 text-base text-slate-950 outline-none transition focus:border-[#2A6268]/50 focus:bg-white focus:ring-4 focus:ring-[#2A6268]/10"
						>
							<option>Community Champion</option>
							<option>Volunteer</option>
							<option>Venue Partner</option>
							<option>Provider Network</option>
							<option>Sponsor</option>
						</select>
					</div>
				</div>

				<div class="flex flex-col gap-4 border-t border-[#2A6268]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-sm text-slate-600">
						Already have a profile? <a href="/signin" class="font-semibold text-[#2A6268] underline underline-offset-4">Sign in</a>
					</p>
					<Button type="submit" size="lg" class="rounded-full px-8">
						Create profile
						<ArrowUpRight class="size-4" weight="regular" />
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>
