<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon } from 'phosphor-svelte';
</script>

<section class="w-full bg-dci-cream relative z-10 overflow-hidden">
	<div
		class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16"
		use:reveal={{ delay: 0, y: 18 }}
	>
		<div
			class="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-dci-teal/12 bg-white p-8 sm:flex-row sm:p-10"
		>
			<div>
				<h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
					Running a school, company, or NGO?
				</h2>
				<p class="mt-2 max-w-lg text-base leading-relaxed text-slate-600">
					See how organisations use DCI to build internal wellness infrastructure their people
					actually use.
				</p>
			</div>
			<a
				href="/partners"
				class="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-dci-teal-deep px-6 text-sm font-semibold text-dci-cream transition hover:bg-[#234F53] active:scale-[0.98]"
			>
				See how organisations use DCI
				<ArrowUpRightIcon class="size-4" weight="regular" />
			</a>
		</div>
	</div>
</section>
