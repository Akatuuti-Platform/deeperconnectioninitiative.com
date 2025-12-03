<script>
	import {
		Leaf,
		Library,
		MessageCircle,
		Users,
		Building2,
		Sparkles,
		HeartHandshake,
		Globe,
		Heart
	} from '@lucide/svelte';

	const ecosystemData = [
		{
			icon: Leaf,
			title: 'DCI Offline Toolkit',
			subtitle: 'Physical Tools & Guides',
			description:
				'Journal + Mood tracker + Conversation cards. Low-tech, high-impact tools for daily reflection and community conversation.'
		},
		{
			icon: Library,
			title: 'Digital Wellness Library',
			subtitle: 'Self-Led Learning',
			description:
				'Short, low-data learning modules building emotional literacy and coping skills for self-led mental wellbeing.'
		},
		{
			icon: MessageCircle,
			title: 'Conversation Clinics',
			subtitle: 'Wellness Meet-ups',
			description:
				'Facilitated peer-support spaces for storytelling and reflection to reduce isolation using the DCI card-game.'
		},
		{
			icon: Users,
			title: 'Community Champions',
			subtitle: "Partner Trainings (T.O.T's)",
			description:
				'Training local leaders to use DCI tools, fostering emotional safety and community support without professional reliance.'
		},
		{
			icon: Building2,
			title: 'Program Design',
			subtitle: 'Implementation Support',
			description:
				'Helping organizations design and implement sustainable mental wellness programs grounded in cultural context.'
		},
		{
			icon: Sparkles,
			title: 'DCI Angels',
			subtitle: 'Volunteer Squad',
			description:
				'Volunteers supporting wellness through monthly missions via community outreaches in everyday spaces.'
		},
		{
			icon: HeartHandshake,
			title: 'Provider Network',
			subtitle: 'Mental Health Services',
			description:
				'Responsible referral options for professional support, complementing self-led and community-based approaches.'
		},
		{
			icon: Globe,
			title: 'Connection Miles',
			subtitle: 'Venue Partners',
			description:
				'Transform your venue into a certified wellness hub. Drive traffic. Build community impact. Create recurring revenue.'
		},
		{
			icon: Heart,
			title: 'Support Access',
			subtitle: 'Sponsor a Toolkit',
			description:
				'10% of each toolkit sold funds community champion trainings and toolkit donations via monthly missions.'
		}
	];
</script>

<section
	id="ecosystem"
	class="w-full py-16 sm:py-20 lg:py-24 bg-teal-subtle border-t border-primary/30"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
		<div class="max-w-3xl space-y-4">
			<p class="text-xs font-bold uppercase tracking-wider text-cream/80">THE DCI ECOSYSTEM</p>
			<h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-cream text-balance">
				A complete mental health ecosystem for communities
			</h2>
			<p class="text-lg sm:text-xl font-normal leading-relaxed text-cream/90 text-pretty">
				The Deeper Connection Initiative (DCI) integrates tools, education, and community support to
				empower individuals and communities to own their healing journey.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each ecosystemData as item, index}
				<div
					class="border border-cream/20 rounded-2xl p-6 bg-cream hover:border-cream/40 hover:shadow-lg transition-all duration-300"
				>
					<div class="mb-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
						<svelte:component this={item.icon} class="w-6 h-6 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-1 text-foreground">{item.title}</h3>
					<p class="text-xs text-primary font-semibold mb-3 uppercase tracking-wide">
						{item.subtitle}
					</p>
					<p class="text-sm leading-relaxed text-foreground/70">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
