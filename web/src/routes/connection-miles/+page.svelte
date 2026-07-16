<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ToolkitDemo from '$lib/components/pages/sections/toolkit-demo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PageHero } from '$lib/components/sections';
	import { paymentLinks } from '$lib/payment-links';
	import {
		ArrowUpRightIcon as ArrowUpRight,
		CardsIcon,
		ChartLineUpIcon,
		NotebookIcon,
		SparkleIcon
	} from 'phosphor-svelte';

	const campaignStats = [
		{
			label: 'Toolkits funded',
			value: '184',
			detail: 'Complete kits moving into clinics, schools, teams, and circles.'
		},
		{
			label: 'Connection miles',
			value: '3,920',
			detail: 'Earned through toolkit use, clinics, and sponsored kits.'
		},
		{
			label: 'Active field points',
			value: '12',
			detail: 'Communities reporting journal, tracker, and clinic activity.'
		}
	];

	const mapLocations = [
		{ name: 'Kampala', toolkits: 58, miles: 1240, x: 46, y: 66, tone: 'bg-dci-burgundy' },
		{ name: 'Wakiso', toolkits: 34, miles: 760, x: 39, y: 61, tone: 'bg-dci-clay' },
		{ name: 'Jinja', toolkits: 21, miles: 410, x: 57, y: 59, tone: 'bg-dci-teal' },
		{ name: 'Mbarara', toolkits: 18, miles: 360, x: 30, y: 78, tone: 'bg-dci-burgundy' },
		{ name: 'Gulu', toolkits: 16, miles: 295, x: 42, y: 27, tone: 'bg-dci-teal' },
		{ name: 'Mbale', toolkits: 14, miles: 270, x: 67, y: 43, tone: 'bg-dci-clay' }
	];

	const rubric = [
		{
			name: 'Card game',
			icon: CardsIcon,
			description: 'Used in Conversation Clinics.',
			items: [
				{ action: 'Attend a clinic', miles: '1 mile' },
				{ action: 'Facilitate a clinic', miles: '5 miles' }
			]
		},
		{
			name: 'Journal',
			icon: NotebookIcon,
			description: 'Completed entries turn reflection into measurable connection.',
			items: [{ action: 'Complete one entry', miles: '1 mile' }]
		},
		{
			name: 'Mood tracker',
			icon: ChartLineUpIcon,
			description: 'Each check-in helps people notice emotional patterns early.',
			items: [{ action: 'Submit a mood check-in', miles: '1 mile' }]
		},
		{
			name: 'Sponsored toolkit',
			icon: SparkleIcon,
			description: 'Funding a full toolkit into the field is counted separately from using it.',
			items: [{ action: 'Sponsor one complete kit', miles: '10 miles' }]
		}
	];

	const products = [
		{
			name: 'DCI Card Game',
			description: 'Conversation prompts for low-pressure emotional check-ins.',
			price: '69,000 UGX',
			href: paymentLinks.cardGame,
			icon: CardsIcon,
			accent: '#6F231E'
		},
		{
			name: 'DCI Reflection Journal',
			description: 'Guided pages for processing, naming, and noticing what is happening.',
			price: '120,000 UGX',
			href: paymentLinks.journal,
			icon: NotebookIcon,
			accent: '#2A6268'
		},
		{
			name: 'DCI Mood Tracker',
			description: 'A simple daily rhythm for noticing emotional patterns over time.',
			price: '31,000 UGX',
			href: paymentLinks.moodTracker,
			icon: ChartLineUpIcon,
			accent: '#2A6268'
		}
	];
</script>

<PageHero
	eyebrow="Toolkit field tracker"
	eyebrowIcon={SparkleIcon}
	title="Every toolkit can move connection further."
	description="Track how sponsored DCI toolkits, Conversation Clinics, journal entries, and mood check-ins are building measurable Connection Miles across the field."
