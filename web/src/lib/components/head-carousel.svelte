<script lang="ts">
	import { onMount } from 'svelte';
	import { CaretLeftIcon as CaretLeft, CaretRightIcon as CaretRight } from 'phosphor-svelte';

	export type CarouselImage = {
		src: string;
		alt: string;
		/** CSS object-position, to keep the subject inside the silhouette. */
		position?: string;
	};

	let {
		images,
		interval = 5500,
		label = 'Moments from the DCI community',
		class: className = ''
	}: {
		images: CarouselImage[];
		/** Milliseconds each slide is held. */
		interval?: number;
		label?: string;
		class?: string;
	} = $props();

	let index = $state(0);
	let paused = $state(false);
	// Images that failed to load are skipped rather than shown as broken frames.
	let failed = $state<Set<number>>(new Set());
	// Motion is off until the client confirms the user has not asked to reduce it,
	// so the first paint is always still.
	let allowMotion = $state(false);

	const usable = $derived(images.map((_, i) => i).filter((i) => !failed.has(i)));
	const allFailed = $derived(usable.length === 0);

	function go(direction: 1 | -1) {
		if (usable.length < 2) return;
		const at = usable.indexOf(index);
		const next = usable[(at + direction + usable.length) % usable.length];
		index = next;
	}

	function onError(i: number) {
		const next = new Set(failed);
		next.add(i);
		failed = next;
		// If the broken image was on screen, move to the next usable one.
		if (index === i) {
			const remaining = images.map((_, n) => n).filter((n) => !next.has(n));
			if (remaining.length > 0) index = remaining[0];
		}
	}

	onMount(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		allowMotion = !query.matches;

		const sync = () => (allowMotion = !query.matches);
		query.addEventListener('change', sync);

		// Auto-advance only when motion is welcome and the user is not interacting.
		let timer: ReturnType<typeof setInterval> | undefined;
		const start = () => {
			timer = setInterval(() => {
				if (!paused && !query.matches && document.visibilityState === 'visible') go(1);
			}, interval);
		};
		start();

		return () => {
			query.removeEventListener('change', sync);
			if (timer) clearInterval(timer);
		};
	});
</script>

<div
	class={`dci-head-frame relative ${className}`}
	role="region"
	aria-roledescription="carousel"
	aria-label={label}
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
>
	<div
		class="dci-head-mask relative aspect-[478/536] w-full overflow-hidden bg-dci-teal-deep"
	>
		{#if allFailed}
			<!-- Every image failed: fall back to the brand mark so the shape still reads. -->
			<div
				class="flex h-full w-full items-center justify-center bg-gradient-to-br from-dci-teal-deep via-dci-teal to-dci-burgundy"
			>
				<img
					src="/photos/dci-logo-mark.png"
					alt=""
					class="h-2/5 w-auto opacity-70"
					loading="lazy"
				/>
			</div>
		{:else}
			{#each images as image, i}
				<img
					src={image.src}
					alt={i === index ? image.alt : ''}
					aria-hidden={i === index ? undefined : 'true'}
					width="1100"
					height="733"
					loading={i === 0 ? 'eager' : 'lazy'}
					fetchpriority={i === 0 ? 'high' : 'low'}
					decoding={i === 0 ? 'sync' : 'async'}
					onerror={() => onError(i)}
					style={image.position ? `object-position:${image.position}` : undefined}
					class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
					class:opacity-100={i === index}
					class:opacity-0={i !== index}
					class:dci-kenburns={allowMotion && i === index}
					class:dci-kenburns-alt={allowMotion && i === index && i % 2 === 1}
				/>
			{/each}
		{/if}

		<!-- Warm wash: keeps faces readable against cream page and ties the frame to the palette. -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-dci-teal-deep/45 via-transparent to-transparent"
		></div>
	</div>

	{#if usable.length > 1}
		<!-- Controls sit below the silhouette so they never cover the artwork. -->
		<div class="mt-5 flex items-center justify-center gap-3">
			<button
				type="button"
				onclick={() => go(-1)}
				aria-label="Previous image"
				class="flex size-9 items-center justify-center rounded-full border border-dci-teal/15 bg-dci-paper/90 text-dci-teal-deep shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dci-teal"
			>
				<CaretLeft class="size-4" weight="bold" />
			</button>

			<div class="flex items-center gap-1.5" role="tablist" aria-label="Choose image">
				{#each images as image, i}
					{#if !failed.has(i)}
						<button
							type="button"
							role="tab"
							aria-selected={i === index}
							aria-label={image.alt}
							onclick={() => (index = i)}
							class={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dci-teal ${
								i === index ? 'w-6 bg-dci-teal-deep' : 'w-1.5 bg-dci-teal-deep/30 hover:bg-dci-teal-deep/50'
							}`}
						></button>
					{/if}
				{/each}
			</div>

			<button
				type="button"
				onclick={() => go(1)}
				aria-label="Next image"
				class="flex size-9 items-center justify-center rounded-full border border-dci-teal/15 bg-dci-paper/90 text-dci-teal-deep shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dci-teal"
			>
				<CaretRight class="size-4" weight="bold" />
			</button>
		</div>

		<!-- Screen readers get the slide change without the visual carousel. -->
		<p class="sr-only" aria-live="polite">
			Image {usable.indexOf(index) + 1} of {usable.length}: {images[index]?.alt}
		</p>
	{/if}
</div>

<style>
	/*
		The head silhouette, extracted from the alpha channel of the DCI mark
		(static/photos/head-motif.png) so the shape is the brand mark exactly.
		Swap /masks/dci-head.png to change the shape everywhere at once.
		Its intrinsic ratio is 478x536, which the hero container mirrors.
	*/
	.dci-head-mask {
		-webkit-mask-image: url('/masks/dci-head.png');
		mask-image: url('/masks/dci-head.png');
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
	}

	/* Ken Burns: slow enough to feel alive, small enough not to pull focus. */
	.dci-kenburns {
		animation: dci-kenburns 22s ease-in-out infinite alternate;
		will-change: transform;
	}

	.dci-kenburns-alt {
		animation-name: dci-kenburns-alt;
	}

	@keyframes dci-kenburns {
		from {
			transform: scale(1.04) translate3d(0, 0, 0);
		}
		to {
			transform: scale(1.12) translate3d(-1.5%, -1.5%, 0);
		}
	}

	@keyframes dci-kenburns-alt {
		from {
			transform: scale(1.12) translate3d(1.5%, -1%, 0);
		}
		to {
			transform: scale(1.04) translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dci-kenburns,
		.dci-kenburns-alt {
			animation: none;
		}
	}
</style>
