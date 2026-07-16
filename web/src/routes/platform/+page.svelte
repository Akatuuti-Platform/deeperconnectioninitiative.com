<script lang="ts">
	import { WaveformIcon as Waveform, ArrowLeftIcon as ArrowLeft } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import Eyebrow from '$lib/components/sections/eyebrow.svelte';
</script>

<section class="relative flex min-h-[70vh] items-center overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
	<div class="mx-auto flex max-w-2xl flex-col items-center space-y-7 text-center" use:reveal={{ delay: 0, y: 18 }}>
		<Eyebrow label="Coming soon" icon={Waveform} />
		<h1 class="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
			The DCI Early Warning System
		</h1>
		<p class="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
			Log in, check your Connection Miles, and follow your community's Early Warning System. This is
			where it will live once it's ready.
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
