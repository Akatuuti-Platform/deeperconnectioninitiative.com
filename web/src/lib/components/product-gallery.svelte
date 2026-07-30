<script lang="ts">
	import { CaretLeftIcon as CaretLeft, CaretRightIcon as CaretRight } from 'phosphor-svelte';

	let {
		images,
		alt,
		imgClass = '',
		dynamicAspect = false
	}: { images: string[]; alt: string; imgClass?: string; dynamicAspect?: boolean } = $props();

	let index = $state(0);
	// Aspect ratio of the currently shown photo, so containers can reshape to
	// fit the image instead of cropping it (only applied when dynamicAspect).
	let ratio = $state<number | null>(null);

	function onImgLoad(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		if (img.naturalWidth && img.naturalHeight) {
			ratio = img.naturalWidth / img.naturalHeight;
		}
	}

	function prev() {
		index = (index - 1 + images.length) % images.length;
	}
	function next() {
		index = (index + 1) % images.length;
	}
</script>

<div
	class="group/gallery relative h-full w-full overflow-hidden"
	style={dynamicAspect && ratio ? `aspect-ratio: ${ratio}; height: auto;` : ''}
>
	<!-- Blurred fill behind the photo, so uncropped images never sit on empty bars -->
	<img
		src={images[index]}
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
	/>
	<img
		src={images[index]}
		alt={index === 0 ? alt : `${alt}, photo ${index + 1} of ${images.length}`}
		loading="lazy"
		onload={onImgLoad}
		class={`relative z-10 h-full w-full object-contain transition-transform duration-700 group-hover/gallery:scale-[1.02] ${imgClass}`}
	/>

	{#if images.length > 1}
		<button
			type="button"
			aria-label="Previous photo"
			onclick={prev}
			class="absolute top-1/2 left-3 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-dci-paper/85 text-slate-800 opacity-0 shadow-sm backdrop-blur transition hover:bg-white focus-visible:opacity-100 group-hover/gallery:opacity-100 max-lg:opacity-100"
		>
			<CaretLeft class="size-4" weight="bold" />
		</button>
		<button
			type="button"
			aria-label="Next photo"
			onclick={next}
			class="absolute top-1/2 right-3 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-dci-paper/85 text-slate-800 opacity-0 shadow-sm backdrop-blur transition hover:bg-white focus-visible:opacity-100 group-hover/gallery:opacity-100 max-lg:opacity-100"
		>
			<CaretRight class="size-4" weight="bold" />
		</button>

		<div class="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5">
			{#each images as _, i}
				<span
					class={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/55'}`}
				></span>
			{/each}
		</div>
	{/if}
</div>
