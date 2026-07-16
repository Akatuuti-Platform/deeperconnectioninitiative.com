<script lang="ts">
	import './layout.css';
	import Navigation from '@/lib/components/layout/navigation.svelte';
	import Footer from '@/lib/components/layout/footer.svelte';
	import NoiseOverlay from '@/lib/components/layout/overlays/noise-overlay.svelte';
	import Seo from '@/lib/components/seo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="theme-color" content="#F6ECD9" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<Seo />

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-dci-teal-deep focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-dci-cream focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-dci-cream"
>
	Skip to content
</a>
<Navigation />
<NoiseOverlay />
<div class="flex min-h-screen flex-col">
	<!-- Subtle radial background accents -->
	<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -right-32 -top-32 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl"
		></div>
		<div
			class="absolute -left-40 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
		></div>
	</div>

	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
