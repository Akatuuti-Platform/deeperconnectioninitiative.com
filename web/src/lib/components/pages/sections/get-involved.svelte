<script>
	import { Building2, Heart, Sparkles, Stethoscope } from '@lucide/svelte';
	import { paymentLinks } from '$lib/payment-links';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
</script>

<section id="get-involved" class="relative w-full overflow-hidden bg-slate-50 py-24 rounded-b-4xl">
	<SpotIllustration
		variant="community"
		class="pointer-events-none absolute -right-8 top-8 hidden w-72 rotate-2 opacity-95 lg:block xl:right-12"
	/>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- <div class="text-center mb-16 gsap-reveal">
          <h2 class="text-4xl font-bold text-slate-900">There is a place for you here.</h2>
          <p class="text-slate-600 mt-4 max-w-2xl mx-auto">Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a place for you in the DeeperConnection ecosystem.</p>
        </div> -->
		<div class="max-w-3xl space-y-3 mb-16 gsap-reveal">
			<p
				class="text-xs font-medium uppercase tracking-tight text-[#2A6268]"
				style="font-family: 'Lato', system-ui, -apple-system;"
			>
				Get involved
			</p>
			<h2
				class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900"
				style="font-family: 'Lato', system-ui, -apple-system;"
			>
				There is a place for you here
			</h2>
			<p class="text-base sm:text-lg font-normal leading-relaxed text-slate-800/95">
				Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a
				place for you in the DeeperConnection ecosystem.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4" id="involved-grid">
			<!-- Cards... -->
			<div
				class="involved-card bg-white p-6 rounded-xl border border-slate-200 hover:border-[#2A6268] transition-all cursor-pointer h-full flex flex-col"
			>
				<div
					class="h-12 w-12 rounded-lg bg-[#EFE5D0] flex items-center justify-center text-[#2A6268] mb-4"
				>
					<Building2 class="size-6" strokeWidth={1.8} />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">Venue Partner</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Turn your café, studio, or space into a certified wellness hub hosting DCI clinics.
				</p>
				<span class="text-xs font-bold text-[#2A6268]">Apply now &rarr;</span>
			</div>

			<div
				class="involved-card bg-white p-6 rounded-xl border border-slate-200 hover:border-[#6F231E] transition-all cursor-pointer h-full flex flex-col"
			>
				<div
					class="h-12 w-12 rounded-lg bg-[#EFE5D0] flex items-center justify-center text-[#6F231E] mb-4"
				>
					<Sparkles class="size-6" strokeWidth={1.8} />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">DCI Angel</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Join monthly missions, support clinics, and help deliver emotional first aid.
				</p>
				<span class="text-xs font-bold text-[#6F231E]">Join squad &rarr;</span>
			</div>

			<div
				class="involved-card bg-white p-6 rounded-xl border border-slate-200 hover:border-[#2A6268] transition-all cursor-pointer h-full flex flex-col"
			>
				<div
					class="h-12 w-12 rounded-lg bg-[#EFE5D0] flex items-center justify-center text-[#2A6268] mb-4"
				>
					<Stethoscope class="size-6" strokeWidth={1.8} />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">Provider Network</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Join our responsible referral network and collaborate on trauma-aware care.
				</p>
				<span class="text-xs font-bold text-[#2A6268]">Join network &rarr;</span>
			</div>

			<div
				class="involved-card bg-[#2A6268] p-6 rounded-xl border border-[#2A6268] hover:bg-[#234f53] transition-all cursor-pointer h-full flex flex-col"
			>
				<div
					class="h-12 w-12 rounded-lg bg-[#ffffff]/20 flex items-center justify-center text-white mb-4"
				>
					<Heart class="size-6" strokeWidth={1.8} />
				</div>
				<h3 class="font-bold text-white mb-2">Sponsor</h3>
				<p class="text-sm text-[#EFE5D0]/80 mb-4 flex-grow">
					Fund toolkits and clinics so more people can access mental health support.
				</p>
				<a href={paymentLinks.donation}>
					<span class="text-xs font-bold text-white">Sponsor a kit &rarr;</span>
				</a>
			</div>
		</div>

		<!-- Newsletter -->
		<!-- <div class="mt-16 rounded-3xl bg-[#EFE5D0] border border-[#2A6268]/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 gsap-reveal">
          <div class="space-y-1 text-center md:text-left">
             <h4 class="font-bold text-slate-900 text-lg">Stay Connected</h4>
             <p class="text-sm text-slate-700">Receive monthly mission briefs and stories from the field.</p>
          </div>
          <form class="flex w-full md:w-auto gap-2">
             <input type="email" placeholder="you@example.org" class="w-full md:w-64 rounded-full border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-[#2A6268] focus:outline-none">
             <button class="rounded-full bg-[#2A6268] px-6 py-2 text-sm font-bold text-white hover:bg-[#1f4a4e]">Subscribe</button>
          </form>
        </div> -->
	</div>
</section>
