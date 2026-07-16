<script lang="ts">
	import {
		BrainIcon as Brain,
		BatteryChargingIcon as BatteryCharging,
		PathIcon as Path,
		ChatsCircleIcon as Chats,
		CompassIcon as Compass,
		SparkleIcon as Sparkles,
		ArrowUpRightIcon as ArrowUpRight
	} from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CtaBand } from '$lib/components/sections';

	const facets = [
		{ icon: Brain, title: 'How you think', description: 'The mental models running underneath every decision you make.' },
		{ icon: BatteryCharging, title: 'How you recover', description: "What actually restores you, versus what you've mistaken for rest." },
		{ icon: Path, title: 'How you decide', description: 'The pattern behind your choices under pressure, not just the outcome.' },
		{ icon: Chats, title: 'How you communicate', description: 'What you say when the stakes are high and the room is watching.' },
		{ icon: Compass, title: 'How you lead', description: 'The version of you that shows up when people are depending on you.' }
	];

	const tiers = [
		{
			name: 'Blueprint Assessment',
			price: 'Free',
			lead: 'Self-guided',
			blurb: 'Discover the hidden patterns shaping your performance.',
			cta: 'Start the assessment',
			accent: '#2A6268'
		},
		{
			name: 'Guided Toolkit Experience',
			price: 'UGX 700,000',
			lead: 'Ann Banya, solo',
			blurb: 'Wellbeing frame. The accessible entry rung. 4 weekly sessions + full DCI toolkit.',
			cta: 'Apply',
			accent: '#2A6268'
		},
		{
			name: 'Performance Blueprint Coaching',
			price: 'UGX 3,500,000',
			lead: 'Emily leads, Ann as principal',
			blurb: 'The flagship. 6–8 sessions over ~4 months, full assessment + re-assessment, between-session support.',
			cta: 'Apply',
			accent: '#6F231E',
			popular: true
		},
		{
			name: 'Executive Performance Blueprint',
			price: 'From UGX 7,000,000',
			lead: 'Ann leads, Emily supporting',
			blurb: 'Bespoke, for founders & C-suite. 4–6 months, highest touch. By quotation.',
			cta: 'Request a conversation',
			accent: '#2A6268'
		}
	];
</script>

<PageHero
	eyebrow="Performance Blueprint™"
	eyebrowIcon={Sparkles}
	title="Sustainable performance happens when you stop fighting yourself."
	description="Discover the system behind how you think, lead, and perform. For founders and leaders who are winning on the outside and fighting themselves on the inside."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-7">Take the free assessment</Button>
		<Button
			href="#tiers"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			Explore coaching
		</Button>
	{/snippet}
	{#snippet aside()}
		<div
			class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-8 text-dci-cream shadow-dci-panel lg:p-10"
		>
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">Why it works</p>
			<p class="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">
				“You're not underperforming. You're exhausted from fighting yourself.”
			</p>
			<p class="mt-5 text-sm leading-relaxed text-dci-cream/70">
				The Blueprint works on the systems beneath your performance — how you think, recover,
				communicate, lead, and decide under pressure.
			</p>
		</div>
	{/snippet}
</PageHero>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
		<SectionHeading
			tone="dark"
			eyebrow="The thesis"
			title="The greatest performance bottlenecks are rarely technical."
		/>
		<p use:reveal={{ delay: 120, y: 18 }} class="text-base leading-relaxed text-dci-cream/75">
			They're emotional, cognitive, behavioural, and spiritual. Most coaching works on goals and
			motivation. The DCI Performance Blueprint works on the systems beneath your performance, how you
			think, recover, communicate, lead, and make decisions under pressure. We don't help you do more.
			We help you become someone who can sustain meaningful impact without burning out.
		</p>
	</div>
</Section>

<Section>
	<SectionHeading
		eyebrow="Five facets of one Blueprint"
		title="Under pressure, not in the abstract."
		class="mb-12"
	/>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each facets as item, index}
			<div use:reveal={{ delay: index * 70, y: 22 }} class="h-full">
				<FeatureCard icon={item.icon} title={item.title} description={item.description} />
			</div>
		{/each}
		<div
			use:reveal={{ delay: facets.length * 70, y: 22 }}
			class="flex h-full flex-col justify-center rounded-[2rem] bg-dci-teal-deep p-7 text-dci-cream"
		>
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">Who it's for</p>
			<p class="mt-4 text-lg font-semibold leading-relaxed text-white">
				You're not underperforming. You're exhausted from fighting yourself.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-dci-cream/70">
				Founders navigating uncertainty. Executives leading teams. Emerging leaders whose own thinking
				has become their biggest obstacle.
			</p>
		</div>
	</div>
