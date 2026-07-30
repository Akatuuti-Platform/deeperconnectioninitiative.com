<script lang="ts">
	import {
		WaveformIcon as Waveform,
		ArrowLeftIcon as ArrowLeft,
		ChartLineUpIcon,
		ShieldCheckIcon,
		UsersThreeIcon,
		LightningIcon
	} from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import Eyebrow from '$lib/components/sections/eyebrow.svelte';

	const features = [
		{
			icon: ChartLineUpIcon,
			title: 'Real-time emotional data',
			description:
				'Mood tracking, clinic attendance, and Champion certifications aggregated and analysed by AI across a whole community.'
		},
		{
			icon: ShieldCheckIcon,
			title: 'Independently verified',
			description:
				'Every Connection Mile is permanently recorded and never inflated. Organisations see verified impact, not vanity metrics.'
		},
		{
			icon: UsersThreeIcon,
			title: 'Early detection, not crisis reaction',
			description:
				'The EWS activates when sufficient community participation occurs across mood tracking, Champion certification, and clinic attendance.'
		},
		{
			icon: LightningIcon,
			title: 'Connection Miles as currency',
			description:
				'Each Mile represents one life meaningfully impacted. Miles are earned through products sold, clinics hosted, and Champions trained, then used for platform access and ongoing support.'
		}
	];
</script>

<section class="relative flex min-h-[70vh] items-center overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
	<div class="mx-auto flex max-w-2xl flex-col items-center space-y-7 text-center" use:reveal={{ delay: 0, y: 18 }}>
		<Eyebrow label="Coming soon" icon={Waveform} />
		<h1 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
			The DCI Early Warning System
		</h1>
		<p class="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
			Real-time emotional data, aggregated and analysed by AI, across a whole community. Log in,
			check your Connection Miles, and follow your community's Early Warning System.
		</p>
		<Button
			href="/"
			variant="outline"
			size="lg"
			class="rounded-full border-dci-teal/25 bg-transparent px-7 text-dci-teal-deep hover:bg-dci-teal/7"
		>
			<ArrowLeft class="size-4" weight="regular" />
			Back to DCI Wellness
		</Button>
	</div>
</section>

<section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div class="mx-auto max-w-5xl">
		<div class="grid gap-5 sm:grid-cols-2">
			{#each features as feature, index}
				{@const Icon = feature.icon}
				<div
					use:reveal={{ delay: index * 70, y: 18 }}
					class="rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-7 sm:p-8"
				>
					<div class="mb-5 flex size-12 items-center justify-center rounded-2xl bg-dci-teal/8 text-dci-teal">
						<Icon class="size-6" weight="duotone" />
					</div>
					<h3 class="text-lg font-semibold text-slate-950">{feature.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
				</div>
			{/each}
		</div>

		<div
			use:reveal={{ delay: 300, y: 14 }}
			class="mt-8 rounded-2xl bg-dci-teal-deep px-6 py-5 sm:px-8 sm:py-6 text-center"
		>
			<p class="text-sm sm:text-base font-medium text-dci-cream/90 leading-relaxed">
				Connection Miles enable organisations to transition from crisis reaction to early
				detection: pay-as-you-go data tracking that compounds with every toolkit sold, clinic
				hosted, and Champion trained.
			</p>
		</div>
	</div>
</section>
