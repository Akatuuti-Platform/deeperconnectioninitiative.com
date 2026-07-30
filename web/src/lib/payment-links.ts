// Internal checkout routes. Each one collects the buyer's details, creates a
// Flutterwave payment server-side (see $lib/server/flutterwave.ts), and
// redirects to Flutterwave's hosted payment page.
export const paymentLinks = {
	toolkit: '/checkout/toolkit',
	tShirt: '/checkout/t-shirt',
	cardGame: '/checkout/card-game',
	moodTracker: '/checkout/mood-tracker',
	journal: '/checkout/journal',
	certifications: {
		foundationLevelCommunityChampionCertification: '/checkout/cert-foundation',
		advancedLevelInstitutionalChampionCertification: '/checkout/cert-advanced',
		masterTrainerCertification: '/checkout/cert-master'
	},
	donation: '/checkout/donate'
};
