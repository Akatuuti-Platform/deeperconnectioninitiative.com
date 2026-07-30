<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
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
		SparkleIcon,
		TrophyIcon,
		UsersThreeIcon,
		BuildingsIcon
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

	// Real geographic coordinates (lat/lng) for each field location in Uganda.
	const mapLocations = [
		{ name: 'Kampala', toolkits: 58, miles: 1240, lat: 0.3476, lng: 32.5825, color: '#6F231E' },
		{ name: 'Wakiso', toolkits: 34, miles: 760, lat: 0.4044, lng: 32.4594, color: '#D49C70' },
		{ name: 'Jinja', toolkits: 21, miles: 410, lat: 0.4244, lng: 33.2041, color: '#2A6268' },
		{ name: 'Mbarara', toolkits: 18, miles: 360, lat: -0.6072, lng: 30.6545, color: '#6F231E' },
		{ name: 'Gulu', toolkits: 16, miles: 295, lat: 2.7746, lng: 32.299, color: '#2A6268' },
		{ name: 'Mbale', toolkits: 14, miles: 270, lat: 1.0644, lng: 34.1797, color: '#D49C70' }
	];

	let mapEl: HTMLDivElement;

	onMount(() => {
		let map: import('leaflet').Map | undefined;
		let cancelled = false;

		(async () => {
			const L = (await import('leaflet')).default;
			if (cancelled || !mapEl) return;

			map = L.map(mapEl, {
				scrollWheelZoom: false, // don't hijack page scroll
				zoomControl: true,
				attributionControl: true
			}).setView([1.3, 32.4], 7);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; OpenStreetMap contributors'
			}).addTo(map);

			for (const loc of mapLocations) {
				const icon = L.divIcon({
					className: 'dci-map-pin',
					html: `<span class="dci-pin-dot" style="--pin:${loc.color}"></span>`,
					iconSize: [20, 20],
					iconAnchor: [10, 10]
				});
				L.marker([loc.lat, loc.lng], { icon, title: loc.name })
					.addTo(map)
					.bindPopup(
						`<div class="dci-pin-pop"><p class="dci-pin-name">${loc.name}</p>` +
							`<p>${loc.toolkits} toolkits funded</p>` +
							`<p>${loc.miles} connection miles</p></div>`
					);
			}

			// Frame the view to the actual field points.
			const bounds = L.latLngBounds(
				mapLocations.map((l) => [l.lat, l.lng] as [number, number])
			);
			map.fitBounds(bounds, { padding: [48, 48] });
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});

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

	// Public leaderboard - illustrative preview of what champions and partner
	// organizations see on their DCI dashboard. Ranked by total Connection Miles
	// (1 mile = 1 life meaningfully impacted). Real figures will come from the
	// platform; these are representative field numbers.
	type Leader = { name: string; meta: string; miles: number };

	const boards: Record<'champions' | 'organizations', { label: string; icon: typeof TrophyIcon; rows: Leader[] }> = {
		champions: {
			label: 'Champions',
			icon: UsersThreeIcon,
			rows: [
				{ name: 'Aisha Namubiru', meta: 'Verified Champion · Kampala', miles: 624 },
				{ name: 'Daniel Okello', meta: 'Verified Champion · Gulu', miles: 512 },
				{ name: 'Grace Achan', meta: 'Professional Champion · Mbarara', miles: 448 },
				{ name: 'Samuel Kato', meta: 'Verified Champion · Jinja', miles: 361 },
				{ name: 'Patience Nakato', meta: 'Verified Champion · Wakiso', miles: 297 },
				{ name: 'Ronald Mugisha', meta: 'Verified Champion · Mbale', miles: 254 }
			]
		},
		organizations: {
			label: 'Organizations',
			icon: BuildingsIcon,
			rows: [
				{ name: 'Butabika Community Outreach', meta: 'Implementer · Kampala', miles: 1180 },
				{ name: 'UCU Wellness Circle', meta: 'Grassroots · Mukono', miles: 640 },
				{ name: 'Mbarara Hope Center', meta: 'Implementer · Mbarara', miles: 545 },
				{ name: 'Gulu Youth Minds', meta: 'Grassroots · Gulu', miles: 412 },
				{ name: 'Jinja Safe Space', meta: 'Grassroots · Jinja', miles: 330 }
			]
		}
	};

	let activeBoard = $state<'champions' | 'organizations'>('champions');
	const activeRows = $derived(boards[activeBoard].rows);
	const leaderMiles = $derived(activeRows[0].miles);

	const rankTone = ['bg-dci-burgundy text-dci-cream', 'bg-dci-teal text-dci-cream', 'bg-dci-clay text-dci-cream'];

	const initials = (name: string) =>
		name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
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

			<div
				bind:this={mapEl}
				class="dci-map relative z-0 h-[420px] w-full overflow-hidden rounded-[1.5rem] border border-dci-teal/12 sm:h-[480px]"
				aria-label="Interactive map of DCI field activity across Uganda"
			></div>
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
						class="rounded-2xl border border-dci-teal/12 bg-dci-cream p-5 shadow-dci-lift"
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
		<div class="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
			<div class="space-y-5" use:reveal={{ delay: 0, y: 18 }}>
				<p class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-dci-teal">
					<TrophyIcon class="size-4" weight="duotone" />
					The leaderboard
				</p>
				<h2
					class="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl"
				>
					Every mile is one life. Here's who's moving the most.
				</h2>
			</div>
			<p class="max-w-2xl text-base leading-relaxed text-slate-700" use:reveal={{ delay: 90, y: 18 }}>
				Champions and partner organizations earn Connection Miles for every reflection, clinic, and
				kit that reaches the field. The public leaderboard mirrors what they see on their DCI
				dashboard: recognition that the quiet work is counted.
			</p>
		</div>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-cream shadow-dci-lift"
		>
			<!-- Board toggle -->
			<div class="flex flex-wrap items-center justify-between gap-4 border-b border-dci-teal/10 p-5 sm:p-6">
				<div class="inline-flex rounded-full border border-dci-teal/15 bg-dci-paper p-1">
					{#each Object.entries(boards) as [key, board]}
						{@const Icon = board.icon}
						<button
							type="button"
							onclick={() => (activeBoard = key as 'champions' | 'organizations')}
							class={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
								activeBoard === key
									? 'bg-dci-teal-deep text-dci-cream shadow-dci-soft'
									: 'text-dci-teal-deep hover:bg-dci-teal/8'
							}`}
							aria-pressed={activeBoard === key}
						>
							<Icon class="size-4" weight="duotone" />
							{board.label}
						</button>
					{/each}
				</div>
				<p class="text-xs font-medium uppercase tracking-wide text-slate-500">
					Total Connection Miles · this season
				</p>
			</div>

			<!-- Ranked rows -->
			<ol class="divide-y divide-dci-teal/8">
				{#each activeRows as row, index (activeBoard + row.name)}
					<li
						class="flex items-center gap-4 px-5 py-4 sm:gap-5 sm:px-6 sm:py-5"
						use:reveal={{ delay: index * 60, y: 12 }}
					>
						<span
							class={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
								index < 3 ? rankTone[index] : 'bg-dci-paper text-dci-teal-deep'
							}`}
						>
							{index + 1}
						</span>

						<span
							class="flex size-11 shrink-0 items-center justify-center rounded-full bg-dci-teal/10 text-sm font-bold text-dci-teal-deep"
							aria-hidden="true"
						>
							{initials(row.name)}
						</span>

						<div class="min-w-0 flex-1">
							<p class="truncate text-base font-semibold text-slate-950 sm:text-lg">{row.name}</p>
							<p class="truncate text-xs text-slate-600 sm:text-sm">{row.meta}</p>
							<div class="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-dci-paper">
								<div
									class="h-full rounded-full bg-dci-teal transition-[width] duration-500"
									style={`width:${Math.round((row.miles / leaderMiles) * 100)}%`}
								></div>
							</div>
						</div>

						<div class="shrink-0 text-right">
							<p class="text-xl font-bold text-dci-teal-deep sm:text-2xl">
								{row.miles.toLocaleString()}
							</p>
							<p class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">miles</p>
						</div>
					</li>
				{/each}
			</ol>

			<p class="border-t border-dci-teal/10 px-5 py-4 text-xs leading-relaxed text-slate-500 sm:px-6">
				1 Connection Mile = 1 life meaningfully impacted. Figures shown are representative field
				numbers; live rankings open with the DCI platform.
			</p>
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

