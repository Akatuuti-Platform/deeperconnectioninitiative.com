<script lang="ts">
	import Logo from './logo.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	import {
		ArrowUpRightIcon as ArrowUpRight,
		BookOpenTextIcon as BookOpen,
		BuildingsIcon as Building2,
		CalendarDotsIcon as CalendarDays,
		CaretDownIcon as ChevronDown,
		ChartLineUpIcon as ChartLineUp,
		HandshakeIcon as HeartHandshake,
		ListIcon as Menu,
		ChatCircleTextIcon as MessageCircle,
		SparkleIcon as Sparkles,
		UsersThreeIcon as Users
	} from 'phosphor-svelte';
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
					href: '/partners',
					description: 'Build mental wellness into trusted local spaces.',
					icon: Building2
				},
				{
					label: 'Champions',
					href: '/champions',
					description: 'Become the infrastructure in your community.',
					icon: Users
				},
				{
					label: 'Events',
					href: '/events',
					description: 'Workshops, clinics, and upcoming gatherings.',
					icon: CalendarDays
				},
				{
					label: 'Check-in',
					href: '/platform',
					description: 'The Early Warning System and your Connection Miles.',
					icon: MessageCircle
				}
			]
		},
		{
			label: 'Toolkit',
			href: '/toolkit',
			description: 'Physical tools for reflection, conversation, and emotional awareness.',
			children: [
				{
					label: 'Open the kit',
					href: '/toolkit',
					description: 'Explore how cards, journals, and mood tracking work.',
					icon: Sparkles
				},
				{
					label: 'Toolkit products',
					href: '/#toolkit-products',
					description: 'Compare the card game, journal, mood tracker, and full kit.',
					icon: BookOpen
				},
				{
					label: 'Connection Miles',
					href: '/connection-miles',
					description: 'Track sponsored toolkits, field activity, and the miles rubric.',
					icon: ChartLineUp
				},
				{
					label: 'Sponsor a kit',
					href: '/#toolkit',
					description: 'Fund toolkit access and community champion training.',
					icon: HeartHandshake
				}
			]
		},
		{ label: 'Performance', href: '/performance' },
		{ label: 'Contact Us', href: '/contact' }
	];

	let isOpen = $state(false);
	let openMobileSection = $state('Ecosystem');
	let activeDesktopMenu = $state('');
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	let activeItem = $derived(
		navItems.find((item) => item.label === activeDesktopMenu && item.children)
	);
	let currentPath = $derived(page.url.pathname);
	let currentHash = $derived(page.url.hash);

	function normalizePath(href: string) {
		if (href.startsWith('/#')) return '/';
		if (href.startsWith('#')) return '/';
		return href.split('#')[0] || '/';
	}

	function isHrefActive(href: string) {
		if (href.startsWith('#')) {
			return currentPath === '/' && currentHash === href;
		}

		if (href.startsWith('/#')) {
			return currentPath === '/' && (!currentHash || currentHash === href.slice(1));
		}

		return currentPath === normalizePath(href);
	}

	function isNavItemActive(item: (typeof navItems)[number]) {
		return (
			isHrefActive(item.href) || (item.children?.some((child) => isHrefActive(child.href)) ?? false)
		);
	}

	function activeDesktopClass(isActive: boolean) {
		return cn(
			'h-10 rounded-full bg-transparent px-4 text-[0.92rem] font-medium text-foreground/80 hover:bg-dci-teal/7 hover:text-dci-teal-deep focus:bg-dci-teal/7',
			isActive &&
				'bg-dci-burgundy/10 text-dci-burgundy ring-1 ring-dci-burgundy/15 hover:bg-dci-burgundy/12 hover:text-dci-burgundy'
		);
	}

	function activeMobileClass(isActive: boolean) {
		return cn(
			'flex items-center justify-between rounded-2xl border border-dci-teal/10 bg-white/45 px-4 py-4 text-lg font-semibold text-dci-teal-deep hover:bg-dci-sand/70',
			isActive && 'border-dci-burgundy/20 bg-dci-burgundy/8 text-dci-burgundy'
		);
	}

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

	// Keep the menu open while focus moves between the trigger and its submenu
	// links (keyboard nav): focusout schedules a close, focusin cancels it.
	function cancelDesktopClose() {
		if (closeTimer) clearTimeout(closeTimer);
	}

	function handleDesktopKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && activeDesktopMenu) {
			closeDesktopMenu();
		}
	}
