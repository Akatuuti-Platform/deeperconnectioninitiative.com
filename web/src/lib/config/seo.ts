// Central SEO metadata. One entry per route; the <Seo> component reads the
// current pathname and emits title / description / canonical / OG / Twitter.
// Keeps all page metadata in one place instead of scattered <svelte:head> blocks.

export const SITE_URL = 'https://deeperconnectioninitiative.com';
// Public-facing brand name.
export const SITE_NAME = 'DCI Wellness';
// Registered legal entity name (used in structured data / legal pages).
export const LEGAL_NAME = 'Deeper Connection Initiative';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_HANDLE = '@dci_wellness';
// Date of the last meaningful content update. Bump when pages change
// substantially so the sitemap's <lastmod> stays honest for crawlers.
export const SITE_LASTMOD = '2026-07-14';

export type PageMeta = { title: string; description: string };

const SUFFIX = ` | ${SITE_NAME}`;

export const DEFAULT_META: PageMeta = {
	title: `${SITE_NAME} | Mental Health Tools for Self-Led Healing`,
	description:
		'A mental health initiative helping individuals and communities build emotional strength through tactile toolkits, guided reflection, storytelling, and community connection.'
};

export const PAGE_META: Record<string, PageMeta> = {
	'/': DEFAULT_META,
	'/champions': {
		title: `Become a Community Champion${SUFFIX}`,
		description:
			'Train through the DCI Training of Trainers to run Conversation Clinics, hold space, and monitor community wellbeing. Become the infrastructure in your community.'
	},
	'/partners': {
		title: `For Organisations${SUFFIX}`,
		description:
			'Give your school, company, or NGO a system for wellbeing: Community Champions, toolkits, and an Early Warning System that moves support before a crisis.'
	},
	'/performance': {
		title: `Performance Blueprint™${SUFFIX}`,
		description:
			'Coaching for founders and leaders winning on the outside and fighting themselves on the inside. Rebuild the systems beneath how you think, recover, and lead.'
	},
	'/platform': {
		title: `Early Warning System — Coming Soon${SUFFIX}`,
		description:
			'Log in, check your Connection Miles, and follow your community’s Early Warning System. Coming soon.'
	},
	'/toolkit': {
		title: `The DCI Toolkit${SUFFIX}`,
		description:
			'Physical tools for reflection, conversation, and emotional awareness: the Card Game, Reflection Journal, Mood Tracker, and full toolkit.'
	},
	'/connection-miles': {
		title: `Connection Miles${SUFFIX}`,
		description:
			'Track how sponsored toolkits, Conversation Clinics, and mood check-ins build measurable Connection Miles. One mile equals one life meaningfully impacted.'
	},
	'/events': {
		title: `Events & Clinics${SUFFIX}`,
		description:
			'Conversation clinics, facilitator orientations, and toolkit demos. Places to practice connection in real life, and host a DCI session of your own.'
	},
	'/trainings': {
		title: `Training of Trainers${SUFFIX}`,
		description:
			'DCI certifications equip community champions, institutions, and trainers to facilitate grounded mental health conversations with clear referral boundaries.'
	},
	'/volunteering': {
		title: `Volunteer with DCI${SUFFIX}`,
		description:
			'Help create warm, grounded, practical spaces where people can talk, reflect, and find the next right support. Join DCI as a volunteer.'
	},
	'/contact': {
		title: `Contact${SUFFIX}`,
		description:
			'Reach out about toolkits, clinics, trainings, partnerships, or responsible mental health referrals. We follow up with care.'
	},
	'/signin': {
		title: `Sign In${SUFFIX}`,
		description: 'Sign in to continue your DCI work.'
	},
	'/signup': {
		title: `Create a Profile${SUFFIX}`,
		description: 'Create your DCI Wellness profile as a Champion, volunteer, partner, or supporter.'
	},
	'/privacy': {
		title: `Privacy Policy${SUFFIX}`,
		description: 'How Deeper Connection Initiative collects, uses, and protects your personal information.'
	},
	'/terms': {
		title: `Terms of Service${SUFFIX}`,
		description: 'The terms that govern your use of the Deeper Connection Initiative website and services.'
	},
	'/accessibility': {
		title: `Accessibility Statement${SUFFIX}`,
		description: 'Our commitment to making Deeper Connection Initiative usable for everyone, and how to reach us about access barriers.'
	}
};

export function metaForPath(pathname: string): PageMeta {
	return PAGE_META[pathname] ?? DEFAULT_META;
}