</Section>

<Section id="tiers" tone="cream">
	<SectionHeading
		eyebrow="Where you start depends on what you need"
		title="Identity → Performance → Belonging."
		class="mb-12"
	/>
	<div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
		{#each tiers as tier, index}
			<article
				use:reveal={{ delay: index * 70, y: 22 }}
				class={`dci-soft-hover relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-[#ffffeb] p-6 shadow-dci-lift ${tier.popular ? 'border-dci-burgundy/35 xl:-mt-4 xl:mb-4' : 'border-dci-teal/12'}`}
			>
				{#if tier.popular}
					<div class="absolute right-5 top-5 rounded-full bg-dci-burgundy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
						Most chosen
					</div>
				{/if}
				<h3 class="max-w-[80%] text-xl font-semibold leading-tight text-slate-950">{tier.name}</h3>
				<p class="mt-4 text-3xl font-bold" style={`color:${tier.accent}`}>{tier.price}</p>
				<p class="mt-1 text-sm font-medium text-slate-600">{tier.lead}</p>
				<p class="mt-4 flex-grow text-sm leading-relaxed text-slate-700">{tier.blurb}</p>
				<Button href="/contact" class="mt-6 rounded-full">
					{tier.cta}
					<ArrowUpRight class="size-4" weight="regular" />
				</Button>
			</article>
		{/each}
	</div>
	<p class="mt-6 max-w-3xl text-sm text-slate-600">
		Prices shown are per engagement. The premium tiers begin with an application and a fit
		conversation, not instant checkout. This is coaching, not a substitute for therapy.
	</p>
</Section>

<Section>
	<SectionHeading
		eyebrow="Who's behind the Blueprint"
		title="The coach who's been where you are, and the specialist who can go where it hurts."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-2">
		<article use:reveal={{ delay: 0, y: 22 }} class="flex flex-col gap-6 rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 sm:flex-row sm:p-7">
			<img src="/photos/emily.jpg" alt="Emily" class="size-28 shrink-0 rounded-2xl object-cover" />
			<div>
				<h3 class="text-2xl font-semibold text-slate-950">Emily</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-700">
					Co-founder of Utalii Creative, DCI Wellness, and Akatuuti. Built three ventures through
					burnout, anxiety, grief, and self-sabotage, and redesigned the systems beneath her own
					performance to survive it. Lived experience, and systems design.
				</p>
			</div>
		</article>
		<article use:reveal={{ delay: 90, y: 22 }} class="flex flex-col gap-6 rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 sm:flex-row sm:p-7">
			<img src="/photos/ann-banya.jpg" alt="Ann Banya" class="size-28 shrink-0 rounded-2xl object-cover" />
			<div>
				<h3 class="text-2xl font-semibold text-slate-950">Ann</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-700">
					40+ years as a behavioural-health specialist. Clinical-grade depth, brought to every
					engagement she leads or supports.
				</p>
			</div>
		</article>
	</div>
</Section>

<CtaBand
	eyebrow="DCI Inner Circle™ · coming soon"
	title="Growth is better shared."
	description="The Blueprint is where you redesign how you perform. The DCI Inner Circle is where you sustain it, a private circle of high performers on the same path. Coaching clients are first in."
>
	{#snippet actions()}
		<Button href="/contact" size="lg" class="rounded-full px-8">Join the waitlist</Button>
	{/snippet}
</CtaBand>
