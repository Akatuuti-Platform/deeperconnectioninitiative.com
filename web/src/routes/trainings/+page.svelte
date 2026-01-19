<script lang="ts">
	import { Check, Award } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { paymentLinks } from '$lib/payment-links';
//  import gsap from "gsap";

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

	//   document.addEventListener("DOMContentLoaded", (event) => {
    //   gsap.registerPlugin(ScrollTrigger);
      
    //   // Generic Reveal
    //   gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    //     gsap.fromTo(elem, 
    //       { y: 50, autoAlpha: 0 },
    //       {
    //         y: 0, 
    //         autoAlpha: 1, 
    //         duration: 1, 
    //         ease: "power2.out",
    //         scrollTrigger: { trigger: elem, start: "top 85%" }
    //       }
    //     );
    //   });

    //   // Staggered Pricing Cards
    //   gsap.fromTo(".gsap-stagger-card", 
    //     { y: 50, autoAlpha: 0 },
    //     {
    //       y: 0,
    //       autoAlpha: 1,
    //       stagger: 0.15,
    //       duration: 0.8,
    //       scrollTrigger: { trigger: "#training-grid", start: "top 75%" }
    //     }
    //   );

    //   // Staggered Steps
    //   gsap.fromTo(".gsap-stagger-step", 
    //     { y: 30, autoAlpha: 0 },
    //     {
    //       y: 0,
    //       autoAlpha: 1,
    //       stagger: 0.1,
    //       duration: 0.6,
    //       scrollTrigger: { trigger: "#process-grid", start: "top 80%" }
    //     }
    //   );
    // });
</script>

<!-- Texture -->
<div class="bg-noise"></div>

