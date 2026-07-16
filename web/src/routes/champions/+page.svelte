<script lang="ts">
	import {
		UsersThreeIcon as Users,
		ChartLineUpIcon as ChartLineUp,
		HeartIcon as Heart,
		ArrowUpRightIcon as ArrowUpRight
	} from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CheckList, CtaBand } from '$lib/components/sections';

	const does = [
		{
			icon: Users,
			title: 'Run Conversation Clinics',
			description:
				'Peer-led wellness meetups in your community, school, or organisation. No clinician required, just a trained Champion and the toolkit.'
		},
		{
			icon: ChartLineUp,
			title: 'Monitor mood data',
			description:
				'Read patterns across your community and get a quiet alert when something needs attention, before it becomes a crisis.'
		},
		{
			icon: Heart,
			title: 'Hold space that matters',
			description:
				'Create room for the honest conversations most groups never have the structure to start.'
		}
	];

	const covers = [
		'How to run a Conversation Clinic from start to finish',
		'How to read the Mood Tracker and Early Warning System signals',
		'How to hold space without needing to be a clinician',
		'How Connection Miles work, and how yours compound as your community grows'
	];
</script>

<PageHero
	eyebrow="Community Champions"
	eyebrowIcon={Users}
	title="Become the infrastructure in your community."
	description="A certified DCI facilitator trained through the Training of Trainers program to run clinics, hold space, and monitor mood data across their community."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-7">Apply for the next cohort</Button>
		<Button
			href="/trainings"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			See training tiers
		</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/champion-training-hero.jpg"
			alt="A Community Champion training a room of young people"
			class="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-dci-panel"
		/>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading
		eyebrow="What a Champion does"
		title="One certified Champion changes the texture of a whole community."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each does as item, index}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<FeatureCard icon={item.icon} title={item.title} description={item.description} />
			</div>
		{/each}
	</div>
</Section>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
		<SectionHeading
			tone="dark"
			eyebrow="Training of Trainers"
			title="What the certification covers."
		/>
		<div use:reveal={{ delay: 120, y: 18 }} class="rounded-[2rem] border border-dci-cream/12 bg-dci-cream/6 p-8">
			<CheckList items={covers} accent="#F6ECD9" class="[&_span]:text-dci-cream/80" />
			<div class="mt-8 border-t border-dci-cream/12 pt-6">
				<div class="flex flex-wrap items-end justify-between gap-4">
					<div>
						<p class="text-4xl font-bold text-white">UGX 500,000</p>
						<p class="mt-1 text-sm text-dci-cream/60">per person · one certified Champion</p>
					</div>
					<p class="rounded-full bg-dci-cream/10 px-4 py-1.5 text-sm font-semibold text-dci-cream">
						50+ compounding miles
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Ready to lead?"
	title="Apply to the next Community Champion cohort."
	description="You don't just help one person, you change the texture of a whole community. And your miles keep compounding as it grows."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-8">
			Submit application
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	{/snippet}
</CtaBand>
