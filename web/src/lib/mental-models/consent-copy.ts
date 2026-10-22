// ALL consent and privacy wording for the Mental Models Scorecard lives in this one file, so it
// can be reviewed by counsel in one place. Change wording here only. When anything here changes,
// bump CONSENT_VERSION in version.ts: every consent record stores the version the person saw.
//
// STATUS: DRAFT FOR LEGAL REVIEW. Known review points:
//  - Unlocking the full report is tied to opting in to a reminder. Check this is "freely given"
//    consent; the same content stays readable without email on the public Model pages.
//  - 18 or older only for contact details; under-18s get the free parts and the Model pages.
//  - Processors and cross-border transfers (Convex in Ireland, Resend, Vercel, Cloudflare).

export const UNAVAILABLE = 'Not available right now. Nothing has been stored.';

export const UNLOCK = {
	heading: 'Keep noticing: unlock your full report',
	intro: 'Add your email to read the rest of your report now. We use it only for what you tick below.',
	choices: {
		followUp: 'Remind me in 90 days to retake it and see what has changed',
		dailyCheck: 'Email me the free 14-day check, and check in once after 14 days',
		productInfo: 'Tell me about the DCI Mood Tracker, once',
		rememberResult: (modelName: string) => `Also remind me what my result was (${modelName}). This keeps your result next to your email until the reminder.`
	},
	emailLabel: 'Email',
	firstNameLabel: 'First name (optional)',
	adult: 'I am 18 or older',
	under18: 'Under 18? You can read every Model in full on its own page, without giving any details.',
	notice:
		'We use your email only for what you tick, delete it within 12 months at most, and never share or sell it. Every email has a link to stop and delete your details.',
	noticeLink: 'How we handle your data',
	submit: 'Unlock my report',
	sent: 'Your report is unlocked below. Check your email and press the link to confirm your reminders. Nothing is sent until you do.',
	chooseOne: 'Choose at least one thing you would like from us.'
};

export const COUNT = {
	heading: 'Count my result, anonymously',
	body: 'Helps DCI see which patterns are common, so support goes where it is needed. We add one to a tally. Nothing that identifies you is kept, and groups smaller than 10 are never reported.',
	includeState: 'Also count how I said the pressure was today',
	submit: 'Count my result',
	done: 'Counted. Thank you.'
};

export const FEEDBACK = {
	heading: 'Help us improve this, if you like',
	intro:
		'This is a first draft and we are testing it. Anonymous feedback is optional. We do not ask for your name or email, and nothing from your result is sent unless you tick it below.',
	includeState: 'Also include how I said the pressure was today',
	includeHardest: 'Also include what I said feels hardest about letting someone see'
};

export const DEVICE = {
	heading: 'Your result is private',
	body: 'Your answers stayed in this page and were not sent anywhere. Close the page and they are gone. If you want to find your result again, you can keep it on this device only.',
	label: 'Keep my Model on this device (not my answers, not how I said I was feeling)'
};

/** The scorecard privacy notice at /mental-models/privacy, section by section. */
export const PRIVACY_NOTICE: { heading: string; paragraphs?: string[]; bullets?: string[] }[] = [
	{
		heading: 'Taking the scorecard',
		paragraphs: [
			'Your answers and your result stay in your browser. They are not sent to us. Close the page and they are gone, unless you choose "Keep my Model on this device", which saves only the name of your Model in your own browser. You can delete it from the scorecard page.'
		]
	},
	{
		heading: 'What we keep, only if you choose',
		bullets: [
			'Anonymous counts. If you press "Count my result", we add one to a tally for your Models (and, only if you give them, an age band, a region, and how the pressure was that day). We store the week, never the time, and nothing that identifies you. Groups smaller than 10 are never reported.',
			'Reminders and your full report (18 or older only). Your email, an optional first name, the reminders you ticked, and a record of your consent. Your result is kept only if you tick "remind me what my result was". Nothing is sent until you confirm by email.',
			'Anonymous feedback. What you write in the feedback box, sent to our team by email without your name or email address.',
			'Usage counts. We count how many people open, finish or share the scorecard each day. No identifier is kept, and no cookies are used.'
		]
	},
	{
		heading: 'Why, and on what basis',
		paragraphs: [
			'We use these only for what you chose: to send your reminders, and to understand, in aggregate, how people respond to stress so support can go where it is needed. We rely on your consent, which you can withdraw at any time. We never sell or share your details for marketing.'
		]
	},
	{
		heading: 'How long we keep it',
		bullets: [
			'Unconfirmed requests: deleted after 7 days.',
			'Contacts: deleted 30 days after your last reminder, or 12 months after you confirm, or when you stop, whichever comes first.',
			'Consent records: kept for 24 months as proof of what you agreed to. They hold a scrambled marker of your email, not the email itself.',
			'Anonymous counts: kept, because they cannot identify anyone.',
			'Our providers keep backups for a limited time, so deleted data can remain in a backup until it expires.'
		]
	},
	{
		heading: 'Who processes it for us',
		paragraphs: [
			'Convex (database, hosted in the European Union, in Ireland), Resend (sending email), Vercel (hosting this website and cookieless usage counts) and Cloudflare (website security). Some of these process data outside Uganda. We use them only to provide this service.'
		]
	},
	{
		heading: 'Your rights',
		paragraphs: [
			"You can ask to see, correct or delete your details, and you can withdraw consent at any time using the link in any email or by contacting us. You can also complain to Uganda's Personal Data Protection Office."
		]
	},
	{
		heading: 'This is not a clinical service',
		paragraphs: [
			'The scorecard is a reflection tool, not a diagnosis, and DCI does not provide clinical care or emergency support. Please do not send clinical or crisis details through these forms.'
		]
	}
];
