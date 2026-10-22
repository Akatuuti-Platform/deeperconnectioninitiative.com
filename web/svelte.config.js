import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV !== 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({ runtime: 'nodejs22.x' }),
		alias: {
			"@/*": "./src/*",
		},
		// Content Security Policy. SvelteKit adds nonces to its own scripts. The allow-list
		// matches what the site actually loads: Google Fonts, YouTube (no-cookie) embeds and
		// thumbnails, Cloudflare Turnstile, and Vercel Analytics (same-origin in production).
		// form-action is deliberately not set: checkout redirects to Flutterwave after a POST.
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				// The hash allows only Svelte's own event-replay snippet, this.__e=event, which it renders on
				// images with load or error handlers. No other inline script is allowed.
				'script-src': [
					'self',
					'unsafe-hashes',
					'sha256-7dQwUgLau1NFCCGjfn9FsYptB6ZtWxJin6VohGIu20I=',
					'https://challenges.cloudflare.com',
					...(dev ? ['https://va.vercel-scripts.com'] : [])
				],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'blob:', 'https://i.ytimg.com'],
				'frame-src': ['https://www.youtube-nocookie.com', 'https://challenges.cloudflare.com'],
				'connect-src': ['self', 'https://challenges.cloudflare.com', ...(dev ? ['ws:', 'wss:', 'https://va.vercel-scripts.com'] : [])],
				'object-src': ['none'],
				'base-uri': ['self'],
				'frame-ancestors': ['self']
			}
		},
	}
};

export default config;
