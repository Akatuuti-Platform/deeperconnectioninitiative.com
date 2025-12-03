<script>
	import Logo from "./logo.svelte";

</script>
<footer class="w-full border-t border-slate-300/40">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex flex-col md:flex-row justify-between items-center gap-6">
			<div class="flex items-center gap-2">
                <Logo />
				<!-- <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
					<span class="text-xs font-semibold tracking-tight text-primary-foreground">DC</span>
				</div> -->
				<!-- <span class="text-sm font-normal text-foreground/90">Owning our healing, together.</span> -->
			</div>
			<div class="flex items-center gap-4 text-xs font-normal text-foreground/90">
				<a href="#about" class="hover:text-primary transition-colors"> Mission </a>
				<a href="#ecosystem" class="hover:text-primary transition-colors"> Ecosystem </a>
				<a href="#toolkit" class="hover:text-primary transition-colors"> Toolkit </a>
				<a href="#get-involved" class="hover:text-primary transition-colors"> Get involved </a>
			</div>
		</div>
	</div>
</footer>
