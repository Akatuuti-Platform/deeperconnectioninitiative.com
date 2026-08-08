<script lang="ts">
	import { onMount } from 'svelte';

	let {
		images,
		alt,
		interval = 4200,
		showDots = true,
		class: className = ''
	}: {
		images: string[];
		alt: string;
		interval?: number;
		showDots?: boolean;
		class?: string;
	} = $props();

	let index = $state(0);
	// Broken images are dropped rather than shown as empty frames.
	let failed = $state<Set<number>>(new Set());
	// Rotation stays off until the client confirms motion is welcome.
	let rotating = $state(false);

	const usable = $derived(images.map((_, i) => i).filter((i) => !failed.has(i)));

	function onError(i: number) {
		const next = new Set(failed);
		next.add(i);
		failed = next;
		if (index === i) {
			const left = images.map((_, n) => n).filter((n) => !next.has(n));
			if (left.length) index = left[0];
		}
	}

	function show(i: number) {
		index = i;
	}

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		rotating = !motion.matches;

		let timer: ReturnType<typeof setInterval> | undefined;
		const start = () => {
			timer = setInterval(() => {
				if (motion.matches || document.visibilityState !== 'visible') return;
				const list = images.map((_, i) => i).filter((i) => !failed.has(i));
				if (list.length < 2) return;
				const at = list.indexOf(index);
				index = list[(at + 1) % list.length];
			}, interval);
		};
		start();

		const sync = () => (rotating = !motion.matches);
		motion.addEventListener('change', sync);
		return () => {
			if (timer) clearInterval(timer);
			motion.removeEventListener('change', sync);
		};
	});
</script>

<div class={`relative overflow-hidden bg-dci-cream ${className}`}>
	{#each images as src, i}
		<img
			{src}
			alt={i === index ? alt : ''}
			aria-hidden={i === index ? undefined : 'true'}
			loading="lazy"
			onerror={() => onError(i)}
			class="absolute inset-0 h-full w-full object-contain p-1 transition-opacity duration-700 ease-in-out"
			style:opacity={i === index ? 1 : 0}
		/>
	{/each}

	{#if showDots && usable.length > 1}
		<!-- Clickable, so the other photos are reachable even when auto-rotation
		     is off for reduced motion or a background tab. -->
		<div class="absolute inset-x-0 bottom-1 flex justify-center gap-1.5">
			{#each usable as i}
				<button
					type="button"
					onclick={() => show(i)}
					aria-label={`Show photo ${usable.indexOf(i) + 1} of ${usable.length}`}
					aria-current={i === index ? 'true' : undefined}
					class="group flex h-4 items-center px-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dci-teal"
				>
					<span
						class={`h-1 rounded-full transition-all duration-300 ${
							i === index
								? 'w-3 bg-dci-teal-deep/70'
								: 'w-1 bg-dci-teal-deep/25 group-hover:bg-dci-teal-deep/50'
						}`}
					></span>
				</button>
			{/each}
		</div>
	{/if}
</div>
