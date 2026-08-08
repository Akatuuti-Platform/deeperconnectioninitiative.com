import { cardGamePhotos, journalPhotos, moodTrackerPhotos } from './product-photos';
import { paymentLinks } from './payment-links';

/**
 * The three toolkit products, for places that show them inline.
 *
 * Prices here are for display only. The amount actually charged comes from the
 * server catalog in lib/server/flutterwave.ts, so a wrong number here cannot
 * change what a buyer pays, only what they are told.
 */
export type ToolkitProduct = {
	name: string;
	price: string;
	miles: string;
	line: string;
	photo: string;
	href: string;
};

export const toolkitProducts: ToolkitProduct[] = [
	{
		name: 'DCI Card Game',
		price: '69,000 UGX',
		miles: '8 Miles',
		line: 'Sixty questions that open a conversation, with friends, family or a group.',
		photo: cardGamePhotos[0],
		href: paymentLinks.cardGame
	},
	{
		name: 'Reflection Journal',
		price: '100,000 UGX',
		miles: '1 Mile',
		line: 'A year of guided pages that trace where your patterns came from.',
		photo: journalPhotos[0],
		href: paymentLinks.journal
	},
	{
		name: 'Mood Tracker',
		price: '31,000 UGX',
		miles: '1 Mile',
		line: 'One colour a day, twelve months to a page you can read at a glance.',
		photo: moodTrackerPhotos[0],
		href: paymentLinks.moodTracker
	}
];
