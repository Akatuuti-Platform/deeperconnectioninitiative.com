<script lang="ts">
	import { ArrowUpRight, HeartHandshake, QrCode, Sparkles } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';

	const products = [
		{
			name: 'DCI Card Game',
			kicker: 'Conversation Cards',
			description:
				'A gentle way to open conversations around emotions, relationships, identity, and lived experience without pressure or judgment.',
			price: '69,000 UGX',
			paymentLink: paymentLinks.cardGame,
			accent: 'text-[#6F231E]',
			border: 'border-[#6F231E]/20'
		},
		{
			name: 'DCI Reflection Journal',
			kicker: 'Guided Reflection',
			description:
				'A guided journal designed to support reflection, emotional processing, and clarity even for people who do not usually write.',
			price: '120,000 UGX',
			paymentLink: paymentLinks.journal,
			accent: 'text-[#2A6268]',
			border: 'border-[#2A6268]/20'
		},
		{
			name: 'DCI Mood Tracker',
			kicker: 'Daily Awareness',
			description:
				'A simple daily tool that helps people notice emotional patterns over time, especially where mental health language is limited.',
			price: '31,000 UGX',
			paymentLink: paymentLinks.moodTracker,
			accent: 'text-slate-700',
			border: 'border-slate-300'
		}
	];
</script>

