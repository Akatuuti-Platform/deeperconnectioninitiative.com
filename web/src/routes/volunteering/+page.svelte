<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero } from '$lib/components/sections';
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

<PageHero
	eyebrow="Volunteer with DCI"
	eyebrowIcon={HeartHandshake}
	title="Help make emotional support easier to reach."
	description="DCI volunteers help create warm, grounded, and practical spaces where people can talk, reflect, learn, and find the next right support."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-7">
			Apply to volunteer
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
		<Button
			href="/trainings"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			See trainings
		</Button>
	{/snippet}
	{#snippet aside()}
		<div class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream sm:p-8">
			<SpotIllustration
				variant="community"
				class="pointer-events-none absolute -right-14 bottom-0 hidden w-72 rotate-2 opacity-24 lg:block"
			/>
			<div class="relative z-10 max-w-lg">
				<CalendarCheck class="size-8 text-dci-cream" weight="duotone" />
				<p class="mt-6 text-2xl font-semibold leading-tight text-white">
					Volunteer orientation is the first step before facilitating or supporting a DCI clinic.
				</p>
				<p class="mt-4 text-sm leading-relaxed text-dci-cream/70">
					We match people based on availability, care experience, language, location, and comfort
					with group support work.
				</p>
			</div>
		</div>
	{/snippet}
</PageHero>

<section class="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
			{#each roles as role, index}
				{@const Icon = role.icon}
				<article
					use:reveal={{ delay: index * 70, y: 18 }}
					class="dci-soft-hover rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift"
				>
					<div class="mb-8 flex size-12 items-center justify-center rounded-xl bg-white/65 text-dci-teal">
						<Icon class="size-6" weight="duotone" />
					</div>
					<h2 class="text-2xl font-semibold leading-tight text-slate-950">{role.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-slate-700">{role.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
