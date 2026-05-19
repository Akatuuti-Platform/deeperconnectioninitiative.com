<script lang="ts">
	import Logo from './logo.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import {
		ArrowUpRight,
		BookOpen,
		Building2,
		CalendarDays,
		ChevronDown,
		HeartHandshake,
		Menu,
		MessageCircle,
		Sparkles,
		Users,
		X
	} from '@lucide/svelte';
	import NoiseOverlay from './overlays/noise-overlay.svelte';

	const navItems = [
		{ label: 'Mission', href: '#about' },
		{
			label: 'Ecosystem',
			href: '#ecosystem',
			description: 'The care pathway from self-led tools to community support.',
			children: [
				{
					label: 'Trainings',
					href: '/trainings',
					description: 'Equip community champions and partner teams.',
					icon: Users
				},
				{
					label: 'Partners',
					href: '#partners',
					description: 'Build mental wellness into trusted local spaces.',
					icon: Building2
				},
				{
					label: 'Community',
					href: '#community',
					description: 'Join circles, clinics, and local support actions.',
					icon: MessageCircle
				},
				{
					label: 'Events',
					href: '/events',
					description: 'Workshops, clinics, and upcoming gatherings.',
					icon: CalendarDays
				}
			]
		},
		{
			label: 'Toolkit',
			href: '/#toolkit',
			description: 'Physical tools for reflection, conversation, and emotional awareness.',
			children: [
				{
					label: 'Conversation cards',
					href: '/#toolkit',
					description: 'Prompts that help people speak without pressure.',
					icon: Sparkles
				},
				{
					label: 'Reflection journal',
					href: '/#toolkit',
					description: 'Guided pages for processing and self-awareness.',
					icon: BookOpen
				},
				{
					label: 'Sponsor a kit',
					href: '/#toolkit',
					description: 'Fund toolkit access and community champion training.',
					icon: HeartHandshake
				}
			]
		},
		{ label: 'Contact Us', href: '/contact' }
	];

	let isOpen = $state(false);
	let openMobileSection = $state('Ecosystem');
	let activeDesktopMenu = $state('');
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	let activeItem = $derived(
		navItems.find((item) => item.label === activeDesktopMenu && item.children)
	);

	function closeMobileMenu() {
		isOpen = false;
	}

	function toggleMobileSection(label: string) {
		openMobileSection = openMobileSection === label ? '' : label;
	}

	function openDesktopMenu(label: string) {
		if (closeTimer) clearTimeout(closeTimer);
		activeDesktopMenu = label;
	}

	function scheduleDesktopClose() {
		if (closeTimer) clearTimeout(closeTimer);
		closeTimer = setTimeout(() => {
			activeDesktopMenu = '';
		}, 120);
	}

	function closeDesktopMenu() {
		if (closeTimer) clearTimeout(closeTimer);
		activeDesktopMenu = '';
	}
</script>

<header
	class="fixed top-3 right-0 left-0 z-50 mx-auto w-[calc(100%-1rem)] max-w-7xl px-2 sm:top-4 sm:w-[calc(100%-2rem)]"
