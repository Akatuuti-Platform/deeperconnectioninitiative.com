<script>
	import {
		BuildingsIcon as Building2,
		HeartIcon as Heart,
		SparkleIcon as Sparkles,
		StethoscopeIcon as Stethoscope
	} from 'phosphor-svelte';
	import { paymentLinks } from '$lib/payment-links';
	import SpotIllustration from '$lib/components/spot-illustration.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="get-involved" class="relative w-full overflow-hidden bg-slate-50 py-24 rounded-b-4xl">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- <div class="text-center mb-16 gsap-reveal">
          <h2 class="text-4xl font-bold text-slate-900">There is a place for you here.</h2>
          <p class="text-slate-600 mt-4 max-w-2xl mx-auto">Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a place for you in the DeeperConnection ecosystem.</p>
        </div> -->
		<div
			class="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-12"
		>
			<div class="max-w-3xl space-y-3" use:reveal={{ delay: 0, y: 18 }}>
				<p
					class="text-xs font-medium uppercase tracking-tight text-dci-teal"				>
					Get involved
				</p>
				<h2
					class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900"				>
					There is a place for you here
				</h2>
				<p class="text-base sm:text-lg font-normal leading-relaxed text-slate-800/95">
					Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a
					place for you in the DeeperConnection ecosystem.
				</p>
			</div>

			<div class="pointer-events-none hidden justify-end lg:flex">
				<SpotIllustration
					variant="community"
					class="dci-float-slow -mt-16 w-80 opacity-95 [--float-rotate:2deg]"
				/>
			</div>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4" id="involved-grid">
			<!-- Cards... -->
			<div
				use:reveal={{ delay: 0, y: 18 }}
				class="involved-card dci-soft-hover bg-white p-6 rounded-xl border border-slate-200 hover:border-dci-teal transition-all cursor-pointer h-full flex flex-col overflow-hidden"
			>
				<img
					src="/photos/section7-venue.jpg"
					alt="A wellness hub hosting a DCI clinic"
					loading="lazy"
					class="-mx-6 -mt-6 mb-4 block h-28 w-[calc(100%+3rem)] max-w-none object-cover"
				/>
				<div
					class="h-12 w-12 rounded-lg bg-dci-sand flex items-center justify-center text-dci-teal mb-4"
				>
					<Building2 class="size-6" weight="duotone" />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">Venue Partner</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Turn your café, studio, or space into a certified wellness hub hosting DCI clinics.
				</p>
				<span class="text-xs font-bold text-dci-teal">Apply now &rarr;</span>
			</div>

			<div
				use:reveal={{ delay: 70, y: 18 }}
				class="involved-card dci-soft-hover bg-white p-6 rounded-xl border border-slate-200 hover:border-dci-burgundy transition-all cursor-pointer h-full flex flex-col overflow-hidden"
			>
				<img
					src="/photos/champion-training-hero.jpg"
					alt="DCI Angels supporting a clinic"
					loading="lazy"
					class="-mx-6 -mt-6 mb-4 block h-28 w-[calc(100%+3rem)] max-w-none object-cover"
				/>
				<div
					class="h-12 w-12 rounded-lg bg-dci-sand flex items-center justify-center text-dci-burgundy mb-4"
				>
					<Sparkles class="size-6" weight="duotone" />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">DCI Angel</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Join monthly missions, support clinics, and help deliver emotional first aid.
				</p>
				<span class="text-xs font-bold text-dci-burgundy">Join squad &rarr;</span>
			</div>

			<div
				use:reveal={{ delay: 140, y: 18 }}
				class="involved-card dci-soft-hover bg-white p-6 rounded-xl border border-slate-200 hover:border-dci-teal transition-all cursor-pointer h-full flex flex-col overflow-hidden"
			>
				<img
					src="/photos/section7-clinics.jpg"
					alt="A Conversation Clinic in session"
					loading="lazy"
					class="-mx-6 -mt-6 mb-4 block h-28 w-[calc(100%+3rem)] max-w-none object-cover"
				/>
				<div
					class="h-12 w-12 rounded-lg bg-dci-sand flex items-center justify-center text-dci-teal mb-4"
				>
					<Stethoscope class="size-6" weight="duotone" />
				</div>
				<h3 class="font-bold text-slate-900 mb-2">Provider Network</h3>
				<p class="text-sm text-slate-600 mb-4 flex-grow">
					Join our responsible referral network and collaborate on trauma-aware care.
				</p>
				<span class="text-xs font-bold text-dci-teal">Join network &rarr;</span>
			</div>

			<div
				use:reveal={{ delay: 210, y: 18 }}
				class="involved-card dci-soft-hover bg-dci-teal p-6 rounded-xl border border-dci-teal hover:bg-[#234f53] transition-all cursor-pointer h-full flex flex-col"
			>
				<div
					class="h-12 w-12 rounded-lg bg-[#ffffff]/20 flex items-center justify-center text-white mb-4"
				>
					<Heart class="size-6" weight="duotone" />
				</div>
				<h3 class="font-bold text-white mb-2">Sponsor</h3>
				<p class="text-sm text-dci-sand/80 mb-4 flex-grow">
					Fund toolkits and clinics so more people can access mental health support.
				</p>
				<a href={paymentLinks.donation} target="_blank" rel="noopener noreferrer">
					<span class="text-xs font-bold text-white">Sponsor a kit &rarr;</span>
				</a>
			</div>
		</div>

		<!-- Newsletter -->
		<!-- <div class="mt-16 rounded-3xl bg-dci-sand border border-dci-teal/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 gsap-reveal">
          <div class="space-y-1 text-center md:text-left">
             <h4 class="font-bold text-slate-900 text-lg">Stay Connected</h4>
             <p class="text-sm text-slate-700">Receive monthly mission briefs and stories from the field.</p>
          </div>
          <form class="flex w-full md:w-auto gap-2">
             <input type="email" placeholder="you@example.org" class="w-full md:w-64 rounded-full border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-dci-teal focus:outline-none">
             <button class="rounded-full bg-dci-teal px-6 py-2 text-sm font-bold text-white hover:bg-[#1f4a4e]">Subscribe</button>
          </form>
        </div> -->
	</div>
</section>
