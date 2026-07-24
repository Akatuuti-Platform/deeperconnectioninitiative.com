<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { paymentLinks } from '$lib/payment-links';
	import { ArrowsClockwiseIcon, ArrowUpRightIcon, HandTapIcon } from 'phosphor-svelte';

	type Tone = 'burgundy' | 'teal' | 'clay';
	type Prompt = { text: string; theme: string; tone: Tone; no: number };

	const prompts: Prompt[] = [
		{
			text: 'What are you using to get through a normal Tuesday — and is it actually working?',
			theme: 'Coping',
			tone: 'clay',
			no: 7
		},
		{
			text: 'Who was the last person you told the whole truth to, and how did it feel?',
			theme: 'Honesty',
			tone: 'burgundy',
			no: 12
		},
		{
			text: 'What emotion do you feel most often but almost never say out loud?',
			theme: 'Feeling',
			tone: 'teal',
			no: 19
		},
		{
			text: 'If someone really knew you, what would surprise them most?',
			theme: 'Identity',
			tone: 'clay',
			no: 23
		},
		{
			text: 'What did you need to hear as a child that no one ever said?',
			theme: 'Childhood',
			tone: 'burgundy',
			no: 31
		},
		{
			text: 'What is the hardest thing you have forgiven yourself for?',
			theme: 'Forgiveness',
			tone: 'teal',
			no: 38
		},
		{
			text: 'When was the last time you felt genuinely safe with another person?',
			theme: 'Safety',
			tone: 'clay',
			no: 44
		},
		{
			text: 'What conversation are you avoiding right now, and why?',
			theme: 'Courage',
			tone: 'burgundy',
			no: 51
		},
		{
			text: 'What would your younger self think about the life you are living?',
			theme: 'Reflection',
			tone: 'teal',
			no: 56
		},
		{
			text: 'What would change if you stopped pretending to be fine?',
			theme: 'Truth',
			tone: 'burgundy',
			no: 60
		}
	];

	// Two card faces alternate as the deck flips, so each draw reveals a fresh prompt.
	let rotation = $state(0);
	let idxA = $state(0);
	let idxB = $state(1);
	let allowMotion = $state(false);

	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function drawCard() {
		const showingA = rotation % 360 === 0;
		const currentIdx = showingA ? idxA : idxB;
		let next: number;
		do {
			next = Math.floor(Math.random() * prompts.length);
		} while (next === currentIdx && prompts.length > 1);
		if (showingA) idxB = next;
		else idxA = next;
		rotation += 180;
	}

	function toneClasses(tone: Tone) {
		if (tone === 'teal') return { text: 'text-dci-teal', chip: 'bg-dci-teal/10 text-dci-teal', bar: 'bg-dci-teal' };
		if (tone === 'clay') return { text: 'text-dci-clay', chip: 'bg-dci-clay/20 text-[#9a5a28]', bar: 'bg-dci-clay' };
		return { text: 'text-dci-burgundy', chip: 'bg-dci-burgundy/10 text-dci-burgundy', bar: 'bg-dci-burgundy' };
	}
</script>

{#snippet cardFace(p: Prompt, isBack: boolean)}
	{@const tc = toneClasses(p.tone)}
	<div
		class="absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] border border-dci-teal/12 bg-dci-paper p-7 shadow-dci-soft [backface-visibility:hidden]"
		style="transform: rotateY({isBack ? 180 : 0}deg);"
	>
		<!-- accent header bar -->
		<div class="absolute inset-x-0 top-0 h-1.5 {tc.bar}"></div>
		<!-- paper texture -->
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.05]"
			style="background-image: radial-gradient(#1a3c40 1px, transparent 1px); background-size: 18px 18px;"
		></div>

		<div class="relative flex items-start justify-between">
			<span class="font-serif text-6xl leading-[0.6] {tc.text}/60">&ldquo;</span>
			<span class="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-dci-teal/40">
				{String(p.no).padStart(2, '0')} / 60
			</span>
		</div>

		<p class="relative mt-3 font-serif text-lg leading-snug text-dci-ink sm:text-xl">
			{p.text}
		</p>

		<div class="relative mt-auto flex items-center justify-between pt-6">
			<span
				class="inline-flex items-center rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider {tc.chip}"
			>
				{p.theme}
			</span>
			<span class="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-dci-teal/40">
				DCI Card
			</span>
		</div>
	</div>
{/snippet}

