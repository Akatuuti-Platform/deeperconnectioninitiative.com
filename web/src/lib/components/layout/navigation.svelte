<script>
	import Logo from "./logo.svelte";

</script>

<header
	class="w-full border-b border-slate-300/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
		<!-- Logo -->
		<div class="flex items-center gap-2">
 				<Logo /> 
		</div>

		<!-- Nav links -->
		<nav class="hidden md:flex items-center gap-8 text-sm font-normal text-foreground/80">
			<a href="#about" class="hover:text-primary transition-colors"> Mission </a>
			<a href="#ecosystem" class="hover:text-primary transition-colors"> Ecosystem </a>
			<a href="#toolkit" class="hover:text-primary transition-colors"> Toolkit </a>
			<a href="#get-involved" class="hover:text-primary transition-colors"> Get Involved </a>
		</nav>

		<!-- Actions -->
		<div class="flex items-center gap-3">
			<a
				href="#get-involved"
				class="hidden sm:inline-flex items-center rounded-full border border-primary/40 bg-transparent px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
			>
				Join the movement
			</a>
			<a
				href="#toolkit"
				class="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				Sponsor a toolkit
			</a>
		</div>
	</div>
</header>
