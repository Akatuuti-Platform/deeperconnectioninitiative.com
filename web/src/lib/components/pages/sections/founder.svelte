<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

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
				class="overflow-hidden rounded-3xl border-[10px] border-dci-cream shadow-[0_24px_75px_-52px_rgba(26,60,64,0.6)]"
			>
				<img
					src="/photos/ann-banya.jpg"
					alt="Ann Banya, Early Child Development Specialist"
					loading="lazy"
					class="aspect-[4/5] w-full object-cover"
				/>
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
