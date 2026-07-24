<script lang="ts">
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { reveal } from '$lib/actions/reveal';
	import { PlayIcon, XIcon } from 'phosphor-svelte';

	let showVideo = $state(false);
	let closeButton = $state<HTMLButtonElement | null>(null);

	const videoId = 'wMUYQ6uZn0Q';

	const affiliations = [
		'UPFMH',
		'Butabika National Referral Hospital',
		'Ministry of Education Uganda'
	];

	const fadeDuration = () =>
		browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160;

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') showVideo = false;
	}

	// While the lightbox is open, lock background scroll and move focus into it.
	$effect(() => {
		if (!browser) return;
		if (showVideo) {
			document.body.style.overflow = 'hidden';
			closeButton?.focus();
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={onKeydown} />

<section id="founder" class="w-full bg-white relative z-10 overflow-hidden">
	<div
		class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid md:grid-cols-[0.92fr_1.08fr] gap-y-14 gap-x-12 lg:gap-x-16 items-center"
	>
		<div class="relative isolate w-full max-w-md md:mx-0 mx-auto" use:reveal={{ delay: 0, y: 18 }}>
			<!-- Offset backing panel grounds the frame so it reads as composed, not floating -->
			<div
				class="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-[92%] w-[88%] rounded-[2.25rem] bg-dci-clay/15"
				aria-hidden="true"
			></div>

			<div
				class="relative overflow-hidden rounded-[2rem] border-[6px] border-dci-cream bg-dci-cream shadow-dci-teal"
			>
				<img
					src="/photos/ann-banya.jpg"
					alt="Ann Banya, Early Child Development Specialist"
					loading="lazy"
					class="aspect-[4/5] w-full object-cover object-top"
				/>
			</div>

			<!-- Caption plaque ties the name to the face and anchors the frame's lower edge -->
			<div
				class="absolute -bottom-5 right-4 max-w-[15rem] rounded-2xl border border-dci-sand bg-dci-paper/95 px-5 py-3 shadow-dci-soft backdrop-blur-sm"
			>
				<p class="font-semibold text-slate-900">Ann Banya</p>
				<p class="mt-0.5 text-sm leading-snug text-dci-teal">
					Early Child Development Specialist &middot; 40+ years
				</p>
			</div>
		</div>

		<div class="space-y-5" use:reveal={{ delay: 120, y: 18 }}>
			<div
				class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
			>
				<span class="text-xs font-semibold tracking-wide text-dci-teal uppercase"
					>Recognised infrastructure</span
				>
			</div>

			<h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
				40+ years of experience started this journey
			</h2>

			<p class="text-base leading-relaxed text-slate-700">
				DCI is built on clinical-grade depth, not an emerging idea. Every toolkit, clinic, and
				training carries decades of behavioural-health experience behind it.
			</p>

			<button
				type="button"
				onclick={() => (showVideo = true)}
				class="group inline-flex items-center gap-3 rounded-full border border-dci-teal/25 bg-dci-cream/60 py-1.5 pr-5 pl-1.5 text-left transition hover:border-dci-teal/40 hover:bg-dci-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dci-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white"
			>
				<span
					class="flex size-9 items-center justify-center rounded-full bg-dci-teal-deep text-dci-cream transition group-hover:scale-105"
				>
					<PlayIcon class="size-4 ml-0.5" weight="fill" />
				</span>
				<span class="text-sm font-semibold text-dci-teal-deep">Watch her story</span>
			</button>

			<div class="pt-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
					Trusted alongside
				</p>
				<ul class="flex flex-wrap gap-2">
					{#each affiliations as name}
						<li
							class="rounded-full border border-dci-sand bg-dci-cream/60 px-4 py-1.5 text-sm font-medium text-slate-800"
						>
							{name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	{#if showVideo}
		<!-- Video lightbox: kept separate from the portrait so the photo and film stand on their own -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-dci-teal-deep/80 p-4 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			aria-label="Ann Banya — video"
			transition:fade={{ duration: fadeDuration() }}
		>
			<button
				type="button"
				class="absolute inset-0 h-full w-full cursor-default"
				aria-label="Close video"
				onclick={() => (showVideo = false)}
			></button>

			<button
				bind:this={closeButton}
				type="button"
				onclick={() => (showVideo = false)}
				aria-label="Close video"
				class="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-full border border-dci-cream/30 bg-dci-cream/10 text-dci-cream transition hover:bg-dci-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dci-cream/70"
			>
				<XIcon class="size-5" weight="bold" />
			</button>

			<div class="relative z-10 w-full max-w-4xl">
				<div class="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-dci-panel">
					<iframe
						src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
						title="Ann Banya — Deeper Connection Initiative"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="h-full w-full"
					></iframe>
				</div>
			</div>
		</div>
	{/if}
</section>