{#snippet deckBack(rot: number, tx: string, ty: string, z: number)}
	<div
		class="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-dci-teal/10 bg-gradient-to-br from-[#7a2822] to-dci-teal-deep shadow-dci-soft"
		style="transform: rotate({rot}deg) translate({tx}, {ty}); z-index: {z};"
		aria-hidden="true"
	>
		<div
			class="absolute inset-0 opacity-20"
			style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 14px 14px;"
		></div>
		<div class="absolute inset-3 rounded-[1.15rem] border border-dci-cream/15"></div>
		<div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
			<!-- pulse / breathing emblem — the brand's living-body motif -->
			<div class="relative size-14 {z === 2 ? 'dci-breathe' : ''}">
				<div class="absolute inset-0 rounded-full border border-dci-cream/25"></div>
				<div class="absolute inset-2 rounded-full border border-dci-cream/20"></div>
				<div class="absolute inset-[1.15rem] rounded-full bg-dci-cream/30"></div>
			</div>
			<span class="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-dci-cream/40">
				Deeper Connection
			</span>
		</div>
	</div>
{/snippet}

<section id="card-draw" class="w-full bg-dci-cream relative z-10 overflow-hidden">
	<div use:reveal={{ delay: 80, y: 22 }} class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
		<div
			class="relative overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-teal-deep text-dci-cream shadow-dci-panel"
		>
			<!-- Dot pattern background -->
			<div
				class="pointer-events-none absolute inset-0 opacity-10"
				style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 28px 28px;"
			></div>

			<div class="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
				<!-- Left panel: intro text -->
				<div class="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
					<div
						class="inline-flex items-center gap-2 rounded-full border border-dci-cream/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dci-cream/70 w-fit mb-6"
					>
						<span class="relative flex size-1.5">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-dci-clay opacity-70"
							></span>
							<span class="relative inline-flex size-1.5 rounded-full bg-dci-clay"></span>
						</span>
						Draw a card
					</div>
					<h3 class="max-w-md text-3xl sm:text-4xl font-semibold leading-tight text-white">
						Start a conversation people actually want to have.
					</h3>
					<p class="mt-4 max-w-md text-base leading-relaxed text-dci-cream/72">
						Every DCI conversation card carries a real prompt — not a therapy question, just an
						honest one. Draw one and see what surfaces.
					</p>

					<div
						class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-dci-cream/55"
					>
						<span class="inline-flex items-center gap-1.5">
							<span class="size-1 rounded-full bg-dci-clay"></span>60 cards
						</span>
						<span class="inline-flex items-center gap-1.5">
							<span class="size-1 rounded-full bg-dci-clay"></span>Solo or in a group
						</span>
						<span class="inline-flex items-center gap-1.5">
							<span class="size-1 rounded-full bg-dci-clay"></span>No screens needed
						</span>
					</div>

					<a
						href={paymentLinks.cardGame}
						target="_blank"
						rel="noopener noreferrer"
						class="mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-dci-cream px-6 text-sm font-semibold text-dci-teal-deep transition hover:bg-white active:scale-[0.98]"
					>
						Get the card game
						<ArrowUpRightIcon class="size-4" weight="regular" />
					</a>
				</div>

				<!-- Right panel: interactive deck -->
				<div class="relative overflow-hidden bg-dci-cream p-8 sm:p-10 lg:p-12">
					<!-- warm spotlight -->
					<div
						class="pointer-events-none absolute inset-0"
						style="background: radial-gradient(58% 52% at 50% 42%, rgba(212,156,112,0.22), transparent 72%);"
					></div>

					<div class="relative flex flex-col items-center">
						<div class="relative flex w-full items-center justify-center py-5 [perspective:1600px]">
							<div class="relative w-full max-w-[21rem] h-[23rem] sm:h-[25rem]">
								<!-- ground shadow -->
								<div
									class="pointer-events-none absolute -bottom-[7%] left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[100%] bg-dci-teal-deep/20 blur-2xl"
								></div>

								<!-- fanned deck of card-backs -->
								{@render deckBack(-7, '-13px', '11px', 0)}
								{@render deckBack(5, '11px', '7px', 1)}
								{@render deckBack(-3, '-4px', '3px', 2)}

								<!-- active flip card -->
								<div
									class="absolute inset-0 z-10 cursor-pointer [transform-style:preserve-3d] focus-visible:outline-none"
									style="transform: rotateY({rotation}deg); transition: transform {allowMotion
										? 620
										: 0}ms cubic-bezier(0.2, 0.85, 0.25, 1);"
									role="button"
									tabindex="0"
									aria-label="Draw another conversation card"
									onclick={drawCard}
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											drawCard();
										}
									}}
								>
									{@render cardFace(prompts[idxA], false)}
									{@render cardFace(prompts[idxB], true)}
								</div>
							</div>
						</div>

						<!-- controls -->
						<button
							type="button"
							onclick={drawCard}
							class="group mt-8 inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal-deep px-5 py-2.5 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.97]"
						>
							<ArrowsClockwiseIcon
								class="size-4 transition-transform duration-500 group-hover:rotate-180"
								weight="bold"
							/>
							Draw another
						</button>
						<p
							class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-dci-teal/50"
						>
							<HandTapIcon class="size-3.5" weight="duotone" />
							Tap the card to flip
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.dci-breathe {
		animation: dci-breathe 4.5s ease-in-out infinite;
		will-change: transform, opacity;
	}

	@keyframes dci-breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.85;
		}
		50% {
			transform: scale(1.12);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dci-breathe {
			animation: none;
		}
	}
</style>
