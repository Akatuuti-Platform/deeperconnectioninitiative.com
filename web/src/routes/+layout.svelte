<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon/favicon.ico';
	import Navigation from '@/lib/components/layout/navigation.svelte';
	import Footer from '@/lib/components/layout/footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<!-- {/* Subtle radial background accents */} -->
	<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -right-32 -top-32 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl"
		></div>
		<div
			class="absolute -left-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
		></div>
	</div>

	<Navigation />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
