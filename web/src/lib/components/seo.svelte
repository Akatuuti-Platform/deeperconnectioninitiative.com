<script lang="ts">
	import { page } from '$app/state';
	import {
		metaForPath,
		SITE_URL,
		SITE_NAME,
		OG_IMAGE,
		TWITTER_HANDLE
	} from '$lib/config/seo';
	import { structuredDataFor } from '$lib/config/structured-data';

	// Derive metadata from the current route. Single source of truth for every
	// page's title / description / canonical / Open Graph / Twitter tags.
	let meta = $derived(metaForPath(page.url.pathname));
	let canonical = $derived(`${SITE_URL}${page.url.pathname === '/' ? '' : page.url.pathname}`);
	// JSON-LD structured data (Organization + WebSite + page + breadcrumbs).
	let jsonLd = $derived(structuredDataFor(page.url.pathname));
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_UG" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<!-- Structured data for rich results and AI answer engines -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
