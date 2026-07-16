<script lang="ts">
	type Variant = 'care' | 'toolkit' | 'community';

	const illustrations: Record<Variant, { src: string; alt: string; width: number; height: number }> = {
		care: {
			src: '/illustrations/care-conversation-cutout.webp',
			alt: 'Illustration of two people using guided conversation tools',
			width: 1423,
			height: 879
		},
		toolkit: {
			src: '/illustrations/toolkit-handoff-cutout.webp',
			alt: 'Illustration of a person holding mental wellness toolkit cards',
			width: 1408,
			height: 926
		},
		community: {
			src: '/illustrations/community-circle-cutout.webp',
			alt: 'Illustration of people building a community support plan',
			width: 1395,
			height: 902
		}
	};

	let { variant = 'care', class: className = '' }: { variant?: Variant; class?: string } = $props();

	const illustration = $derived(illustrations[variant]);
</script>

<img
	src={illustration.src}
	alt={illustration.alt}
	width={illustration.width}
	height={illustration.height}
	class={className}
	loading="lazy"
	decoding="async"
/>
