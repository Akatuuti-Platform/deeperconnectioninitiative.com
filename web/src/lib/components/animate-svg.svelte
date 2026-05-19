<script lang="ts">
	import { draw } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';

	type PathData = {
		d: string;
		stroke?: string;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square';
	};

	type HoverAnimationType = 'float' | 'pulse' | 'redraw' | 'color' | 'sequential';

	type Props = {
		width?: string;
		height?: string;
		viewBox?: string;
		class?: string;
		path?: string; // Single path (legacy)
		paths?: PathData[]; // New multiple path support
		strokeColor?: string;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square';
		animationDuration?: number;
		animationDelay?: number;
		animationBounce?: number;
		staggerDelay?: number;
		reverseAnimation?: boolean;
		enableHoverAnimation?: boolean;
		hoverAnimationType?: HoverAnimationType;
		hoverStrokeColor?: string | null;
		initialAnimation?: boolean;
	};

	let {
		width = '100%',
		height = '100%',
		viewBox = '0 0 100 100',
		class: className = '',
		path = '',
		paths = [],
		strokeColor = '#cecece',
		strokeWidth = 3,
		strokeLinecap = 'round',
		animationDuration = 1.5,
		animationDelay = 0,
		animationBounce = 0.3,
		staggerDelay = 0.2,
		reverseAnimation = false,
		enableHoverAnimation = false,
		hoverAnimationType = 'redraw',
		hoverStrokeColor = '#4f46e5',
		initialAnimation = true
	}: Props = $props();

	let isHovering = $state(false);

	// Normalize paths
	let normalizedPaths = $derived.by(() => {
		if (paths.length > 0) return paths;
		if (path) {
			return [
				{
					d: path,
					stroke: strokeColor,
					strokeWidth,
					strokeLinecap
				}
			];
		}
		return [];
	});

	// Hover animations (Simple implementations using Svelte motion/state)
	// For 'redraw', we can toggle a key to restart the transition or use a spring.
	// For simplicity and effectiveness, we'll re-trigger the draw transition on hover if type is 'redraw'.
	let redrawKey = $state(0);

	function onHover() {
		isHovering = true;
		if (enableHoverAnimation && hoverAnimationType === 'redraw') {
			redrawKey += 1;
		}
	}

	function onLeave() {
		isHovering = false;
	}

    // Helper to get stroke color based on hover state
    function getStrokeColor(p: PathData) {
        if (enableHoverAnimation && hoverAnimationType === 'color' && isHovering) {
            return hoverStrokeColor || strokeColor;
        }
        return p.stroke || strokeColor;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	{width}
	{height}
	{viewBox}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	style="transition: transform 0.3s ease-out; {enableHoverAnimation &&
	hoverAnimationType !== 'redraw' &&
	isHovering
		? 'transform: scale(1.05);'
		: ''}"
	onmouseenter={onHover}
	onmouseleave={onLeave}
>
	{#if normalizedPaths.length > 0}
		{#each normalizedPaths as p, i}
			{#key redrawKey}
				<path
					d={p.d}
					stroke={getStrokeColor(p)}
					stroke-width={p.strokeWidth ?? strokeWidth}
					stroke-linecap={p.strokeLinecap ?? strokeLinecap}
					in:draw={{
						duration: animationDuration * 1000,
						delay: (animationDelay + i * staggerDelay) * 1000,
						easing: cubicOut
					}}
					style:transition="stroke 0.3s ease"
					class:animate-pulse={enableHoverAnimation && hoverAnimationType === 'pulse' && isHovering}
					class:animate-bounce={enableHoverAnimation &&
						hoverAnimationType === 'float' &&
						isHovering}
				/>
			{/key}
		{/each}
	{/if}
</svg>

<style>
    /* Add custom animations if needed, or rely on Tailwind utility classes like animate-pulse */
    .animate-bounce {
        animation: bounce 1.5s infinite;
    }
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-2px);
        }
    }
</style>
