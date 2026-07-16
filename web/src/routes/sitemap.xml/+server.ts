import { SITE_URL, SITE_LASTMOD, PAGE_META } from '$lib/config/seo';

// Public, indexable routes. Auth pages are intentionally excluded.
const EXCLUDE = new Set(['/signin', '/signup']);

export async function GET() {
	const paths = Object.keys(PAGE_META).filter((p) => !EXCLUDE.has(p));
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
