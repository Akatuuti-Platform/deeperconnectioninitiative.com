<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		ArrowUpRightIcon as ArrowUpRight,
		CalendarCheckIcon as CalendarCheck,
		HandshakeIcon as HeartHandshake,
		MapTrifoldIcon as MapPinned,
		ChatCircleDotsIcon as MessageCircleHeart,
		ShieldCheckIcon as ShieldCheck,
		UsersThreeIcon as UsersRound
	} from 'phosphor-svelte';

	const roles = [
		{
			title: 'Clinic Support',
			description: 'Help set up conversation spaces, welcome participants, and support smooth sessions.',
			icon: MessageCircleHeart
		},
		{
			title: 'Community Champion',
			description: 'Train to facilitate DCI toolkit conversations in your neighborhood, school, or venue.',
			icon: UsersRound
		},
		{
			title: 'Referral Steward',
			description: 'Support responsible signposting to trained providers and crisis-safe resources.',
			icon: ShieldCheck
		},
		{
			title: 'Venue Connector',
			description: 'Help identify cafes, studios, schools, and community spaces that can host DCI work.',
			icon: MapPinned
		}
	];
</script>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
			<div class="max-w-3xl space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
				>
					<HeartHandshake class="size-4 text-[#2A6268]" weight="duotone" />
					<span class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
						Volunteer with DCI
					</span>
				</div>
				<div class="space-y-5">
					<h1 class="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
						Help make emotional support easier to reach.
					</h1>
					<p class="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
						DCI volunteers help create warm, grounded, and practical spaces where people can talk,
						reflect, learn, and find the next right support.
					</p>
				</div>
				<div class="flex flex-col gap-3 sm:flex-row">
					<Button href="/contact" size="lg" class="rounded-full px-7">
						Apply to volunteer
						<ArrowUpRight class="size-4" weight="regular" />
					</Button>
					<Button
						href="/trainings"
						size="lg"
						variant="outline"
						class="rounded-full border-[#2A6268]/25 bg-transparent px-7 text-[#1A3C40] hover:bg-[#2A6268]/7"
					>
						See trainings
					</Button>
				</div>
			</div>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] bg-[#1A3C40] p-6 text-[#F6ECD9] sm:p-8"
			>
				<SpotIllustration
					variant="community"
					class="pointer-events-none absolute -right-14 bottom-0 hidden w-72 rotate-2 opacity-24 lg:block"
				/>
				<div class="relative z-10 max-w-lg">
					<CalendarCheck class="size-8 text-[#F6ECD9]" weight="duotone" />
					<p class="mt-6 text-2xl font-semibold leading-tight text-white">
						Volunteer orientation is the first step before facilitating or supporting a DCI clinic.
					</p>
					<p class="mt-4 text-sm leading-relaxed text-[#F6ECD9]/70">
						We match people based on availability, care experience, language, location, and comfort
						with group support work.
					</p>
				</div>
			</div>
		</div>

		<div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
			{#each roles as role, index}
				{@const Icon = role.icon}
				<article
					use:reveal={{ delay: index * 70, y: 18 }}
					class="dci-soft-hover rounded-[2rem] border border-[#2A6268]/12 bg-[#F6ECD9] p-6 shadow-[0_24px_70px_-62px_rgba(0,0,0,0.75)]"
				>
					<div class="mb-8 flex size-12 items-center justify-center rounded-xl bg-white/65 text-[#2A6268]">
						<Icon class="size-6" weight="duotone" />
					</div>
					<h2 class="text-2xl font-semibold leading-tight text-slate-950">{role.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-slate-700">{role.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