<style>
	/* Brand-styled Leaflet pins + popups.
	   These target Leaflet-injected DOM, so they must be :global. */
	:global(.dci-map .leaflet-container) {
		background: var(--dci-sand);
		font-family: var(--font-sans), system-ui, sans-serif;
	}

	:global(.dci-pin-dot) {
		display: block;
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		background: var(--pin, #2a6268);
		box-shadow:
			0 0 0 4px var(--dci-paper),
			0 6px 16px -6px rgba(26, 60, 64, 0.6);
		position: relative;
	}
	:global(.dci-pin-dot::after) {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		background: var(--pin, #2a6268);
		opacity: 0.35;
		animation: dci-pin-ping 1.7s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
	@keyframes dci-pin-ping {
		75%,
		100% {
			transform: scale(2.1);
			opacity: 0;
		}
	}

	:global(.leaflet-popup-content-wrapper) {
		border-radius: 1rem;
		background: var(--dci-cream);
		border: 1px solid rgba(42, 98, 104, 0.15);
		box-shadow: var(--shadow-dci-lift);
	}
	:global(.leaflet-popup-tip) {
		background: var(--dci-cream);
	}
	:global(.dci-pin-pop .dci-pin-name) {
		font-weight: 600;
		color: var(--dci-teal-deep);
		font-size: 0.875rem;
	}
	:global(.dci-pin-pop p) {
		margin: 0.15rem 0 0;
		font-size: 0.75rem;
		color: #475569;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.dci-pin-dot::after) {
			animation: none;
		}
	}
</style>