</script>

<header
	class="fixed top-3 right-0 left-0 z-50 mx-auto w-[calc(100%-1rem)] max-w-7xl px-2 sm:top-4 sm:w-[calc(100%-2rem)]"
>
	<div
		class="relative overflow-visible rounded-2xl border border-dci-teal/12 bg-dci-cream/92 px-3 py-1.5 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-4"
	>
		<NoiseOverlay />
		<div class="relative flex h-12 items-center justify-between gap-4">
			<div class="flex min-w-0 items-center">
				<Logo isLink />
			</div>

			<div
				role="presentation"
				class="relative hidden flex-1 justify-center lg:flex"
				onmouseleave={scheduleDesktopClose}
				onfocusout={scheduleDesktopClose}
				onfocusin={cancelDesktopClose}
				onkeydown={handleDesktopKeydown}
			>
				<nav aria-label="Main navigation">
					<ul class="flex list-none items-center justify-center gap-1">
						{#each navItems as item}
							{@const isActive = isNavItemActive(item)}
							<li class="relative">
								{#if item.children}
									<button
										type="button"
										class={cn(
											activeDesktopClass(isActive),
											'data-[state=open]:bg-dci-teal/8 data-[state=open]:text-dci-teal-deep',
											isActive &&
												'data-[state=open]:bg-dci-burgundy/10 data-[state=open]:text-dci-burgundy'
										)}
										data-state={activeDesktopMenu === item.label ? 'open' : 'closed'}
										aria-expanded={activeDesktopMenu === item.label}
										aria-current={isActive ? 'page' : undefined}
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
											weight="regular"
										/>
									</button>
								{:else}
									<a
										href={item.href}
										class={cn(activeDesktopClass(isActive), 'inline-flex items-center py-2')}
										aria-current={isActive ? 'page' : undefined}
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
						class="absolute top-[calc(100%+0.85rem)] left-1/2 z-50 w-[680px] -translate-x-1/2 overflow-hidden rounded-2xl border border-dci-teal/10 bg-dci-cream p-4 text-popover-foreground shadow-dci-panel duration-200 animate-in fade-in-0 zoom-in-95"
						onmouseenter={() => openDesktopMenu(activeItem.label)}
						onmouseleave={scheduleDesktopClose}
						onfocusin={cancelDesktopClose}
					>
						<div
							class="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px] border-t border-l border-dci-teal/10 bg-dci-cream"
						></div>
						<div class="grid grid-cols-[0.78fr_1fr] gap-4">
							<a
								href={activeItem.href}
								class="group flex min-h-64 flex-col justify-between rounded-2xl bg-dci-teal-deep p-6 text-dci-cream outline-none transition hover:bg-[#204B50] focus-visible:ring-2 focus-visible:ring-dci-teal"
								onclick={closeDesktopMenu}
							>
								<div>
									<p class="text-xs font-bold uppercase tracking-widest text-dci-cream/70">
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
										weight="regular"
									/>
								</span>
							</a>

							<div class="grid gap-2">
								{#each activeItem.children as child}
									{@const Icon = child.icon}
									<a
										href={child.href}
										class="group grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl p-3 outline-none hover:bg-dci-sand/65 focus:bg-dci-sand/65 focus-visible:ring-2 focus-visible:ring-dci-teal/30"
										onclick={closeDesktopMenu}
									>
										<span
											class="flex size-10 items-center justify-center rounded-lg bg-dci-sand text-dci-teal transition group-hover:bg-dci-teal group-hover:text-dci-cream"
										>
											<Icon class="size-5" weight="duotone" aria-hidden="true" />
										</span>
										<span>
											<span class="flex items-center gap-2 text-sm font-semibold text-slate-950">
												{child.label}
												<ArrowUpRight
													class="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
													weight="regular"
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
						'rounded-full border-dci-teal/20 bg-dci-paper/70 px-5 text-dci-teal-deep hover:bg-dci-teal/7 hover:text-dci-teal-deep'
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
							class="shrink-0 rounded-full text-dci-teal-deep hover:bg-dci-teal/8 lg:hidden"
						>
							<Menu class="size-5" weight="regular" />
							<span class="sr-only">Open menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content
					side="right"
					class="w-full max-w-none overflow-y-auto border-l-0 bg-dci-cream p-0 sm:max-w-md"
				>
					<div class="flex min-h-dvh flex-col">
						<Sheet.Header class="border-b border-dci-teal/10 p-5">
							<div class="flex items-center justify-between gap-4 pr-10">
								<Logo isLink />
								<Sheet.Title class="text-sm font-semibold text-dci-teal-deep">Navigation</Sheet.Title>
							</div>
							<Sheet.Description class="sr-only">Main navigation menu</Sheet.Description>
						</Sheet.Header>

						<nav class="flex-1 px-5 py-6" aria-label="Mobile navigation">
							<div class="space-y-2">
								{#each navItems as item}
									{@const isActive = isNavItemActive(item)}
									{#if item.children}
										<div
											class={cn(
												'rounded-2xl border border-dci-teal/10 bg-white/45',
												isActive && 'border-dci-burgundy/20 bg-dci-burgundy/8'
											)}
										>
											<button
												type="button"
												class={cn(
													'flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-lg font-semibold text-dci-teal-deep',
													isActive && 'text-dci-burgundy'
												)}
												aria-expanded={openMobileSection === item.label}
												aria-current={isActive ? 'page' : undefined}
												onclick={() => toggleMobileSection(item.label)}
											>
												<span>{item.label}</span>
												<ChevronDown
													class={cn(
														'size-5 transition-transform duration-300',
														openMobileSection === item.label && 'rotate-180'
													)}
													weight="regular"
												/>
											</button>
											{#if openMobileSection === item.label}
												<div class="grid gap-1 border-t border-dci-teal/10 p-2">
													<a
														href={item.href}
														class={cn(
															'rounded-xl px-3 py-3 text-sm font-semibold text-dci-burgundy hover:bg-dci-sand/70',
															isHrefActive(item.href) && 'bg-dci-burgundy/10'
														)}
														aria-current={isHrefActive(item.href) ? 'page' : undefined}
														onclick={closeMobileMenu}
													>
														View {item.label}
													</a>
													{#each item.children as child}
														{@const Icon = child.icon}
														<a
															href={child.href}
															class={cn(
																'grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl px-3 py-3 hover:bg-dci-sand/70',
																isHrefActive(child.href) && 'bg-dci-burgundy/10'
															)}
															aria-current={isHrefActive(child.href) ? 'page' : undefined}
															onclick={closeMobileMenu}
														>
															<span
																class="flex size-10 items-center justify-center rounded-lg bg-dci-sand text-dci-teal"
															>
																<Icon class="size-5" weight="duotone" aria-hidden="true" />
															</span>
															<span>
																<span
																	class={cn(
																		'block text-sm font-semibold text-slate-950',
																		isHrefActive(child.href) && 'text-dci-burgundy'
																	)}
																>
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
											class={activeMobileClass(isActive)}
											aria-current={isActive ? 'page' : undefined}
											onclick={closeMobileMenu}
										>
											{item.label}
											<ArrowUpRight class="size-4" weight="regular" />
										</a>
									{/if}
								{/each}
							</div>
						</nav>

						<div class="border-t border-dci-teal/10 p-5">
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
										'w-full rounded-full border-dci-teal/20 bg-transparent text-dci-teal-deep'
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