>
	<div
		class="relative overflow-visible rounded-2xl border border-[#2A6268]/10 bg-[#ffffeb]/90 px-3 py-2 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-4"
	>
		<NoiseOverlay />
		<div class="relative flex h-14 items-center justify-between gap-4">
			<div class="flex min-w-0 items-center">
				<Logo isLink class="w-36 sm:w-40" />
			</div>

			<div
				role="presentation"
				class="relative hidden flex-1 justify-center lg:flex"
				onmouseleave={scheduleDesktopClose}
				onfocusout={scheduleDesktopClose}
			>
				<nav aria-label="Main navigation">
					<ul class="flex list-none items-center justify-center gap-1">
						{#each navItems as item}
							<li class="relative">
								{#if item.children}
									<button
										type="button"
										class="h-10 rounded-full bg-transparent px-4 text-[0.92rem] text-foreground/80 hover:bg-[#2A6268]/7 hover:text-[#1A3C40] data-[state=open]:bg-[#2A6268]/8 data-[state=open]:text-[#1A3C40]"
										data-state={activeDesktopMenu === item.label ? 'open' : 'closed'}
										aria-expanded={activeDesktopMenu === item.label}
										aria-controls="desktop-navigation-viewport"
										onmouseenter={() => openDesktopMenu(item.label)}
										onfocus={() => openDesktopMenu(item.label)}
										onclick={() =>
											activeDesktopMenu === item.label
												? closeDesktopMenu()
												: openDesktopMenu(item.label)}
									>
										{item.label}
										<ChevronDown
											class={cn(
												'ml-1 inline size-3.5 transition-transform duration-300',
												activeDesktopMenu === item.label && 'rotate-180'
											)}
											strokeWidth={1.8}
										/>
									</button>
								{:else}
									<a
										href={item.href}
										class="h-10 rounded-full bg-transparent px-4 py-2 text-[0.92rem] font-medium text-foreground/80 hover:bg-[#2A6268]/7 hover:text-[#1A3C40] focus:bg-[#2A6268]/7"
									>
										{item.label}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</nav>

				{#if activeItem?.children}
					<div
						id="desktop-navigation-viewport"
						role="region"
						aria-label={`${activeItem.label} navigation`}
						class="absolute top-[calc(100%+0.85rem)] left-1/2 z-50 w-[680px] -translate-x-1/2 overflow-hidden rounded-[1.35rem] border border-[#2A6268]/10 bg-[#ffffeb] p-4 text-popover-foreground shadow-[0_30px_90px_-50px_rgba(0,0,0,0.75)] duration-200 animate-in fade-in-0 zoom-in-95"
						onmouseenter={() => openDesktopMenu(activeItem.label)}
						onmouseleave={scheduleDesktopClose}
					>
						<div
							class="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px] border-t border-l border-[#2A6268]/10 bg-[#ffffeb]"
						></div>
						<div class="grid grid-cols-[0.78fr_1fr] gap-4">
							<a
								href={activeItem.href}
								class="group flex min-h-64 flex-col justify-between rounded-2xl bg-[#1A3C40] p-6 text-[#F6ECD9] outline-none transition hover:bg-[#204B50] focus-visible:ring-2 focus-visible:ring-[#2A6268]"
								onclick={closeDesktopMenu}
							>
								<div>
									<p class="text-xs font-bold uppercase tracking-widest text-[#F6ECD9]/55">
										{activeItem.label}
									</p>
									<h3 class="mt-4 text-3xl font-semibold leading-tight text-white">
										{activeItem.description}
									</h3>
								</div>
								<span class="inline-flex items-center gap-2 text-sm font-semibold">
									View overview
									<ArrowUpRight
										class="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										strokeWidth={1.8}
									/>
								</span>
							</a>

							<div class="grid gap-2">
								{#each activeItem.children as child}
									{@const Icon = child.icon}
									<a
										href={child.href}
										class="group grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl p-3 outline-none hover:bg-[#EFE5D0]/65 focus:bg-[#EFE5D0]/65 focus-visible:ring-2 focus-visible:ring-[#2A6268]/30"
										onclick={closeDesktopMenu}
									>
										<span
											class="flex size-10 items-center justify-center rounded-lg bg-[#EFE5D0] text-[#2A6268] transition group-hover:bg-[#2A6268] group-hover:text-[#F6ECD9]"
										>
											<Icon class="size-5" strokeWidth={1.8} />
										</span>
										<span>
											<span class="flex items-center gap-2 text-sm font-semibold text-slate-950">
												{child.label}
												<ArrowUpRight
													class="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
													strokeWidth={1.8}
												/>
											</span>
											<span class="mt-1 block text-sm leading-snug text-slate-600">
												{child.description}
											</span>
										</span>
									</a>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div class="hidden shrink-0 items-center gap-2 lg:flex">
				<a
					href="#get-involved"
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'rounded-full border-[#2A6268]/20 bg-[#ffffeb]/70 px-5 text-[#1A3C40] hover:bg-[#2A6268]/7 hover:text-[#1A3C40]'
					)}
				>
					Join the movement
				</a>
				<a href="#toolkit" class={cn(buttonVariants(), 'rounded-full px-5')}> Sponsor a toolkit </a>
			</div>

			<Sheet.Root bind:open={isOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon-lg"
							class="shrink-0 rounded-full text-[#1A3C40] hover:bg-[#2A6268]/8 lg:hidden"
						>
							<Menu class="size-5" strokeWidth={1.8} />
							<span class="sr-only">Open menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content
					side="right"
					class="w-full max-w-none overflow-y-auto border-l-0 bg-[#ffffeb] p-0 sm:max-w-md"
				>
					<div class="flex min-h-dvh flex-col">
						<Sheet.Header class="border-b border-[#2A6268]/10 p-5">
							<div class="flex items-center justify-between gap-4 pr-10">
								<Logo isLink class="w-36" />
								<Sheet.Title class="text-sm font-semibold text-[#1A3C40]">Navigation</Sheet.Title>
							</div>
							<Sheet.Description class="sr-only">Main navigation menu</Sheet.Description>
						</Sheet.Header>

						<nav class="flex-1 px-5 py-6" aria-label="Mobile navigation">
							<div class="space-y-2">
								{#each navItems as item}
									{#if item.children}
										<div class="rounded-2xl border border-[#2A6268]/10 bg-white/45">
											<button
												type="button"
												class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-lg font-semibold text-[#1A3C40]"
												aria-expanded={openMobileSection === item.label}
												onclick={() => toggleMobileSection(item.label)}
											>
												<span>{item.label}</span>
												<ChevronDown
													class={cn(
														'size-5 transition-transform duration-300',
														openMobileSection === item.label && 'rotate-180'
													)}
													strokeWidth={1.8}
												/>
											</button>
											{#if openMobileSection === item.label}
												<div class="grid gap-1 border-t border-[#2A6268]/10 p-2">
													<a
														href={item.href}
														class="rounded-xl px-3 py-3 text-sm font-semibold text-[#6F231E] hover:bg-[#EFE5D0]/70"
														onclick={closeMobileMenu}
													>
														View {item.label}
													</a>
													{#each item.children as child}
														{@const Icon = child.icon}
														<a
															href={child.href}
															class="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl px-3 py-3 hover:bg-[#EFE5D0]/70"
															onclick={closeMobileMenu}
														>
															<span
																class="flex size-10 items-center justify-center rounded-lg bg-[#EFE5D0] text-[#2A6268]"
															>
																<Icon class="size-5" strokeWidth={1.8} />
															</span>
															<span>
																<span class="block text-sm font-semibold text-slate-950">
																	{child.label}
																</span>
																<span class="mt-1 block text-sm leading-snug text-slate-600">
																	{child.description}
																</span>
															</span>
														</a>
													{/each}
												</div>
											{/if}
										</div>
									{:else}
										<a
											href={item.href}
											class="flex items-center justify-between rounded-2xl border border-[#2A6268]/10 bg-white/45 px-4 py-4 text-lg font-semibold text-[#1A3C40] hover:bg-[#EFE5D0]/70"
											onclick={closeMobileMenu}
										>
											{item.label}
											<ArrowUpRight class="size-4" strokeWidth={1.8} />
										</a>
									{/if}
								{/each}
							</div>
						</nav>

						<div class="border-t border-[#2A6268]/10 p-5">
							<div class="grid gap-3">
								<a
									href="#toolkit"
									class={cn(buttonVariants({ size: 'lg' }), 'w-full rounded-full')}
									onclick={closeMobileMenu}
								>
									Sponsor a toolkit
								</a>
								<a
									href="#get-involved"
									class={cn(
										buttonVariants({ variant: 'outline', size: 'lg' }),
										'w-full rounded-full border-[#2A6268]/20 bg-transparent text-[#1A3C40]'
									)}
									onclick={closeMobileMenu}
								>
									Join the movement
								</a>
							</div>
						</div>
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
