import { browser } from '$app/environment';

type RevealOptions = {
	delay?: number;
	y?: number;
	once?: boolean;
};

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (!browser) return;

	let observer: IntersectionObserver | undefined;

	function setup(nextOptions: RevealOptions) {
		observer?.disconnect();

		node.style.setProperty('--reveal-delay', `${nextOptions.delay ?? 0}ms`);
		node.style.setProperty('--reveal-y', `${nextOptions.y ?? 22}px`);
		node.dataset.reveal = 'ready';

		if (prefersReducedMotion()) {
			node.dataset.revealed = 'true';
			node.dataset.reveal = 'done';
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;

					node.dataset.revealed = 'true';
					const releaseTransform = () => {
						if (node.dataset.revealed === 'true') node.dataset.reveal = 'done';
						node.removeEventListener('transitionend', releaseTransform);
					};
					node.addEventListener('transitionend', releaseTransform);
					if (nextOptions.once !== false) observer?.unobserve(node);
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.16 }
		);

		observer.observe(node);
	}

	setup(options);

	return {
		update(nextOptions: RevealOptions = {}) {
			setup(nextOptions);
		},
		destroy() {
			observer?.disconnect();
		}
	};
}
