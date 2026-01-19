<script lang="ts">
	import { cn } from "@/lib/utils";
	import Button, { buttonVariants } from "../../ui/button/button.svelte";



</script>

<section class="w-full py-16 sm:py-28 lg:py-56  ">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center space-y-8 items-center justify-center max-w-4xl mx-auto">
			<!-- Badge -->
			<div
				class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
				<span class="text-xs font-medium tracking-tight text-accent">Own your healing !</span>
			</div>

			<!-- Title -->
			<h1
				class="sm:text-5xl lg:text-6xl text-4xl font-bold text-foreground tracking-tight text-center text-balance leading-tight"
			>
				<!-- Mental health  -->
				Tools that put healing back in{' '}
				<span class="relative inline-block">
					your hands
					<span class="absolute bottom-0 left-0 w-full h-1 bg-accent/50"></span>
				</span>
			</h1>

			<!-- Description -->
			<p
				class="sm:text-xl leading-relaxed text-lg font-normal text-foreground/80 text-center max-w-2xl mx-auto text-pretty"
			>
				A global mental health initiative helping individuals and communities build emotional
				strength through self-led learning, storytelling, and connection.
			</p>

			<!-- CTAs -->
			<div class="flex flex-col sm:flex-row gap-3 text-center pt-2 justify-center">
				<Button
					href="#toolkit"
					class={cn(buttonVariants({ size: 'lg' }), 'border-2 border-primary')}
				>
					Buy or sponsor a toolkit</Button
				>

				<Button
					href="#ecosystem"
					class={cn(
						buttonVariants({ variant: 'secondary', size: 'lg' }),
						'border-2 border-primary'
					)}>Explore the DCI ecosystem</Button
				>
			</div>

			<!-- Supporting line -->
			<div class="flex flex-wrap gap-6 text-xs text-foreground/70 pt-2 justify-center font-normal">
				<span class="inline-flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
					Community-rooted
				</span>
				<span class="inline-flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
					Low-tech & offline-first
				</span>
				<span class="inline-flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full bg-foreground"></span>
					Trauma-aware & humane
				</span>
			</div>
		</div>
	</div>
</section>
