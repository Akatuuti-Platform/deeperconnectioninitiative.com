<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import {
		ArrowUpRightIcon,
		BookOpenTextIcon,
		CardsIcon,
		ChartLineUpIcon,
		NotebookIcon,
		SquaresFourIcon
	} from 'phosphor-svelte';

	const tools = [
		{
			id: 'cards',
			label: 'Conversation cards',
			kicker: 'Open a prompt',
			icon: CardsIcon,
			title: 'Use a card when a conversation needs a gentle way in.',
			description:
				'Prompts help people speak without performing, explaining everything, or finding perfect mental health language first.',
			detail: 'Best for clinics, youth groups, family check-ins, and first sessions.',
			cta: 'See card game',
			href: '#toolkit-products',
			accent: '#6F231E',
			video: null as string | null,
			poster: '/photos/product-card-game.jpg'
		},
		{
			id: 'journal',
			label: 'Reflection journal',
			kicker: 'Follow the page',
			icon: NotebookIcon,
			title: 'Give thoughts somewhere structured to land.',
			description:
				'Guided pages make reflection easier for people who need a little shape before they can name what is happening.',
			detail: 'Best for personal practice, counseling support, and post-session reflection.',
			cta: 'See journal',
			href: '#toolkit-products',
			accent: '#2A6268',
			video: '/videos/journal.mp4' as string | null,
			poster: '/photos/product-journal.jpg'
		},
		{
			id: 'mood',
			label: 'Mood tracker',
			kicker: 'Notice patterns',
			icon: ChartLineUpIcon,
			title: 'Track emotional patterns without turning care into homework.',
			description:
				'A simple rhythm helps people notice what shifts across days, places, relationships, and routines.',
			detail: 'Best for daily awareness, support teams, and low-language mental health settings.',
			cta: 'See tracker',
			href: '#toolkit-products',
			accent: '#2A6268',
			video: '/videos/mood-tracker.mp4' as string | null,
			poster: '/photos/product-mood-tracker.jpg'
		}
	];

	type Tool = (typeof tools)[number];

	let activeTool = $state<Tool>(tools[0]);

	// Only autoplay the tool videos when the user hasn't asked for reduced
	// motion. Starts off (poster shown) and enables on the client if allowed.
	let allowMotion = $state(false);
	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
</script>

<section
	use:reveal={{ delay: 80, y: 22 }}
	class="relative overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-teal-deep text-dci-cream shadow-dci-panel"
>
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<div class="relative grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
		<div class="p-6 sm:p-8 lg:p-10">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-dci-cream/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dci-cream/70"
			>
				<SquaresFourIcon class="size-3.5" weight="duotone" />
				Open the kit
			</div>
			<h3 class="mt-5 max-w-lg text-4xl font-semibold leading-tight text-white sm:text-5xl">
				A tool for the moment you are in.
			</h3>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-dci-cream/72">
				Each piece has a different job: opening a conversation, making reflection easier, or
				helping someone notice patterns over time.
			</p>

			<div class="mt-8 grid gap-2">
				{#each tools as tool}
					{@const Icon = tool.icon}
					<button
						type="button"
						class={cn(
							'group grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition duration-300',
							activeTool.id === tool.id
								? 'border-dci-cream/30 bg-dci-cream/12 text-white'
								: 'border-dci-cream/10 bg-dci-cream/5 text-dci-cream/72 hover:bg-dci-cream/9'
						)}
						aria-pressed={activeTool.id === tool.id}
						onclick={() => (activeTool = tool)}
					>
						<span
							class={cn(
								'flex size-11 items-center justify-center rounded-xl transition',
								activeTool.id === tool.id ? 'bg-dci-cream text-dci-teal-deep' : 'bg-dci-cream/10'
							)}
						>
							<Icon class="size-5" weight="duotone" />
						</span>
						<span>
							<span class="block text-sm font-semibold">{tool.label}</span>
							<span class="mt-1 block text-xs text-dci-cream/58">{tool.kicker}</span>
						</span>
						<span
							class={cn(
								'h-2 w-2 rounded-full transition',
								activeTool.id === tool.id ? 'bg-dci-clay' : 'bg-dci-cream/18'
							)}
						></span>
					</button>
				{/each}
			</div>
		</div>

		<div class="relative overflow-hidden bg-dci-cream p-6 text-slate-950 sm:p-8 lg:p-10">
			<div class="grid gap-8 2xl:grid-cols-[0.9fr_1fr] 2xl:items-center">
				<div
					class="relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-dci-paper/70 shadow-dci-lift 2xl:min-h-[23rem]"
				>
					{#key activeTool.id}
						<div class="absolute inset-0" in:fade={{ duration: 320 }}>
							{#if activeTool.video}
								<!-- svelte-ignore a11y_media_has_caption -->
								<video
									src={activeTool.video}
									poster={activeTool.poster}
									autoplay={allowMotion}
									loop
									muted
									playsinline
									preload="none"
									aria-label={`${activeTool.label} in use`}
									class="h-full w-full object-cover"
								></video>
							{:else}
								<img
									src={activeTool.poster}
									alt={`${activeTool.label} in use`}
									loading="lazy"
									class="h-full w-full object-cover"
								/>
							{/if}
						</div>
					{/key}
				</div>

				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
						{activeTool.kicker}
					</p>
					<h4 class="mt-4 text-3xl font-semibold leading-tight text-slate-950">
						{activeTool.title}
					</h4>
					<p class="mt-4 text-base leading-relaxed text-slate-700">{activeTool.description}</p>
					<div class="mt-6 rounded-2xl border border-dci-teal/12 bg-dci-paper/70 p-4">
						<p class="text-sm font-semibold text-dci-teal-deep">{activeTool.detail}</p>
					</div>
					<a
						href={activeTool.href}
						class="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-dci-teal-deep px-6 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.98]"
					>
						{activeTool.cta}
						<ArrowUpRightIcon class="size-4" weight="regular" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