<main class="flex-1">
	<!-- HERO SECTION -->
	<section class="bg-primary text-primary-foreground py-32 lg:py-56 px-6 relative overflow-hidden">
		<!-- Background Pattern -->
		<div
			class="absolute inset-0 opacity-10 pointer-events-none"
			style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"
		></div>

		<div class="max-w-7xl mx-auto relative z-10 text-center gsap-reveal">
			<Badge
				variant="outline"
				class="mb-6 border-white/30 bg-white/20 px-6 py-2 text-sm font-bold backdrop-blur-sm hover:bg-white/20 text-white"
			>
				🎓 Training of Trainers (T.O.T) Certification
			</Badge>
			<h1
				class="font-bold tracking-tight text-center text-balance leading-tight sm:text-5xl lg:text-6xl text-4xl mb-6"
			>
				Become a Community Champion
			</h1>
			<p class="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
				Empower yourself or your organization to facilitate healing conversations. Choose the
				certification level that matches your impact goals.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button href="#tiers" variant="secondary" size="lg" class="shadow-lg font-bold">
					Compare All Tiers
				</Button>
				<Button
					href="#"
					variant="outline"
					size="lg"
					class="border-white bg-transparent text-white hover:bg-white hover:text-primary transition shadow-lg font-bold"
				>
					Download Brochure
				</Button>
			</div>
		</div>
	</section>

	<!-- PRICING TIERS -->
	<!-- Changed background to White to make the cards stand out -->
	<section
		id="tiers"
		class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background rounded-b-[3rem] relative z-10 shadow-sm"
	>
		<div class="text-center mb-16 gsap-reveal">
			<h2 class="text-3xl sm:text-4xl font-black text-foreground mb-4 serif-font">
				Choose Your Certification Level
			</h2>
			<p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
				From individual champions to institutional programs to master trainers building regional
				networks.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8 items-start" id="training-grid">
			<!-- Tier 1: Foundation -->
			<div
				class="group bg-secondary rounded-3xl shadow-xl border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden gsap-stagger-card"
			>
				<div class="bg-primary text-primary-foreground p-8">
					<div class="text-5xl mb-4">👤</div>
					<h3 class="text-2xl font-black mb-1 serif-font">Foundation Level</h3>
					<p class="text-sm opacity-90 mb-6 font-medium">Community Champion Certification</p>
					<div class="text-4xl font-black mb-2">UGX 500,000</div>
					<div class="text-sm opacity-90 font-mono tracking-wide">2-Day Training</div>
				</div>
				<div class="p-8 flex-1 flex flex-col">
					<div class="mb-6">
						<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
							Best For:
						</div>
						<div class="text-foreground font-medium">Individuals, venue staff, volunteers</div>
					</div>
					<div class="mb-8 flex-1">
						<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
							What's Included:
						</div>
						<ul class="space-y-3">
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Full T.O.T
								manual (digital + print)
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Community Champion
								certification
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> 2-day intensive
								training
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Access to digital
								resource library
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Listed in public
								directory
							</li>
						</ul>
					</div>
					<Button href="#" class="w-full shadow-lg mt-auto font-bold">Become a Champion</Button>
				</div>
			</div>

			<!-- Tier 2: Advanced (Popular) -->
			<!-- Fixed rounding issues and badge positioning -->
			<div class="relative flex flex-col h-full transform lg:-translate-y-4 z-20 gsap-stagger-card">
				<!-- Badge -->
				<div class="absolute -top-4 inset-x-0 flex justify-center z-30">
					<Badge
						variant="secondary"
						class="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg border-2 border-white"
						>Most Popular</Badge
					>
				</div>

				<div
					class="bg-secondary rounded-3xl shadow-2xl border-2 border-primary overflow-hidden flex flex-col h-full hover:shadow-3xl transition-shadow duration-300"
				>
					<div class="bg-destructive text-white p-8 pt-10">
						<div class="text-5xl mb-4">🏢</div>
						<h3 class="text-2xl font-black mb-1 serif-font">Advanced Level</h3>
						<p class="text-sm opacity-90 mb-6 font-medium">Institutional Scale Certification</p>
						<div class="text-4xl font-black mb-1">UGX 1.5M</div>
						<div class="text-xs opacity-90 mb-2">+ UGX 400K per additional Champion</div>
						<div class="text-sm opacity-90 font-mono tracking-wide">3-Day Training + Follow-up</div>
					</div>
					<div class="p-8 flex-1 flex flex-col">
						<div class="mb-6">
							<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
								Best For:
							</div>
							<div class="text-foreground font-medium">Schools, rehabs, NGOs, corporates</div>
						</div>
						<div class="mb-8 flex-1">
							<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
								What's Included:
							</div>
							<ul class="space-y-3">
								<li class="flex items-start gap-3 text-sm text-muted-foreground">
									<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Everything
									in Foundation Level
								</li>
								<li class="flex items-start gap-3 text-sm text-muted-foreground">
									<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Train up
									to 3 Champions/cohort
								</li>
								<li class="flex items-start gap-3 text-sm text-muted-foreground">
									<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Institutional
									customization workshop
								</li>
								<li class="flex items-start gap-3 text-sm text-muted-foreground">
									<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Impact measurement
									tools
								</li>
								<li class="flex items-start gap-3 text-sm text-muted-foreground">
									<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> 3-month follow-up
									support
								</li>
							</ul>
						</div>
						<Button href="#" variant="destructive" class="w-full shadow-lg mt-auto font-bold">
							Scale Your Impact
						</Button>
					</div>
				</div>
			</div>

			<!-- Tier 3: Master -->
			<div
				class="group bg-secondary rounded-3xl shadow-xl border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden gsap-stagger-card"
			>
				<div class="bg-primary text-primary-foreground p-8">
					<div class="text-5xl mb-4">🎓</div>
					<h3 class="text-2xl font-black mb-1 serif-font">Master Trainer</h3>
					<p class="text-sm opacity-90 mb-6 font-medium">Certified Trainer Certification</p>
					<div class="text-4xl font-black mb-1">UGX 3M</div>
					<div
						class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-white/20"
					>
						30% Revenue Share
					</div>
					<div class="text-sm opacity-90 font-mono tracking-wide block mt-1">
						5-Day Intensive + Practicum
					</div>
				</div>
				<div class="p-8 flex-1 flex flex-col">
					<div class="mb-6">
						<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
							Best For:
						</div>
						<div class="text-foreground font-medium">
							Mental health professionals, entrepreneurs
						</div>
					</div>
					<div class="mb-8 flex-1">
						<div class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
							What's Included:
						</div>
						<ul class="space-y-3">
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Train-the-trainer
								methodology
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Independent
								training rights
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> DCI Master
								Trainer license
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> 30% profit
								split on trainings
							</li>
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<i class="lucide lucide-check text-[#2A6268] w-4 h-4 mt-0.5 shrink-0"></i> Lead generation
								support
							</li>
						</ul>
					</div>
					<Button href="#" class="w-full shadow-lg mt-auto font-bold">Become a Master</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Process Steps -->
	<section class="  py-24 px-6  ">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-black text-foreground mb-16 text-center serif-font gsap-reveal">
				How T.O.T Certification Works
			</h2>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="process-grid">
				<!-- Step 1 -->
				<div
					class="bg-white rounded-2xl p-6 text-center transition-transform duration-300 gsap-stagger-step"
				>
					<div class="text-4xl mb-4">📝</div>
					<div
						class="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
					>
						1
					</div>
					<h4 class="font-bold text-foreground mb-1">Apply Online</h4>
					<p class="text-xs text-muted-foreground">Fill form & select tier</p>
				</div>
				<!-- Step 2 -->
				<div
					class="bg-white rounded-2xl p-6 text-center transition-transform duration-300 gsap-stagger-step"
				>
					<div class="text-4xl mb-4">💳</div>
					<div
						class="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
					>
						2
					</div>
					<h4 class="font-bold text-foreground mb-1">Make Payment</h4>
					<p class="text-xs text-muted-foreground">MoMo, Airtel, or card</p>
				</div>
				<!-- Step 3 -->
				<div
					class="bg-white rounded-2xl p-6 text-center transition-transform duration-300 gsap-stagger-step"
				>
					<div class="text-4xl mb-4">📚</div>
					<div
						class="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
					>
						3
					</div>
					<h4 class="font-bold text-foreground mb-1">Pre-Training</h4>
					<p class="text-xs text-muted-foreground">Receive digital manual</p>
				</div>
				<!-- Step 4 -->
				<div
					class="bg-white rounded-2xl p-6 text-center transition-transform duration-300 gsap-stagger-step"
				>
					<div class="text-4xl mb-4">🎓</div>
					<div
						class="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
					>
						4
					</div>
					<h4 class="font-bold text-foreground mb-1">Attend Training</h4>
					<p class="text-xs text-muted-foreground">2-5 days intensive</p>
				</div>
				<!-- Step 5 -->
				<div
					class="bg-white rounded-2xl p-6 text-center transition-transform duration-300 gsap-stagger-step"
				>
					<div class="text-4xl mb-4">🏆</div>
					<div
						class="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
					>
						5
					</div>
					<h4 class="font-bold text-foreground mb-1">Get Certified</h4>
					<p class="text-xs text-muted-foreground">Receive certificate & start</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Bottom CTA -->
	<section class="py-20 px-6 bg-primary text-primary-foreground text-center rounded-2xl">
		<div class="max-w-4xl mx-auto gsap-reveal">
			<h2 class="text-4xl font-black mb-6 serif-font">Ready to Become a Certified Champion?</h2>
			<p class="text-xl mb-8 opacity-90 font-light">
				Join 500+ trained Champions healing Uganda one conversation at a time.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button href="#" variant="destructive" size="lg" class="shadow-lg font-bold">
					Apply for T.O.T Now
				</Button>
				<Button
					href="#"
					variant="secondary"
					size="lg"
					class="text-primary hover:bg-white/90 shadow-lg font-bold"
				>
					Schedule a Call
				</Button>
			</div>
		</div>
	</section>
</main>

<style>
	  .bg-noise {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 50;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

	/* Animation States */
    /* .gsap-reveal, .gsap-stagger-card, .gsap-stagger-step { visibility: hidden; } */
</style>
