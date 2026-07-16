<script lang="ts">
import { cn } from "@/lib/utils";
import Button, { buttonVariants } from "../ui/button/button.svelte";
import Logo from "./logo.svelte";
	import { siteConfig } from "@/lib/config/site";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Toolkit", href: "/toolkit" },
  { label: "Champions", href: "/champions" },
  { label: "Partners", href: "/partners" },
  { label: "Trainings", href: "/trainings" },
  { label: "Volunteering", href: "/volunteering" },
  { label: "Events", href: "/events" },
  { label: "Performance", href: "/performance" },
  { label: "Contact", href: "/contact" },
];
const footerNavigation = [{ title: "Navigation", links: primaryNav }];
const complianceLinks = [
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
						<Logo />
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
						<p class="font-medium text-sm text-base-900">{siteConfig.name}</p>
						<p class="text-sm text-base-600">{siteConfig.contacts.address}</p>
						<div class="space-y-1 mt-8">
							<p class="text-base-600 text-sm">
								General contact:
								<a href={`mailto:${siteConfig.contacts.email}`} class="underline underline-offset-4 hover:text-base-900">
{siteConfig.contacts.email}
								</a>
							</p>
							<p class="text-base-600 text-sm">
								Phone:
								<a href={`tel:${siteConfig.contacts.tele}`} class="underline underline-offset-4 hover:text-base-900">
{siteConfig.contacts.tele}
								</a>
							</p>
							<p class="text-base-600 text-sm">Office hours: Mon–Fri, 9:00 AM–5:00 PM</p>
							<p class="text-base-600 text-sm">Managed by <a href="https://utaliicreative.com/" class="underline underline-offset-4 hover:text-base-900">Utalii Creative</a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-12 w-full rounded-2xl bg-cream divide-y divide-accent-100">
				<div class="p-8">
					<p class="text-base-600 text-xs">
						Our community is built on the foundation of belonging and mutual respect. Through our
						Deeper Connection Initiative, we are committed to fostering a neighborhood where every
						resident feels truly at home. We go beyond standard compliance to cultivate an inclusive
						environment that celebrates our diversity, encourages active participation, and ensures
						that every voice contributes to the vibrant spirit of our collective home.
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
