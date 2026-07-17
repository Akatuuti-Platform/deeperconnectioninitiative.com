<script lang="ts">
import Logo from "./logo.svelte";
import { siteConfig } from "@/lib/config/site";

const navGroups = [
  {
    title: "Programs",
    links: [
      { label: "Toolkit", href: "/toolkit" },
      { label: "Champions", href: "/champions" },
      { label: "Trainings", href: "/trainings" },
      { label: "Volunteering", href: "/volunteering" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "Partners", href: "/partners" },
      { label: "Performance", href: "/performance" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const complianceLinks = [
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
</script>

<footer class="relative bg-dci-teal-deep text-dci-sand rounded-t-4xl overflow-hidden">
	<!-- Dot-pattern overlay -->
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background-image: radial-gradient(#2A6268 1px, transparent 1px); background-size: 30px 30px;"
	></div>

	<div class="relative max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8 2xl:max-w-400">
		<!-- Main grid -->
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
			<!-- Left: Logo + Mission -->
			<div class="lg:col-span-4 space-y-5">
				<div class="logo-on-dark">
					<Logo isLink />
				</div>
				<p class="text-sm text-dci-sand/70 leading-relaxed max-w-xs">
					Building deeper connections for community wellness through evidence-based programs and mutual support.
				</p>
			</div>

			<!-- Center: Navigation columns -->
			<div class="lg:col-span-4 grid grid-cols-2 gap-8">
				{#each navGroups as group}
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-dci-sand/60">
							{group.title}
						</p>
						<nav class="flex flex-col gap-2.5 mt-3" aria-label={`${group.title} links`}>
							{#each group.links as link}
								<a
									href={link.href}
									class="text-sm text-dci-sand/70 hover:text-white transition-colors"
								>
									{link.label}
								</a>
							{/each}
						</nav>
					</div>
				{/each}
			</div>

			<!-- Right: Contact info -->
			<div class="lg:col-span-4">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-sand/60">
					Contact
				</p>
				<div class="mt-3 space-y-2.5">
					<p class="text-sm text-dci-sand/70">{siteConfig.contacts.address}</p>
					<p class="text-sm text-dci-sand/70">
						<a
							href={`mailto:${siteConfig.contacts.email}`}
							class="text-dci-sand/70 hover:text-white underline underline-offset-4 transition-colors"
						>
							{siteConfig.contacts.email}
						</a>
					</p>
					<p class="text-sm text-dci-sand/70">
						<a
							href={`tel:${siteConfig.contacts.tele}`}
							class="text-dci-sand/70 hover:text-white underline underline-offset-4 transition-colors"
						>
							{siteConfig.contacts.tele}
						</a>
					</p>
					<p class="text-sm text-dci-sand/70">Mon&ndash;Fri, 9:00 AM&ndash;5:00 PM</p>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-14 border-t border-dci-sand/15 pt-8 space-y-6">
			<p class="text-xs text-dci-sand/50 leading-relaxed max-w-3xl">
				Our community is built on the foundation of belonging and mutual respect. Through our
				Deeper Connection Initiative, we are committed to fostering a neighborhood where every
				resident feels truly at home &mdash; celebrating diversity, encouraging participation,
				and ensuring every voice contributes to the vibrant spirit of our collective home.
			</p>
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<nav class="flex flex-wrap gap-x-4 gap-y-2">
					{#each complianceLinks as link}
						<a
							href={link.href}
							class="text-xs text-dci-sand/50 hover:text-dci-sand transition-colors"
						>
							{link.label}
						</a>
					{/each}
				</nav>
				<p class="text-xs text-dci-sand/50">
					&copy; {new Date().getFullYear()} {siteConfig.legalName}
				</p>
			</div>
		</div>
	</div>
</footer>

