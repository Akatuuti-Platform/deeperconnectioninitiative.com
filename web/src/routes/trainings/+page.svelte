<script lang="ts">
	import { Check, Award } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { paymentLinks } from '$lib/payment-links';
 

	const tiers = [
		{
			id: 'tier1',
			name: 'Foundation Level',
			subtitle: 'Community Champion Certification',
			price: 'UGX 500,000',
			duration: '2-Day Training',
			bestFor: 'Individuals, venue staff, volunteers',
			icon: '👤',
			includes: [
				'Full T.O.T manual (digital + print)',
				'Community Champion certification',
				'2-day intensive training (16 hours)',
				'DCI Card Game facilitation skills',
				'Access to digital resource library (100 videos)',
				'Conversation Clinic setup guide',
				'Marketing materials toolkit',
				'Annual refresher course (free)',
				'Official DCI Champion badge',
				'Listed in public Champion directory'
			],
			outcomes: [
				'Facilitate weekly Wellness Wednesday clinics',
				'Use DCI Toolkit with confidence',
				'Create safe, judgment-free spaces',
				'Support 30-50 people per session'
			],
			cta: 'Become a Champion',
			paymentLink: paymentLinks.certifications.foundationLevelCommunityChampionCertification
		},
		{
			id: 'tier2',
			name: 'Advanced Level',
			subtitle: 'Institutional Scale Certification',
			price: 'UGX 1,500,000',
			additionalPricing: '+ UGX 400K per additional Champion',
			duration: '3-Day Training + Follow-up',
			bestFor: 'Schools, rehabs, NGOs, corporates',
			popular: true,
			includes: [
				'Everything in Foundation Level',
				'Train up to 3 Champions in one cohort',
				'3-day advanced training (24 hours)',
				'Institutional customization workshop',
				'Program design for your context',
				'Mood tracker training for counselors',
				'Group facilitation techniques',
				'Trauma-informed approaches',
				'Impact measurement tools',
				'3-month follow-up support',
				'Quarterly check-in calls'
			],
			outcomes: [
				'Launch internal wellness program',
				'Train multiple Champions in your org',
				'Customize for your population',
				'Integrate with existing services'
			],
			cta: 'Scale Your Impact',
			paymentLink: paymentLinks.certifications.advancedLevelInstitutionalChampionCertification
		},
		{
			id: 'tier3',
			name: 'Master Trainer',
			subtitle: 'Certified Trainer Certification',
			price: 'UGX 3,000,000',
			profitShare: '30% revenue share on trainings you deliver',
			duration: '5-Day Intensive + Practicum',
			bestFor: 'Mental health professionals, entrepreneurs',
			includes: [
				'Everything in Advanced Level',
				'5-day master training (40 hours)',
				'Train-the-trainer methodology',
				'Curriculum delivery certification',
				'Quality assurance protocols',
				'Independent training rights',
				'DCI Master Trainer license',
				'Co-branding permissions',
				'Lead generation support',
				'Marketing collateral access',
				'30% profit split on Tier 1 trainings',
				'20% profit split on Tier 2 trainings',
				'Build your own Champion network',
				'Listed as official DCI trainer',
				'Annual Master Trainer summit'
			],
			outcomes: [
				'Train others independently',
				'Generate revenue from trainings',
				'Build regional Champion networks',
				'Expand DCI across districts'
			],
			cta: 'Become a Master',
			paymentLink: paymentLinks.certifications.masterTrainerCertification
		}
	];

	const processSteps = [
		{ step: 1, title: 'Apply Online', desc: 'Fill form & select tier', icon: '📝' },
		{ step: 2, title: 'Make Payment', desc: 'MoMo, Airtel, or card', icon: '💳' },
		{ step: 3, title: 'Pre-Training', desc: 'Receive digital manual', icon: '📚' },
		{ step: 4, title: 'Attend Training', desc: '2-5 days intensive', icon: '🎓' },
		{ step: 5, title: 'Get Certified', desc: 'Receive certificate & start', icon: '🏆' }
	];
</script>

