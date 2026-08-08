import { cardGamePhotos, journalPhotos, moodTrackerPhotos } from './product-photos';

/**
 * The three toolkit products, for places that show them inline.
 *
 * Prices here are for display only. The amount actually charged comes from the
 * server catalog in lib/server/flutterwave.ts, so a wrong number here cannot
 * change what a buyer pays, only what they are told.
 */
export type ToolkitProduct = {
	/** Matches the slug in the server catalog, so the drawer posts to the
	 *  right checkout action. */
	slug: string;
	name: string;
	price: string;
	miles: string;
	line: string;
	photos: string[];
};

export const toolkitProducts: ToolkitProduct[] = [
	{
		slug: 'card-game',
		name: 'DCI Card Game',
		price: '69,000 UGX',
		miles: '8 Miles',
		line: 'Sixty questions that open a conversation, with friends, family or a group.',
		photos: cardGamePhotos
	},
	{
		slug: 'journal',
		name: 'Reflection Journal',
		price: '100,000 UGX',
		miles: '1 Mile',
		line: 'A year of guided pages that trace where your patterns came from.',
		photos: journalPhotos
	},
	{
		slug: 'mood-tracker',
		name: 'Mood Tracker',
		price: '31,000 UGX',
		miles: '1 Mile',
		line: 'One colour a day, twelve months to a page you can read at a glance.',
		photos: moodTrackerPhotos
	}
];