>
	{#snippet actions()}
		<Button href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer" size="lg" class="rounded-full">
			Buy a toolkit
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
		<Button
			href={paymentLinks.donation} target="_blank" rel="noopener noreferrer"
			size="lg"
			variant="outline"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			Sponsor a field kit
		</Button>
	{/snippet}
	{#snippet aside()}
		<div
			class="grid gap-3 rounded-[2rem] border border-dci-teal/12 bg-dci-teal-deep p-4 text-dci-cream shadow-dci-panel sm:grid-cols-3 sm:p-5"
		>
			{#each campaignStats as stat}
				<div class="rounded-2xl border border-dci-cream/10 bg-dci-cream/8 p-5">
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
						{stat.label}
					</p>
					<p class="mt-3 text-4xl font-semibold leading-none text-white">{stat.value}</p>
					<p class="mt-3 text-sm leading-relaxed text-dci-cream/68">{stat.detail}</p>
				</div>
			{/each}
		</div>
	{/snippet}
</PageHero>

<section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.06fr_0.94fr]">
		<div
			use:reveal={{ delay: 0, y: 18 }}
			class="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-paper p-5 shadow-dci-lift sm:p-8"
		>
			<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Connection map</p>
					<h2
						class="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl"
					>
						Where toolkits are moving into use.
					</h2>
				</div>
				<p class="max-w-xs text-sm leading-relaxed text-slate-600">
					Each marker combines sponsored kits and reported Connection Miles from local activity.
				</p>
			</div>

			<div class="relative mx-auto aspect-[0.86] w-full max-w-[520px]">
				<svg
					viewBox="0 0 460 540"
					class="h-full w-full drop-shadow-[0_26px_40px_rgba(26,60,64,0.18)]"
					aria-label="Uganda field activity map"
				>
					<path
						d="M202 22 245 38 283 68 323 72 349 106 340 148 375 182 360 225 384 268 350 306 357 352 321 382 307 432 262 446 227 506 181 482 139 488 105 451 73 423 76 374 50 340 64 291 42 245 72 209 68 160 96 126 116 83 160 72Z"
						fill="#EFE5D0"
						stroke="#1A3C40"
						stroke-width="5"
						stroke-linejoin="round"
					/>
					<path
						d="M120 129c45 44 92 58 149 51 36-4 58 8 79 29M77 257c61-20 128-17 202 12 43 17 72 15 102-5M101 421c59-50 112-71 159-64 35 5 64-5 96-31M169 76c-22 86-19 160 9 223 24 55 20 109-13 162M286 74c-10 72-1 130 27 174 29 46 27 92-5 139"
						fill="none"
						stroke="#2A6268"
						stroke-width="2"
						stroke-linecap="round"
						opacity="0.18"
					/>
				</svg>

				{#each mapLocations as location}
					<div
						class="group absolute -translate-x-1/2 -translate-y-1/2"
						style={`left:${location.x}%; top:${location.y}%`}
					>
						<div
							class={`relative size-5 rounded-full ${location.tone} ring-4 ring-dci-paper shadow-[0_12px_28px_-10px_rgba(26,60,64,0.8)]`}
						>
							<div
								class={`absolute inset-0 rounded-full ${location.tone} opacity-35 animate-ping`}
							></div>
						</div>
						<div
							class="pointer-events-none absolute bottom-[calc(100%+0.7rem)] left-1/2 w-44 -translate-x-1/2 rounded-2xl border border-dci-teal/10 bg-dci-cream p-3 text-left opacity-0 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.8)] transition duration-200 group-hover:opacity-100"
						>
							<p class="text-sm font-semibold text-dci-teal-deep">{location.name}</p>
							<p class="mt-1 text-xs text-slate-600">{location.toolkits} toolkits funded</p>
							<p class="text-xs text-slate-600">{location.miles} connection miles</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-6">
			<div
				use:reveal={{ delay: 90, y: 18 }}
				class="rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream shadow-dci-lift sm:p-8"
			>
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">The rubric</p>
				<h2 class="mt-3 text-4xl font-semibold leading-tight text-white">
					How Connection Miles are counted.
				</h2>
				<p class="mt-4 text-sm leading-relaxed text-dci-cream/72">
					Using a toolkit and sponsoring a toolkit are intentionally separate actions. Participants
					earn miles by engaging with the tools; sponsors earn miles by funding full kits into the
					field.
				</p>
			</div>

			<div class="grid gap-4">
				{#each rubric as item, index}
					{@const Icon = item.icon}
					<article
						use:reveal={{ delay: 150 + index * 70, y: 18 }}
						class="rounded-2xl border border-dci-teal/12 bg-dci-cream p-5 shadow-[0_20px_70px_-60px_rgba(0,0,0,0.8)]"
					>
						<div class="flex gap-4">
							<div
								class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-dci-paper text-dci-burgundy"
							>
								<Icon class="size-6" weight="duotone" />
							</div>
							<div class="min-w-0 flex-1">
								<h3 class="text-2xl font-semibold leading-tight text-slate-950">{item.name}</h3>
								<p class="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
								<div class="mt-4 grid gap-2">
									{#each item.items as score}
										<div
											class="flex items-center justify-between gap-3 rounded-xl bg-dci-paper/72 px-3 py-2"
										>
											<span class="text-sm font-medium text-dci-teal-deep">{score.action}</span>
											<span
												class="shrink-0 rounded-full bg-dci-teal/10 px-3 py-1 text-xs font-bold text-dci-teal"
											>
												{score.miles}
											</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
			<div class="space-y-5" use:reveal={{ delay: 0, y: 18 }}>
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Open the kit</p>
				<h2
					class="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl"
				>
					See the tools before choosing what to put in the field.
				</h2>
				<p class="max-w-2xl text-base leading-relaxed text-slate-700">
					Cards open conversation, journals shape reflection, and mood trackers help people notice
					patterns. Together they create the activity behind the Connection Miles.
				</p>
			</div>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="rounded-[2rem] bg-dci-cream p-6 shadow-dci-lift sm:p-8"
			>
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
					Field-ready support
				</p>
				<p class="mt-4 text-2xl font-semibold leading-tight text-slate-950">
					Tap through the kit demo, then choose an individual tool, buy a full kit, or sponsor one
					into a community setting.
				</p>
			</div>
		</div>

		<ToolkitDemo />
	</div>
</section>

<section id="toolkit-products" class="scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
			<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Choose a tool</p>
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
				Buy one piece or support access to the full kit.
			</h2>
		</div>

		<div class="grid gap-5 lg:grid-cols-[1fr_1fr_1fr_1.1fr]">
			{#each products as product, index}
				{@const Icon = product.icon}
				<article
					use:reveal={{ delay: index * 80, y: 18 }}
					class="dci-soft-hover flex min-h-72 flex-col justify-between rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift"
				>
					<div>
						<div
							class="mb-8 flex size-12 items-center justify-center rounded-xl bg-dci-paper"
							style={`color:${product.accent}`}
						>
							<Icon class="size-6" weight="duotone" />
						</div>
						<h3 class="text-2xl font-semibold leading-tight text-slate-950">{product.name}</h3>
						<p class="mt-3 text-sm leading-relaxed text-slate-700">{product.description}</p>
					</div>
					<div class="mt-8">
						<p class="text-lg font-bold text-dci-teal-deep">{product.price}</p>
						<Button href={product.href} class="mt-4 rounded-full">
							Get this tool
							<ArrowUpRight class="size-4" weight="regular" />
						</Button>
					</div>
				</article>
			{/each}

			<article
				use:reveal={{ delay: 260, y: 18 }}
				class="flex min-h-72 flex-col justify-between rounded-[2rem] bg-dci-teal-deep p-6 text-dci-cream shadow-dci-lift"
			>
				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
						Complete kit
					</p>
					<h3 class="mt-4 text-3xl font-semibold leading-tight text-white">All tools together.</h3>
					<p class="mt-3 text-sm leading-relaxed text-dci-cream/72">
						Card Game, Reflection Journal, Mood Tracker, and QR access bundled for personal and
						group support.
					</p>
				</div>
				<div class="mt-8 flex flex-col gap-3">
					<Button
						href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer"
						size="lg"
						class="rounded-full bg-dci-cream text-dci-teal-deep hover:bg-white"
					>
						Buy complete kit
					</Button>
					<Button
						href={paymentLinks.donation} target="_blank" rel="noopener noreferrer"
						size="lg"
						variant="outline"
						class="rounded-full border-dci-cream/30 bg-transparent text-dci-cream hover:bg-dci-cream/10"
					>
						Sponsor a kit
					</Button>
				</div>
			</article>
		</div>
	</div>
</section>
