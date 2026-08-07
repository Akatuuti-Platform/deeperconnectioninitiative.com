/**
 * Svelte equivalents of the two hooks in the supplied DciMark.jsx.
 * Same mechanics: an IntersectionObserver sentinel for the compact header
 * (no scroll listener), and SMIL pausing for reduced motion.
 */

/**
 * Flips true once the page has scrolled past the header. No scroll listener.
 * Call inside a component and read `.compact`.
 */
export function createCompactHeader(offset = 80) {
	let compact = $state(false);

	$effect(() => {
		const sentinel = document.createElement('div');
		Object.assign(sentinel.style, {
			position: 'absolute',
			top: '0',
			height: `${offset}px`,
			width: '1px',
			pointerEvents: 'none'
		});
		document.body.prepend(sentinel);

		const io = new IntersectionObserver(([entry]) => (compact = !entry.isIntersecting), {
			threshold: 0
		});
		io.observe(sentinel);

		return () => {
			io.disconnect();
			sentinel.remove();
		};
	});

	return {
		get compact() {
			return compact;
		}
	};
}

/**
 * Pauses the SMIL hatch drift, which CSS prefers-reduced-motion cannot reach.
 * Call once in the root layout.
 */
export function useReducedMotionSvg() {
	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const apply = () => {
			document.querySelectorAll('svg').forEach((s) => {
				if (typeof s.pauseAnimations !== 'function') return;
				if (mq.matches) s.pauseAnimations();
				else s.unpauseAnimations();
			});
		};
		apply();
		mq.addEventListener('change', apply);
		return () => mq.removeEventListener('change', apply);
	});
}
