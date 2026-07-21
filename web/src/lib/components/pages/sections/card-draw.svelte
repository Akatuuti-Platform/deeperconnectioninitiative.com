<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import { paymentLinks } from '$lib/payment-links';
	import {
		CardsIcon,
		ArrowsClockwiseIcon,
		ArrowUpRightIcon
	} from 'phosphor-svelte';

	const prompts = [
		'What are you using to get through a normal Tuesday — and is it actually working?',
		'Who was the last person you told the whole truth to, and how did it feel?',
		'What emotion do you feel most often but almost never say out loud?',
		'If someone really knew you, what would surprise them most?',
		'What did you need to hear as a child that no one ever said?',
		'What is the hardest thing you have forgiven yourself for?',
		'When was the last time you felt genuinely safe with another person?',
		'What conversation are you avoiding right now, and why?',
		'What would your younger self think about the life you are living?',
		'What would change if you stopped pretending to be fine?'
	];

	let currentIndex = $state(0);
	let drawKey = $state(0);
	let allowMotion = $state(false);

	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function drawCard() {
		let next: number;
		do {
			next = Math.floor(Math.random() * prompts.length);
		} while (next === currentIndex && prompts.length > 1);
		currentIndex = next;
		drawKey++;
	}
</script>

<section id="card-draw" class="w-full bg-dci-cream relative z-10 overflow-hidden">
	<div
		use:reveal={{ delay: 80, y: 22 }}
		class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6"
	>
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
						<CardsIcon class="size-3.5" weight="duotone" />
						Draw a card
					</div>
					<h3 class="max-w-md text-3xl sm:text-4xl font-semibold leading-tight text-white">
						Start a conversation people actually want to have.
					</h3>
					<p class="mt-4 max-w-md text-base leading-relaxed text-dci-cream/72">
						Every DCI conversation card carries a real prompt — not a therapy
						question, just an honest one. Draw one and see what surfaces.
					</p>
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

				<!-- Right panel: interactive card -->
				<div class="relative overflow-hidden bg-dci-cream p-8 sm:p-10 lg:p-12">
					<div class="flex flex-col items-center justify-center min-h-[22rem]">
						<!-- Decorative stacked cards behind -->
						<div class="relative w-full max-w-sm">
							<div
								class="absolute top-2 left-2 right-2 h-full rounded-2xl border border-dci-teal/8 bg-dci-sand/60 -rotate-2"
								aria-hidden="true"
							></div>
							<div
								class="absolute top-1 left-1 right-1 h-full rounded-2xl border border-dci-teal/10 bg-dci-sand/80 rotate-1"
								aria-hidden="true"
							></div>

							<!-- Active card -->
							{#key drawKey}
								<div
									class="relative rounded-2xl border border-dci-teal/15 bg-white p-8 shadow-[0_16px_50px_-30px_rgba(26,60,64,0.4)]"
									in:fly={allowMotion ? { y: 30, duration: 350 } : { y: 0, duration: 0 }}
								>
									<CardsIcon
										class="size-6 text-dci-burgundy/60 mb-5"
										weight="duotone"
									/>
									<p class="text-lg sm:text-xl font-medium leading-relaxed text-slate-900 min-h-[5rem]">
										&ldquo;{prompts[currentIndex]}&rdquo;
									</p>
									<p class="mt-5 text-xs font-semibold uppercase tracking-widest text-dci-teal/50">
										DCI Conversation Card
									</p>
								</div>
							{/key}
						</div>

						<!-- Draw button -->
						<button
							type="button"
							onclick={drawCard}
							class="mt-6 inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal-deep px-5 py-2.5 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.97]"
						>
							<ArrowsClockwiseIcon class="size-4" weight="bold" />
							Draw another
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
