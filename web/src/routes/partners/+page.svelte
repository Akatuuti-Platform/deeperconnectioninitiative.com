<script lang="ts">
	import {
		BuildingsIcon as Building2,
		ChatCircleTextIcon as MessageCircle,
		ToolboxIcon as Toolbox,
		WaveformIcon as Waveform,
		ShieldCheckIcon as ShieldCheck,
		ArrowUpRightIcon as ArrowUpRight
	} from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CtaBand } from '$lib/components/sections';

	const pillars = [
		{
			icon: MessageCircle,
			kicker: 'Connect',
			title: 'Space for honest conversation',
			description:
				'Community Champions and Conversation Clinics create the room your people need to say what usually goes unsaid.'
		},
		{
			icon: Toolbox,
			kicker: 'Equip',
			title: 'Language and daily practice',
			description:
				'The Mood Tracker, Journal, and Card Game give your people the tools to notice patterns and process what they feel.'
		},
		{
			icon: Waveform,
			kicker: 'Understand',
			title: 'Patterns across your organisation',
			description:
				'The Early Warning System reads signals across your whole organisation, so support moves first, before a crisis.'
		}
	];
</script>

<PageHero
	eyebrow="For organisations"
	eyebrowIcon={Building2}
	title="Your organisation already has the people. DCI gives them a system."
	description="Crisis is expensive. Connection is cheap. Schools, corporates, NGOs, faith communities, and hospitality spaces: this is your entry point."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-7">Book a 30-minute call</Button>
		<Button
			href="/trainings"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			Explore trainings
		</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/partner-training-room.jpg"
			alt="DCI running a session at a partner organisation"
			class="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-dci-panel"
		/>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading
		eyebrow="How it works"
		title="Connect, equip, understand."
		description="Three layers that turn scattered goodwill into a system your people can actually feel."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each pillars as item, index}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<FeatureCard
					icon={item.icon}
					kicker={item.kicker}
					title={item.title}
					description={item.description}
				/>
			</div>
		{/each}
	</div>
</Section>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
		<div use:reveal={{ delay: 0, y: 18 }} class="space-y-5">
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">Engagements</p>
			<h2 class="text-4xl font-semibold leading-tight text-white sm:text-5xl">
				Scoped to fit your context.
			</h2>
			<p class="max-w-xl text-base leading-relaxed text-dci-cream/75">
				Organisations start from USD 20,000 annually. We scope every engagement around your people,
				your setting, and the outcomes you report on.
			</p>
			<Button href="/contact" size="lg" class="rounded-full bg-dci-cream px-7 text-dci-teal-deep hover:bg-white">
				Request a call
				<ArrowUpRight class="size-4" weight="regular" />
			</Button>
		</div>
		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="rounded-[2rem] border border-dci-cream/12 bg-dci-cream/6 p-8"
		>
			<div class="flex size-11 items-center justify-center rounded-xl bg-dci-cream/10 text-dci-cream">
				<ShieldCheck class="size-5" weight="duotone" />
			</div>
			<p class="mt-6 text-lg font-semibold leading-relaxed text-white">
				For funders: every Connection Mile is independently verified, permanently recorded, and never
				inflated.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-dci-cream/70">
				It's the kind of impact data that makes reporting to your own stakeholders easier, not
				harder.
			</p>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Bring DCI to your institution"
	title="See how organisations use DCI."
	description="Activate the system across your school, company, or community, and give your people an early warning system before burnout hits."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-8">Book a 30-minute call</Button>
	{/snippet}
</CtaBand>
