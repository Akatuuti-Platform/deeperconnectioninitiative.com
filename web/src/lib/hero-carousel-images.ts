import type { CarouselImage } from '$lib/components/head-carousel.svelte';

/**
 * Images shown inside the head silhouette in the homepage hero.
 *
 * To change them: drop new files into `static/photos/` and edit this list.
 * The first entry loads eagerly and sets the hero's largest contentful paint,
 * so it should be the strongest and best-compressed image.
 *
 * Alt text is read aloud and shown in the carousel's live region, so write it
 * as a description of the moment, not as a filename.
 */
export const heroCarouselImages: CarouselImage[] = [
	{
		src: '/photos/events/event-6.jpg',
		alt: 'Three women in conversation around a table at a DCI Conversation Clinic',
		position: '68% 40%'
	},
	{
		src: '/photos/events/event-4.jpg',
		alt: 'Community members sharing the DCI toolkit at an outdoor gathering',
		position: '45% 35%'
	},
	{
		src: '/photos/events/event-8.jpg',
		alt: 'Students seated together during a DCI session at their school',
		position: '55% 45%'
	},
	{
		src: '/photos/events/event-1.jpg',
		alt: 'The DCI Reflection Journal resting outdoors',
		position: '50% 45%'
	}
];
