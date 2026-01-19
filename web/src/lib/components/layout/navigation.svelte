<script lang="ts">
	import Logo from "./logo.svelte";
	import * as Sheet from "$lib/components/ui/sheet";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { ChevronDown, Menu } from "@lucide/svelte";
	import { cn } from "$lib/utils";
	import NoiseOverlay from "./overlays/noise-overlay.svelte";

	const navItems = [
		{
			label: "Mission",
			href: "#about",
			// children: [
			// 	{ label: "Our Story", href: "#story", description: "Learn about how DCI started" },
			// 	{ label: "Values", href: "#values", description: "The core principles guiding us" },
			// 	{ label: "Team", href: "#team", description: "Meet the people behind the initiative" },
			// ],
		},
		{
			label: "Ecosystem",
			href: "#ecosystem",
			children: [
				{ label: "Trainings", href: "/trainings", description: "Get Certified" },
				{ label: "Partners", href: "#partners", description: "Organizations we work with" },
				{ label: "Community", href: "#community", description: "Join our growing network" },
				{ label: "Events", href: "/events", description: "Upcoming workshops and gatherings" },
			],
		},
		{
			label: "Toolkit",
			href: "/#toolkit",
			// children: [
			// 	{ label: "Resources", href: "#resources", description: "Guides and tools for healing" },
			// 	{ label: "Workshops", href: "#workshops", description: "Interactive sessions" },
			// 	{ label: "Case Studies", href: "#case-studies", description: "Real impact stories" },
			// ],
		},
		{ label: "Contact Us", href: "/contact" },
	];

	let isOpen = $state(false);

	// const isScrolled =  window.scrollY > 100
</script>

<!-- TODO: make the border translucent and the bar solid secondary color  -->
<!-- <header
	class={cn('fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl rounded-[.6rem]px-4 py-2', {
		isScrolled:
			'bg-[#ffffeb] shadow-sm backdrop-blur-md  supports-backdrop-filter:bg-background/60  border-2  border-secondary'
	})}
> -->
<header
	class={cn(
		'fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl rounded-[.6rem] px-4 py-2',

		'bg-[#ffffeb] shadow-sm backdrop-blur-md  supports-backdrop-filter:bg-background/60  border-2  border-secondary py-3'
	)}
>
<NoiseOverlay />
	<div class="flex items-center justify-between">
		<!-- Logo -->
		<div class="flex items-center gap-2 pl-2">
			<Logo isLink />
		</div>

		<!-- Desktop Nav -->
		<nav class="hidden md:flex items-center gap-1">
			{#each navItems as item}
				{#if item.children}
					<!-- Dropdown Item -->
					<div class="group/dropdown relative">
						<a
							href={item.href}
							class="inline-flex h-10 items-center justify-center rounded-t-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary group-hover/dropdown:bg-white group-hover/dropdown:text-foreground group-hover/dropdown:shadow-sm"
						>
							{item.label}
							<ChevronDown class="size-5 pl-1" />
						</a>
						<!-- Dropdown Content -->
						<div
							class="absolute left-0 top-full pt-0 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50"
						>
							<div
								class="grid w-[500px] gap-3 p-4 bg-white border-b border-border/40 shadow-lg rounded-b-xl rounded-r-xl grid-cols-2"
							>
								{#each item.children as child}
									<a
										href={child.href}
										class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
									>
										<div class="text-sm font-medium leading-none">{child.label}</div>
										<p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
											{child.description}
										</p>
									</a>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<!-- Simple Link -->
					<a
						href={item.href}
						class="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:scale-95 ease-in-out"
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</nav>

		<!-- Actions (Desktop) -->
		<div class="hidden relative items-center gap-3 md:flex">
			<a
				href="#get-involved"
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'hidden rounded-xl text-primary hover:bg-primary/5 hover:text-primary lg:inline-flex'
				)}
			>
				Join the movement
			</a>
			<span class="w-[.2px] h-9 bg-white/60" />
			<a href="#toolkit" class={cn(buttonVariants(), 'rounded-xl')}> Sponsor a toolkit </a>
		</div>

		<!-- Mobile Menu -->
		<div class="md:hidden">
			<Sheet.Root bind:open={isOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon" class="mr-2">
							<Menu class="h-5 w-5" />
							<span class="sr-only">Toggle menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="overflow-y-auto">
					<Sheet.Header>
						<Sheet.Title class="text-left">Menu</Sheet.Title>
						<Sheet.Description class="sr-only">Main navigation menu</Sheet.Description>
					</Sheet.Header>
					<div class="mt-8 flex flex-col gap-6">
						<nav class="flex flex-col gap-4">
							{#each navItems as item}
								{#if item.children}
									<div class="flex flex-col gap-2">
										<div class="text-lg font-medium text-foreground py-2">{item.label}</div>
										<div class="flex flex-col pl-4 border-l">
											{#each item.children as child}
												<a
													href={child.href}
													class="py-2 text-sm text-foreground/80 hover:text-primary transition-colors"
													onclick={() => (isOpen = false)}
												>
													{child.label}
												</a>
											{/each}
										</div>
									</div>
								{:else}
									<a
										href={item.href}
										class="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
										onclick={() => (isOpen = false)}
									>
										{item.label}
									</a>
								{/if}
							{/each}
						</nav>
						<div class="flex flex-col gap-3 pt-4 border-t">
							<a
								href="#get-involved"
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-full rounded-xl justify-center'
								)}
								onclick={() => (isOpen = false)}
							>
								Join the movement
							</a>
							<a
								href="#toolkit"
								class={cn(buttonVariants(), 'w-full rounded-xl justify-center')}
								onclick={() => (isOpen = false)}
							>
								Sponsor a toolkit
							</a>
						</div>
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
