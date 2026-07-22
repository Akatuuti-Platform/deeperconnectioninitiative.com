<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { PlayIcon } from 'phosphor-svelte';

	let showVideo = $state(false);

	const videoId = 'wMUYQ6uZn0Q';

	const affiliations = [
		'UPFMH',
		'Butabika National Referral Hospital',
		'Ministry of Education Uganda'
	];
</script>

<section id="founder" class="w-full bg-white relative z-10 overflow-hidden">
	<div
		class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-center"
	>
		<div class="relative" use:reveal={{ delay: 0, y: 18 }}>
			<div
				class="overflow-hidden rounded-3xl border-[10px] border-dci-cream shadow-dci-teal"
			>
				{#if showVideo}
					<div class="aspect-video w-full">
						<iframe
							src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
							title="Ann Banya — Deeper Connection Initiative"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
							class="h-full w-full"
						></iframe>
					</div>
				{:else}
					<button
						type="button"
						onclick={() => (showVideo = true)}
						class="group relative block w-full cursor-pointer"
						aria-label="Play video about Ann Banya and DCI"
					>
						<img
							src="/photos/ann-banya.jpg"
							alt="Ann Banya, Early Child Development Specialist"
							loading="lazy"
							class="aspect-video w-full object-cover"
						/>
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30"
						>
							<span
								class="flex size-16 items-center justify-center rounded-full bg-white/90 text-dci-teal-deep shadow-lg transition group-hover:scale-110"
							>
								<PlayIcon class="size-7 ml-0.5" weight="fill" />
							</span>
						</div>
					</button>
				{/if}
			</div>
		</div>

		<div class="space-y-5" use:reveal={{ delay: 120, y: 18 }}>
			<div
				class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
			>
				<span class="text-xs font-semibold tracking-wide text-dci-teal uppercase"
					>Recognised infrastructure</span
				>
			</div>

			<h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
				40+ years of experience started this journey
			</h2>

			<div class="space-y-1">
				<p class="text-lg font-semibold text-slate-900">Ann Banya</p>
				<p class="text-base text-dci-teal">
					Early Child Development Specialist &middot; 40 years of experience
				</p>
			</div>

			<p class="text-base leading-relaxed text-slate-700">
				DCI is built on clinical-grade depth, not an emerging idea. Every toolkit, clinic, and
				training carries decades of behavioural-health experience behind it.
			</p>

			<div class="pt-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
					Trusted alongside
				</p>
				<ul class="flex flex-wrap gap-2">
					{#each affiliations as name}
						<li
							class="rounded-full border border-dci-sand bg-dci-cream/60 px-4 py-1.5 text-sm font-medium text-slate-800"
						>
							{name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
