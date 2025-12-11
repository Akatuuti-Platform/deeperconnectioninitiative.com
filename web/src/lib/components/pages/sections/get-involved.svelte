<script>
	import { paymentLinks } from '$lib/payment-links';
</script>

<section id="get-involved" class="w-full border-t border-slate-300/40">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
		<div class="max-w-3xl space-y-3">
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
				Bring deeper connection into your community
			</h2>
			<p class="text-base sm:text-lg font-normal leading-relaxed text-slate-800/95">
				Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a
				place for you in the DeeperConnection ecosystem.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
			<!-- Venue Partner -->
			<div
				class="rounded-2xl border border-slate-300/60 bg-[#F6ECD9]/80 p-4 flex flex-col justify-between gap-3"
			>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<span class="h-8 w-8 rounded-xl bg-[#2A6268]/10 flex items-center justify-center">
							<i class="lucide lucide-building-2 text-sm text-[#2A6268]" style="stroke-width: 1.5;"
							></i>
						</span>
						<span
							class="text-sm font-semibold tracking-tight text-slate-900"
							style="font-family: 'Lato', system-ui, -apple-system;">Become a Venue Partner</span
						>
					</div>
					<p class="text-sm font-normal leading-relaxed text-slate-800/95">
						Turn your café, studio, or space into a certified wellness hub hosting DCI conversation
						clinics and toolkits.
					</p>
				</div>
				<button
					class="mt-auto inline-flex items-center justify-center rounded-full border border-[#2A6268]/40 bg-transparent px-3 py-1.5 text-xs font-medium text-[#2A6268] hover:bg-[#2A6268]/5 transition-colors"
				>
					Apply as a venue
				</button>
			</div>

			<!-- Volunteer / DCI Angel -->
			<div
				class="rounded-2xl border border-slate-300/60 bg-[#F6ECD9]/80 p-4 flex flex-col justify-between gap-3"
			>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<span class="h-8 w-8 rounded-xl bg-[#6F231E]/10 flex items-center justify-center">
							<i class="lucide lucide-sparkles text-sm text-[#6F231E]" style="stroke-width: 1.5;"
							></i>
						</span>
						<span
							class="text-sm font-semibold tracking-tight text-slate-900"
							style="font-family: 'Lato', system-ui, -apple-system;"
							>Become a Volunteer (DCI Angel)</span
						>
					</div>
					<p class="text-sm font-normal leading-relaxed text-slate-800/95">
						Join monthly missions, support clinics, and help deliver toolkits and emotional first
						aid in real spaces.
					</p>
				</div>
				<button
					class="mt-auto inline-flex items-center justify-center rounded-full border border-[#6F231E]/40 bg-transparent px-3 py-1.5 text-xs font-medium text-[#6F231E] hover:bg-[#6F231E]/5 transition-colors"
				>
					Join the volunteer squad
				</button>
			</div>

			<!-- Mental Health Provider -->
			<div
				class="rounded-2xl border border-slate-300/60 bg-[#F6ECD9]/80 p-4 flex flex-col justify-between gap-3"
			>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<span class="h-8 w-8 rounded-xl bg-[#2A6268]/10 flex items-center justify-center">
							<i class="lucide lucide-stethoscope text-sm text-[#2A6268]" style="stroke-width: 1.5;"
							></i>
						</span>
						<span
							class="text-sm font-semibold tracking-tight text-slate-900"
							style="font-family: 'Lato', system-ui, -apple-system;">Mental Health Provider</span
						>
					</div>
					<p class="text-sm font-normal leading-relaxed text-slate-800/95">
						Join our responsible referral network and collaborate on community-centric, trauma-aware
						care pathways.
					</p>
				</div>
				<button
					class="mt-auto inline-flex items-center justify-center rounded-full border border-[#2A6268]/40 bg-transparent px-3 py-1.5 text-xs font-medium text-[#2A6268] hover:bg-[#2A6268]/5 transition-colors"
				>
					Join provider network
				</button>
			</div>

			<!-- Sponsor -->
			<div
				class="rounded-2xl border border-slate-300/60 bg-[#F6ECD9]/80 p-4 flex flex-col justify-between gap-3"
			>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<span class="h-8 w-8 rounded-xl bg-[#6F231E]/10 flex items-center justify-center">
							<i class="lucide lucide-heart text-sm text-[#6F231E]" style="stroke-width: 1.5;"></i>
						</span>
						<span
							class="text-sm font-semibold tracking-tight text-slate-900"
							style="font-family: 'Lato', system-ui, -apple-system;"
							>Corporate or Individual Sponsor</span
						>
					</div>
					<p class="text-sm font-normal leading-relaxed text-slate-800/95">
						Fund toolkits, clinics, and community champions so more people can access mental health
						support where it matters most.
					</p>
				</div>
				<a
					href={paymentLinks.donation}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-auto inline-flex items-center justify-center rounded-full bg-[#2A6268] px-3 py-1.5 text-xs font-medium text-[#EFE5D0] hover:bg-[#234f53] transition-colors"
				>
					Sponsor a kit
				</a>
			</div>
		</div>

		<!-- Simple sign-up placeholder -->
		<div
			class="rounded-3xl border border-slate-300/60 bg-[#F6ECD9]/90 p-5 flex flex-col md:flex-row items-center justify-between gap-4"
		>
			<div class="space-y-1">
				<span
					class="text-xs font-medium uppercase tracking-tight text-[#2A6268]"
					style="font-family: 'Lato', system-ui, -apple-system;">Stay connected</span
				>
				<p class="text-sm sm:text-base font-normal text-slate-800/95">
					Share your email to receive our monthly mission briefs, stories from the field, and ways
					to support.
				</p>
			</div>
			<form class="w-full md:w-auto flex flex-col sm:flex-row gap-2">
				<input
					type="email"
					placeholder="you@example.org"
					class="w-full sm:w-64 rounded-full border border-slate-300/80 bg-[#EFE5D0] px-3 py-2 text-sm font-normal text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2A6268]/50 focus:border-[#2A6268]/60"
				/>
				<button
					type="submit"
					class="inline-flex items-center justify-center rounded-full bg-[#2A6268] px-4 py-2 text-xs sm:text-sm font-medium text-[#EFE5D0] hover:bg-[#234f53] transition-colors"
				>
					Get mission updates
				</button>
			</form>
		</div>
	</div>
</section>
