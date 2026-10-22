import { SITE_URL, SITE_LASTMOD, PAGE_META } from '$lib/config/seo';

// Public, indexable routes. Auth pages are intentionally excluded.
const EXCLUDE = new Set(['/signin', '/signup']);
// Draft 1 pilot pages stay out of the sitemap (and carry noindex) until they have been reviewed.
// Remove these two lines, and the matching rule in +layout.svelte, to publish them to search.
const DRAFT_PREFIXES = ['/mental-models', '/support'];

export async function GET() {
	const paths = Object.keys(PAGE_META).filter(
		(p) => !EXCLUDE.has(p) && !DRAFT_PREFIXES.some((d) => p === d || p.startsWith(`${d}/`))
	);
	const urls = paths
		.map((path) => {
			const loc = `${SITE_URL}${path === '/' ? '' : path}`;
			const priority = path === '/' ? '1.0' : '0.7';
			return `	<url>
		<loc>${loc}</loc>
		<lastmod>${SITE_LASTMOD}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>${priority}</priority>
	</url>`;
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
