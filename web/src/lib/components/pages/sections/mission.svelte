<script lang="ts">
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
</script>

<section id="about" class="w-full bg-white relative z-10 overflow-hidden rounded-[4rem]">
	<SpotIllustration
		variant="care"
		class="pointer-events-none absolute -right-16 top-0 hidden w-[24rem] rotate-2 opacity-95 lg:block xl:right-0"
	/>
	<div
		class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start"
	>
		<div class="space-y-4 md:sticky top-24">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
			>
				<span class="text-xs font-semibold tracking-wide text-[#2A6268] uppercase"
					>The Philosophy</span
				>
			</div>
			<h2
				class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900"
				style="font-family: 'Lato', system-ui;"
			>
				Our Mission
			</h2>
			<p class="text-lg font-medium leading-relaxed text-slate-600">
				DCI exists to shift mental health from a passive service model to an
				<span class="text-[#2A6268]">active, self-led journey.</span>
			</p>
			<p class="text-base leading-relaxed pt-2">
				Through our ecosystem of tools, education, and community support, we're building a world
				where mental wellness is accessible, sustainable, and rooted in human connection.
			</p>
		</div>

		<div class="space-y-8 bg-[#EFE5D0]/30 p-8 rounded-3xl border border-[#EFE5D0]">
			<ul class="space-y-4 text-base font-normal leading-relaxed text-slate-800">
				<li class="flex gap-4 items-start">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-[#2A6268] flex-shrink-0"></span>
					<span
						><strong>Offline Toolkits</strong> enable reflection, conversation, and healing even without
						internet access.</span
					>
				</li>
				<li class="flex gap-4 items-start">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-[#2A6268] flex-shrink-0"></span>
					<span
						><strong>Digital Wellness Library</strong> delivers practical, bite-sized learning.</span
					>
				</li>
				<li class="flex gap-4 items-start">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-[#2A6268] flex-shrink-0"></span>
					<span
						><strong>Conversation Clinics:</strong> Transforming how communities talk, listen, and support
						each other's mental health.</span
					>
				</li>
				<li class="flex gap-4 items-start">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-[#2A6268] flex-shrink-0"></span>
					<span
						><strong>Community Champions & Partner Trainings</strong> equip local leaders to guide healing
						safely.</span
					>
				</li>
				<li class="flex gap-4 items-start">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-[#2A6268] flex-shrink-0"></span>
					<span
						><strong>DCI Angels & Monthly Missions</strong> activate volunteers to bring wellness into
						everyday spaces.</span
					>
				</li>
			</ul>

			<div class="pt-4 border-t border-slate-200">
				<p class="text-lg font-normal leading-relaxed text-slate-900">
					Help individuals and communities <span class="font-bold text-[#2A6268]">
						own their healing</span
					>
					while building resilient, accessible mental health ecosystems.

					<br />
					<span class="italic text-slate-600 text-base">
						Ownership doesn't replace support — it makes support stronger. .</span
					>
				</p>
			</div>
		</div>
	</div>
</section>
