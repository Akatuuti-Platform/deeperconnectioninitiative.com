<script lang="ts">
	import './layout.css';
  import { onMount, setContext } from 'svelte';
	import favicon from '$lib/assets/favicon/favicon.ico';
	import Navigation from '@/lib/components/layout/navigation.svelte';
	import Footer from '@/lib/components/layout/footer.svelte';
	import gsap from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
	}

	let { children } = $props();
	let smoother = $state<ScrollSmoother | null>(null);

	onMount(() => {
		const ctx = gsap.context(() => {
			smoother = ScrollSmoother.create({
				smooth: 1.5,
				effects: true
			});
		});
		return () => ctx.revert();
	});

	setContext('smootherCtx', () => smoother);
</script>

<svelte:head>
	<title>Deeper Connection Initiative | Mental Health Tools for Self-Led Healing</title>
	<meta
		name="description"
		content="A global mental health initiative helping individuals and communities build emotional strength through self-led learning, storytelling and connection"
	/>
	<link rel="icon" href={favicon} />
	<!-- <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest"> -->
</svelte:head>

<div id="smooth-wrapper">
	<div id="smooth-content">
		<div class="min-h-screen flex flex-col">
			<!-- {/* Subtle radial background accents */} -->
			<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
				<div
					class="absolute -right-32 -top-32 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl"
				></div>
				<div
					class="absolute -left-40 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
				></div>
			</div>

			<Navigation />
			<main class="flex-1">
				{@render children()}
			</main>
			<Footer />
		</div>
	</div>
</div>
