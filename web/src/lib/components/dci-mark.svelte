<script lang="ts">
	import { onMount } from 'svelte';

	let {
		/** Strength of the scroll parallax in pixels. 0 disables it. */
		parallax = 26,
		class: className = ''
	}: { parallax?: number; class?: string } = $props();

	let wrapper: HTMLDivElement | undefined = $state();
	let offset = $state(0);
	// Motion stays off until the client confirms it is welcome, so the first
	// paint is always still and nothing moves for reduced-motion users.
	let allowMotion = $state(false);

	onMount(() => {
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		// Parallax is a desktop nicety: on small screens it costs more than it adds.
		const wideQuery = window.matchMedia('(min-width: 1024px)');

		let frame = 0;
		const update = () => {
			frame = 0;
			if (!wrapper || motionQuery.matches || !wideQuery.matches) {
				offset = 0;
				return;
			}
			const rect = wrapper.getBoundingClientRect();
			// -1 when the element sits below the fold, 1 when above it.
			const progress = 1 - (rect.top + rect.height / 2) / (window.innerHeight || 1) * 2;
			offset = Math.max(-1, Math.min(1, progress)) * parallax;
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		const sync = () => {
			allowMotion = !motionQuery.matches;
			update();
		};
		sync();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		motionQuery.addEventListener('change', sync);
		wideQuery.addEventListener('change', sync);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			motionQuery.removeEventListener('change', sync);
			wideQuery.removeEventListener('change', sync);
		};
	});
</script>

<div
	bind:this={wrapper}
	class={`dci-mark-parallax ${className}`}
	style={`transform: translate3d(0, ${offset}px, 0)`}
>
	<div class="dci-mark-float" class:dci-mark-animate={allowMotion}>
		<picture>
			<source
				type="image/avif"
				srcset="/photos/dci-mark-480.avif 480w, /photos/dci-mark-760.avif 760w, /photos/dci-mark-1040.avif 1040w"
				sizes="(min-width: 1024px) 42vw, (min-width: 640px) 20rem, 15rem"
			/>
			<img
				src="/photos/dci-mark-760.webp"
				srcset="/photos/dci-mark-480.webp 480w, /photos/dci-mark-760.webp 760w, /photos/dci-mark-1040.webp 1040w"
				sizes="(min-width: 1024px) 42vw, (min-width: 640px) 20rem, 15rem"
				width="956"
				height="1073"
				alt="The DCI mark: a head in profile built from layered geometric pattern. No hair, no gender, no name, because the person starting an honest conversation can be anyone."
				fetchpriority="high"
				decoding="sync"
				class="h-auto w-full select-none object-contain"
			/>
		</picture>
	</div>
</div>

<style>
	.dci-mark-parallax {
		/* Parallax offset is set inline; keep the change cheap for the compositor. */
		will-change: transform;
		transition: transform 120ms linear;
	}

	.dci-mark-float {
		transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* A slow, shallow drift so the mark breathes rather than sitting static. */
	.dci-mark-animate {
		animation: dci-mark-drift 9s ease-in-out infinite alternate;
	}

	@keyframes dci-mark-drift {
		from {
			transform: translate3d(0, -0.6%, 0);
		}
		to {
			transform: translate3d(0, 1.4%, 0);
		}
	}

	/* Hover lift, only on devices that actually hover. */
	@media (hover: hover) and (pointer: fine) {
		.dci-mark-parallax:hover .dci-mark-float {
			animation-play-state: paused;
			transform: scale(1.025) translate3d(0, -0.6%, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dci-mark-parallax,
		.dci-mark-float,
		.dci-mark-animate {
			animation: none;
			transition: none;
			transform: none !important;
		}
	}
</style>