<div class="min-h-screen bg-[#EFE5D0]">
	<!-- Hero Section -->
	<section class="bg-[#2A6268] text-white py-20 px-6">
		<div class="max-w-7xl mx-auto">
			<div class="text-center max-w-4xl mx-auto">
				<div
					class="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-6"
				>
					🎓 Training of Trainers (T.O.T) Certification
				</div>
				<h1 class="text-5xl lg:text-6xl font-black mb-6 font-sans">Become a Community Champion</h1>
				<p class="text-xl mb-8 opacity-90 font-body leading-relaxed">
					Empower yourself or your organization to facilitate healing conversations. Choose the
					certification level that matches your impact goals.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						class="bg-white text-[#2A6268] px-8 py-6 rounded-full text-lg font-bold hover:bg-white/90 transition"
					>
						Compare All Tiers
					</Button>
					<Button
						class="border-2 border-white bg-transparent text-white px-8 py-6 rounded-full text-lg font-bold hover:bg-white hover:text-[#2A6268] transition"
					>
						Download Brochure
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Tiers -->
	<section class="py-20 px-6">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-black text-gray-900 mb-4 font-sans">
					Choose Your Certification Level
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
					From individual champions to institutional programs to master trainers building regional
					networks— there's a pathway for every level of impact.
				</p>
			</div>

			<div class="grid lg:grid-cols-3 gap-8">
				{#each tiers as tier, index}
					<div
						class="relative bg-[#F6ECD9] rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 {tier.popular
							? 'border-[#2A6268] scale-105'
							: 'border-slate-300/40'}"
					>
						{#if tier.popular}
							<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<div
									class="bg-[#2A6268] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
								>
									⭐ Most Popular
								</div>
							</div>
						{/if}

						<div
							class="{index === 0
								? 'bg-[#2A6268]'
								: index === 1
									? 'bg-[#6F231E]'
									: 'bg-[#2A6268]'} text-white p-8 rounded-t-3xl"
						>
							<div class="text-6xl mb-4">{tier.icon}</div>
							<h3 class="text-2xl font-black mb-2 font-sans">{tier.name}</h3>
							<p class="text-sm opacity-90 mb-6 font-body">{tier.subtitle}</p>
							<div class="text-5xl font-black mb-2 font-sans">{tier.price}</div>
							{#if tier.additionalPricing}
								<div class="text-sm opacity-90 mb-2 font-body">{tier.additionalPricing}</div>
							{/if}
							{#if tier.profitShare}
								<div
									class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-2"
								>
									{tier.profitShare}
								</div>
							{/if}
							<div class="text-sm opacity-90 font-body">{tier.duration}</div>
						</div>

						<div class="p-8">
							<div class="mb-6">
								<div class="text-sm font-semibold text-gray-600 mb-2 font-sans">BEST FOR:</div>
								<div class="text-gray-900 font-body">{tier.bestFor}</div>
							</div>

							<div class="mb-6">
								<div class="text-sm font-semibold text-gray-900 mb-3 font-sans">
									WHAT'S INCLUDED:
								</div>
								<ul class="space-y-2">
									{#each tier.includes as item}
										<li class="flex items-start gap-2 text-sm text-gray-700">
											<Check class="w-4 h-4 text-[#2A6268] flex-shrink-0 mt-0.5" />
											<span class="font-body">{item}</span>
										</li>
									{/each}
								</ul>
							</div>

							<div class="mb-8">
								<div class="text-sm font-semibold text-gray-900 mb-3 font-sans">
									YOU'LL BE ABLE TO:
								</div>
								<ul class="space-y-2">
									{#each tier.outcomes as item}
										<li class="flex items-start gap-2 text-sm text-gray-700">
											<Award class="w-4 h-4 text-[#6F231E] flex-shrink-0 mt-0.5" />
											<span class="font-body">{item}</span>
										</li>
									{/each}
								</ul>
							</div>

							<a href={tier.paymentLink} target="_blank" rel="noopener noreferrer" class="w-full">
								<Button
									class="w-full {index === 0
										? 'bg-[#2A6268] hover:bg-[#2A6268]/90'
										: index === 1
											? 'bg-[#6F231E] hover:bg-[#6F231E]/90'
											: 'bg-[#2A6268] hover:bg-[#2A6268]/90'} text-white py-6 rounded-full font-bold transition shadow-lg"
								>
									{tier.cta}
								</Button>
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Timeline -->
	<section class="py-20 px-6 bg-[#F6ECD9]">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-black text-gray-900 mb-12 text-center font-sans">
				How T.O.T Certification Works
			</h2>
			<div class="grid md:grid-cols-5 gap-6">
				{#each processSteps as step}
					<div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-300/40">
						<div class="text-5xl mb-3">{step.icon}</div>
						<div
							class="bg-[#2A6268] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3"
						>
							{step.step}
						</div>
						<h4 class="font-bold text-gray-900 mb-2 font-sans">{step.title}</h4>
						<p class="text-sm text-gray-600 font-body">{step.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-20 px-6 bg-[#2A6268] text-white">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl font-black mb-6 font-sans">Ready to Become a Certified Champion?</h2>
			<p class="text-xl mb-8 font-body leading-relaxed">
				Join 500+ trained Champions healing Uganda one conversation at a time
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href={paymentLinks.certifications.foundationLevelCommunityChampionCertification}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						class="bg-[#6F231E] text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-[#6F231E]/90 transition shadow-lg"
					>
						Apply for T.O.T Now
					</Button>
				</a>
				<Button
					class="bg-white text-[#2A6268] px-12 py-6 rounded-full text-xl font-bold hover:bg-white/90 transition"
				>
					Schedule a Call
				</Button>
			</div>
		</div>
	</section>
</div>
