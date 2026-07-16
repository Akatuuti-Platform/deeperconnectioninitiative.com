// JSON-LD structured data. Emitted by the <Seo> component as
// <script type="application/ld+json">. This is what powers Google rich
// results AND how AI answer engines (ChatGPT, Perplexity, Google AI
// Overviews) reliably extract facts about the organisation.
//
// We emit a stable Organization + WebSite graph sitewide, plus a
// BreadcrumbList on every non-home page. Keeping it here means the schema
// stays in sync with PAGE_META instead of drifting in scattered head blocks.

import { SITE_URL, SITE_NAME, LEGAL_NAME, TWITTER_HANDLE, metaForPath, PAGE_META } from './seo';
import { siteConfig } from './site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/photos/dci-logo-mark.png`;

// The org's declared social presence. Feeds schema.org `sameAs` — a strong
// entity-recognition signal. Real profile URLs live in siteConfig.social;
// empty values are dropped so we never emit a broken link.
const SAME_AS = [
	TWITTER_HANDLE ? `https://twitter.com/${TWITTER_HANDLE.replace(/^@/, '')}` : null,
	siteConfig.social.instagram,
	siteConfig.social.linkedin,
	siteConfig.social.facebook
].filter((url): url is string => Boolean(url));

/** Sitewide Organization node. Referenced by @id from other nodes. */
function organizationNode() {
	return {
		'@type': ['Organization', 'NGO'],
		'@id': ORG_ID,
		name: LEGAL_NAME,
		alternateName: [SITE_NAME, 'DCI'],
		url: SITE_URL,
		logo: {
			'@type': 'ImageObject',
			url: LOGO_URL
		},
		image: `${SITE_URL}/og-image.png`,
		description: PAGE_META['/'].description,
		email: siteConfig.contacts.email,
		telephone: siteConfig.contacts.tele,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Acacia Avenue',
			addressLocality: 'Kampala',
			addressCountry: 'UG'
		},
		areaServed: 'UG',
		...(SAME_AS.length ? { sameAs: SAME_AS } : {})
	};
}

/** Sitewide WebSite node. */
function websiteNode() {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: SITE_URL,
		name: SITE_NAME,
		inLanguage: 'en',
		publisher: { '@id': ORG_ID }
	};
}

/** Human-readable crumb label for a path segment. */
function crumbName(pathname: string): string {
	// Prefer the page's own title, minus the " | Site Name" suffix.
	const title = metaForPath(pathname).title;
	return title.split('|')[0].trim();
}

/** BreadcrumbList for a non-home page: Home › Page. */
function breadcrumbNode(pathname: string) {
	const items = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: SITE_URL
		},
		{
			'@type': 'ListItem',
			position: 2,
			name: crumbName(pathname),
			item: `${SITE_URL}${pathname}`
		}
	];
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items
	};
}

/** The current page node, typed by route where it adds meaning. */
function pageNode(pathname: string) {
	const meta = metaForPath(pathname);
	const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

	// Route-specific @type sharpens what the page *is* for search + AI.
	const typeByPath: Record<string, string> = {
		'/contact': 'ContactPage',
		'/events': 'CollectionPage',
		'/trainings': 'CollectionPage',
		'/toolkit': 'CollectionPage'
	};

	return {
		'@type': typeByPath[pathname] ?? 'WebPage',
		'@id': `${url}/#webpage`,
		url,
		name: meta.title,
		description: meta.description,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': ORG_ID },
		inLanguage: 'en'
	};
}

/**
 * Build the full JSON-LD @graph for a given path. Returns a stringified
 * object ready to drop inside a <script type="application/ld+json"> tag.
 */
export function structuredDataFor(pathname: string): string {
	const graph: Record<string, unknown>[] = [organizationNode(), websiteNode(), pageNode(pathname)];

	if (pathname !== '/') {
		graph.push(breadcrumbNode(pathname));
	}

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': graph
	});
}

// --- Page-specific item schema -------------------------------------------
// These take data already rendered on a page and emit matching schema.org
// nodes. Structured data MUST mirror visible content, so pages pass their
// own arrays in rather than duplicating the data here.

// Kampala runs on East Africa Time; stamp the naive local datetimes so the
// Event times are unambiguous absolute instants.
const EAT = '+03:00';

export type EventInput = {
	title: string;
	description: string;
	url: string;
	startDate: string;
	endDate: string;
	location: string;
};

function attendanceMode(location: string): string {
	const l = location.toLowerCase();
	if (l.includes('hybrid')) return 'https://schema.org/MixedEventAttendanceMode';
	if (l.includes('online') || l.includes('virtual'))
		return 'https://schema.org/OnlineEventAttendanceMode';
	return 'https://schema.org/OfflineEventAttendanceMode';
}

/** JSON-LD @graph of Event nodes for a list of events shown on a page. */
export function eventsStructuredData(events: EventInput[]): string {
	const graph = events.map((e) => ({
		'@type': 'Event',
		name: e.title,
		description: e.description,
		startDate: `${e.startDate}${EAT}`,
		endDate: `${e.endDate}${EAT}`,
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: attendanceMode(e.location),
		location: {
			'@type': 'Place',
			name: e.location,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Kampala',
				addressCountry: 'UG'
			}
		},
		organizer: { '@id': ORG_ID },
		url: `${SITE_URL}${e.url}`
	}));

	return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export type CourseInput = {
	name: string;
	subtitle: string;
	price?: string;
	duration?: string;
	bestFor?: string;
};

/** Extract a numeric amount + currency from strings like "UGX 500,000". */
function parsePrice(price?: string): { amount: string; currency: string } | null {
	if (!price) return null;
	const m = price.match(/([A-Z]{3})?\s*([\d,]+)/);
	if (!m) return null;
	return { currency: m[1] ?? 'UGX', amount: m[2].replace(/,/g, '') };
}

/** Turn "3-day training" into an ISO 8601 duration ("P3D"). */
function parseWorkload(duration?: string): string | null {
	const m = duration?.match(/(\d+)\s*-?\s*day/i);
	return m ? `P${m[1]}D` : null;
}

/** JSON-LD @graph of Course nodes for the training tiers shown on a page. */
export function coursesStructuredData(tiers: CourseInput[]): string {
	const graph = tiers.map((t) => {
		const price = parsePrice(t.price);
		const workload = parseWorkload(t.duration);

		const instance: Record<string, unknown> = {
			'@type': 'CourseInstance',
			courseMode: 'Onsite'
		};
		if (workload) instance.courseWorkload = workload;

		const node: Record<string, unknown> = {
			'@type': 'Course',
			name: `${t.name} — ${t.subtitle}`,
			description: t.bestFor
				? `${t.subtitle}. Best for ${t.bestFor}.`
				: t.subtitle,
			provider: { '@id': ORG_ID },
			url: `${SITE_URL}/trainings`,
			hasCourseInstance: instance
		};

		if (price) {
			node.offers = {
				'@type': 'Offer',
				price: price.amount,
				priceCurrency: price.currency,
				category: 'Paid',
				url: `${SITE_URL}/trainings`,
				availability: 'https://schema.org/InStock'
			};
		}

		return node;
	});

	return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}