<section id="toolkit" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
	<div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
		<header class="space-y-6 lg:sticky lg:top-28 lg:self-start">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
			>
				<span class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
					The Deeper Connection Toolkit
				</span>
			</div>
			<div class="space-y-4">
				<h2
					class="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl"
				>
					Physical tools for conversations people can actually start.
				</h2>
				<p class="max-w-md text-base leading-relaxed text-slate-700 sm:text-lg">
					Designed for homes, schools, clinics, youth groups, and community circles where support
					needs to work without perfect internet, expert language, or a formal therapy room.
				</p>
			</div>

			<div class="grid max-w-md grid-cols-2 gap-3 text-sm text-slate-700">
				<div class="rounded-2xl border border-[#2A6268]/15 bg-white/45 p-4">
					<QrCode class="mb-5 size-5 text-[#2A6268]" strokeWidth={1.8} />
					QR access to low-data digital resources.
				</div>
				<div class="rounded-2xl border border-[#6F231E]/15 bg-white/45 p-4">
					<HeartHandshake class="mb-5 size-5 text-[#6F231E]" strokeWidth={1.8} />
					10% supports training and donated kits.
				</div>
			</div>
		</header>

		<div class="space-y-6">
			{#each products as product, index}
				<article
					class={`group grid overflow-hidden rounded-[2rem] border bg-[#ffffeb] shadow-[0_24px_70px_-55px_rgba(0,0,0,0.65)] transition duration-500 hover:-translate-y-1 md:grid-cols-[0.82fr_1fr] ${product.border}`}
				>
					<div class={`relative min-h-72 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
						<div
							class={`flex h-full min-h-72 items-center justify-center p-8 transition duration-700 group-hover:scale-[1.03] ${index === 0 ? 'bg-[#EAD5C8]' : index === 1 ? 'bg-[#EEF1E5]' : 'bg-[#ECE7DA]'}`}
						>
							{#if index === 0}
								<div class="grid w-full max-w-[270px] grid-cols-3 gap-3 -rotate-6">
									{#each Array(9) as _, cardIndex}
										<div
											class={`aspect-[3/4] rounded-xl border border-[#6F231E]/15 p-3 shadow-sm ${cardIndex % 3 === 0 ? 'bg-[#ffffeb]' : cardIndex % 3 === 1 ? 'bg-[#DFA169]' : 'bg-[#F4D5D0]'}`}
										>
											<div class="h-1.5 w-9 rounded-full bg-[#6F231E]/45"></div>
											<div class="mt-8 space-y-1.5">
												<div class="h-1 rounded-full bg-[#6F231E]/20"></div>
												<div class="h-1 rounded-full bg-[#6F231E]/20"></div>
												<div class="h-1 w-2/3 rounded-full bg-[#6F231E]/20"></div>
											</div>
										</div>
									{/each}
								</div>
							{:else if index === 1}
								<div
									class="aspect-[4/5] w-full max-w-[250px] rounded-2xl bg-[#F6ECD9] p-6 shadow-[0_22px_45px_-35px_rgba(0,0,0,0.7)]"
								>
									<div class="h-full rounded-xl border-2 border-[#2A6268]/25 p-5">
										<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">
											Reflection Journal
										</p>
										<div class="mt-14 space-y-3">
											<div class="h-2 rounded-full bg-[#2A6268]/25"></div>
											<div class="h-2 rounded-full bg-[#2A6268]/20"></div>
											<div class="h-2 w-2/3 rounded-full bg-[#2A6268]/20"></div>
										</div>
									</div>
								</div>
							{:else}
								<div
									class="aspect-[4/5] w-full max-w-[250px] rounded-2xl bg-[#ffffeb] p-6 shadow-[0_22px_45px_-35px_rgba(0,0,0,0.7)]"
								>
									<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">
										Mood Tracker
									</p>
									<div class="mt-10 grid grid-cols-5 gap-2">
										{#each Array(25) as _, dotIndex}
											<div
												class={`aspect-square rounded-full ${dotIndex % 5 === 0 ? 'bg-[#6F231E]' : dotIndex % 4 === 0 ? 'bg-[#DFA169]' : 'bg-[#2A6268]/25'}`}
											></div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
						<div
							class="absolute top-4 left-4 rounded-full bg-[#ffffeb]/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-slate-700"
						>
							{product.kicker}
						</div>
					</div>

					<div class="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
						<div class="space-y-4">
							<h3 class="text-3xl font-semibold leading-tight text-slate-950">{product.name}</h3>
							<p class="max-w-md text-base leading-relaxed text-slate-700">{product.description}</p>
						</div>

						<div class="flex flex-wrap items-center gap-4">
							<p class={`text-xl font-bold ${product.accent}`}>{product.price}</p>
							<Button href={product.paymentLink} class="rounded-full px-5">
								Get this tool
								<ArrowUpRight class="size-4" strokeWidth={1.8} />
							</Button>
						</div>
					</div>
				</article>
			{/each}

			<article class="overflow-hidden rounded-[2rem] bg-[#171817] text-[#F6ECD9]">
				<div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
					<div class="space-y-5">
						<div
							class="inline-flex items-center gap-2 rounded-full border border-[#F6ECD9]/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#F6ECD9]/75"
						>
							<Sparkles class="size-3.5" strokeWidth={1.8} />
							Recommended
						</div>
						<h3 class="text-4xl font-semibold leading-tight text-white">The full toolkit</h3>
						<p class="max-w-xl text-base leading-relaxed text-[#F6ECD9]/75">
							Card Game, Reflection Journal, Mood Tracker, and QR access bundled for everyday
							self-awareness, group facilitation, and community support.
						</p>
					</div>

					<div
						class="flex flex-col justify-between gap-8 border-t border-[#F6ECD9]/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
					>
						<div>
							<p class="text-sm uppercase tracking-widest text-[#F6ECD9]/55">Complete kit</p>
							<div class="mt-2 flex items-end gap-3">
								<span class="text-5xl font-bold text-white">200k</span>
								<span class="mb-2 text-sm text-[#F6ECD9]/60">UGX</span>
							</div>
							<p class="mt-3 text-xs text-[#F6ECD9]/55">10% funds community champion training.</p>
						</div>

						<div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
							<Button
								href={paymentLinks.toolkit}
								size="lg"
								class="rounded-full bg-[#F6ECD9] text-[#171817] hover:bg-white"
							>
								Buy complete kit
							</Button>
							<Button
								href={paymentLinks.donation}
								size="lg"
								variant="outline"
								class="rounded-full border-[#F6ECD9]/30 bg-transparent text-[#F6ECD9] hover:bg-[#F6ECD9]/10"
							>
								Sponsor a kit
							</Button>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</section>
