<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { cn } from '$lib/utils';
	import {
		ArrowUpRightIcon,
		BookOpenTextIcon,
		FirstAidKitIcon,
		GraduationCapIcon,
		HandshakeIcon
	} from 'phosphor-svelte';

	const pathways = [
		{
			id: 'support',
			label: 'I need support',
			kicker: 'Start with care',
			icon: FirstAidKitIcon,
			illustration: 'care',
			title: 'Tell us what kind of support is needed.',
			description:
				'Use the contact route when someone needs help finding the right DCI touchpoint, clinic, toolkit, or responsible referral.',
			steps: ['Share the situation', 'We route it carefully', 'You get the next step'],
			href: '/contact',
			cta: 'Contact DCI',
			accent: '#6F231E'
		},
		{
			id: 'tools',
			label: 'I want tools',
			kicker: 'Use the toolkit',
			icon: BookOpenTextIcon,
			illustration: 'toolkit',
			title: 'Choose a tactile tool people can use offline.',
			description:
				'Start with cards, a reflection journal, a mood tracker, or the full kit for homes, youth groups, schools, and community circles.',
			steps: ['Pick the tool', 'Use it in real settings', 'Build a habit of reflection'],
			href: '#toolkit',
			cta: 'Explore toolkit',
			accent: '#2A6268'
		},
		{
			id: 'training',
			label: 'I train people',
			kicker: 'Build capacity',
			icon: GraduationCapIcon,
			illustration: 'community',
			title: 'Equip champions to hold safer conversations.',
			description:
				'Use the training path when your school, venue, nonprofit, clinic, or team needs a practical mental wellness model.',
			steps: ['Choose a tier', 'Train facilitators', 'Launch a support pathway'],
			href: '/trainings',
			cta: 'View trainings',
			accent: '#6F231E'
		},
		{
			id: 'help',
			label: 'I can help',
			kicker: 'Sponsor or volunteer',
			icon: HandshakeIcon,
			illustration: 'community',
			title: 'Move resources toward people and places that need them.',
			description:
				'Support toolkit access, volunteer at clinics, connect a venue, or help DCI reach communities where support is harder to find.',
			steps: ['Choose your role', 'Connect with DCI', 'Support monthly missions'],
			href: '#get-involved',
			cta: 'Get involved',
			accent: '#2A6268'
		}
	] as const;

	type Pathway = (typeof pathways)[number];

	let activePath = $state<Pathway>(pathways[0]);
</script>

<section
	id="find-your-path"
	class="relative scroll-mt-28 overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
>
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-dci-teal-deep text-dci-cream shadow-dci-panel lg:grid-cols-[0.82fr_1.18fr]"
	>
		<div class="relative p-6 sm:p-8 lg:p-10">
			<div
				class="pointer-events-none absolute inset-0 opacity-10"
				style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 28px 28px;"
			></div>
			<div class="relative">
				<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
					Find your path
				</p>
				<h2 class="mt-4 max-w-md text-4xl font-semibold leading-tight text-white sm:text-5xl">
					Start where you are.
				</h2>
				<p class="mt-4 max-w-md text-base leading-relaxed text-dci-cream/72">
					DCI can be a toolkit, a clinic, a training path, or a way to sponsor access. Choose
					the entry point that matches what brought you here.
				</p>

				<div class="mt-8 grid gap-2">
					{#each pathways as path}
						{@const Icon = path.icon}
						<button
							type="button"
							class={cn(
								'group grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition duration-300',
								activePath.id === path.id
									? 'border-dci-cream/28 bg-dci-cream/12 text-white'
									: 'border-dci-cream/10 bg-dci-cream/5 text-dci-cream/78 hover:bg-dci-cream/9'
							)}
							aria-pressed={activePath.id === path.id}
							onclick={() => (activePath = path)}
						>
							<span
								class={cn(
									'flex size-11 items-center justify-center rounded-xl transition',
									activePath.id === path.id ? 'bg-dci-cream text-dci-teal-deep' : 'bg-dci-cream/10'
								)}
							>
								<Icon class="size-5" weight="duotone" />
							</span>
							<span>
								<span class="block text-sm font-semibold">{path.label}</span>
								<span class="mt-1 block text-xs text-dci-cream/58">{path.kicker}</span>
							</span>
							<span
								class={cn(
									'h-2 w-2 rounded-full transition',
									activePath.id === path.id ? 'bg-dci-clay' : 'bg-dci-cream/18'
								)}
							></span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="relative min-h-[34rem] overflow-hidden bg-dci-cream p-6 text-slate-950 sm:p-8 lg:p-10">
			<SpotIllustration
				variant={activePath.illustration}
				class="dci-float-slow pointer-events-none absolute -right-28 -bottom-6 hidden w-[27rem] opacity-16 [--float-rotate:2deg] lg:block"
			/>
			<div class="relative z-10 flex h-full max-w-2xl flex-col justify-between">
				<div>
					<div
						class="inline-flex items-center rounded-full border border-dci-teal/15 bg-dci-paper/70 px-3 py-1"
					>
						<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
							{activePath.kicker}
						</span>
					</div>
					<h3 class="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
						{activePath.title}
					</h3>
					<p class="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
						{activePath.description}
					</p>
				</div>

				<div class="mt-10">
					<div class="grid gap-3 sm:grid-cols-3">
						{#each activePath.steps as step, index}
							<div class="rounded-2xl border border-dci-teal/12 bg-dci-paper/65 p-4">
								<p class="text-xs font-semibold text-dci-burgundy/70">0{index + 1}</p>
								<p class="mt-3 text-sm font-semibold leading-snug text-dci-teal-deep">{step}</p>
							</div>
						{/each}
					</div>

					<div class="mt-8 flex flex-col gap-3 border-t border-dci-teal/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
						<p class="max-w-sm text-sm leading-relaxed text-slate-600">
							Not sure yet? Start with contact and DCI can route you to the right pathway.
						</p>
						<a
							href={activePath.href}
							class="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-dci-teal-deep px-6 text-sm font-semibold text-dci-cream transition hover:bg-[#234F53] active:scale-[0.98]"
						>
							{activePath.cta}
							<ArrowUpRightIcon class="size-4" weight="regular" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
