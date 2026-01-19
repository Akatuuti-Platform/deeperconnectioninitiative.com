<script lang="ts">
import { cn } from "@/lib/utils";
import Button, { buttonVariants } from "../ui/button/button.svelte";
import Logo from "./logo.svelte";
	import { Github, X } from "@lucide/svelte";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Announcements", href: "/announcements" },
  { label: "Documents", href: "/documents" },
  { label: "Board", href: "/board" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];
const footerNavigation = [{ title: "Navigation", links: primaryNav }];
const complianceLinks = [
  { label: "Fair Housing Notice", href: "/fair-housing" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
</script>

<footer>
	<div class={cn(' max-w-7xl mx-auto px-8  w-full 2xl:max-w-400', 'py-12')}>
		<div class="rounded-3xl p-8 lg:p-12">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
				<div>
					<a href="/" class="flex items-center gap-3 text-base-900">
						<Logo class=" shrink-0" />
					</a>
				</div>
				<div class="lg:col-span-2 grid grid-cols-1 gap-12 lg:grid-cols-2">
					{#each footerNavigation as section}
						<div>
							<p class="font-medium text-sm text-base-900">
								{section.title}
							</p>
							<nav class="flex flex-col gap-2 mt-2" aria-label={`${section.title} links`}>
								{#each section.links as link}
									<a href={link.href} class="text-sm text-base-600 hover:text-base-900">
										{link.label}
									</a>
								{/each}
							</nav>
						</div>
					{/each}
					<div>
						<p class="font-medium text-sm text-base-900">Homeowners Association</p>
						<p class="text-sm text-base-600">Example City, ST • Est. 2014</p>
						<div class="space-y-1 mt-8">
							<p class="text-base-600 text-sm">
								General contact:
								<a href="#_" class="underline underline-offset-4 hover:text-base-900">
									board@hoa-example.org
								</a>
							</p>
							<p class="text-base-600 text-sm">
								Phone:
								<a href="#_" class="underline underline-offset-4 hover:text-base-900">
									(555) 555-0101
								</a>
							</p>
							<p class="text-base-600 text-sm">Office hours: Mon–Fri, 9:00 AM–5:00 PM</p>
							<p class="text-base-600 text-sm">Managed by Example Property Management</p>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-12 w-full rounded-2xl bg-cream divide-y divide-accent-100">
				<div class="p-8">
					<p class="text-base-600 text-xs">
						This community is operated in full compliance with all applicable federal, state, and
						local fair housing laws. The Association is committed to providing equal access, fair
						treatment, and reasonable accommodations to all residents, applicants, and visitors,
						regardless of protected status. Discrimination, harassment, or exclusion of any kind is
						not tolerated, and requests for reasonable accommodations or modifications will be
						reviewed promptly and in good faith.
					</p>
				</div>
				<div class="flex flex-wrap lg:items-center lg:justify-between px-8 py-4 gap-x-4 gap-y-8">
					<nav class="flex flex-wrap gap-x-4 gap-y-2">
						{#each complianceLinks as link}
							<a href={link.href} class="text-xs text-base-600 hover:text-secondary-900">
								{link.label}
							</a>
						{/each}
					</nav>
					<p class="text-xs text-base-600">
						© {new Date().getFullYear()}
						Deeper Connection Initiative
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
