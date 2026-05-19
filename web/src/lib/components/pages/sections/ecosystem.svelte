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
	import { paymentLinks } from '$lib/payment-links';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import { cn } from '@/lib/utils';

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
		}
		// {
		// 	icon: Heart,
		// 	title: 'Support Access',
		// 	subtitle: 'Sponsor a Toolkit',
		// 	description:
		// 		'10% of each toolkit sold funds community champion trainings and toolkit donations via monthly missions.'
		// }
	];
</script>

<section
	id="ecosystem"
	class="w-full bg-[#1A3C40] text-[#EFE5D0] relative rounded-t-4xl overflow-hidden"
>
	<!-- Background Pattern -->
	<div
		class="absolute inset-0 opacity-10 pointer-events-none rounded-t-4xl"
		style="background-image: radial-gradient(#2A6268 1px, transparent 1px); background-size: 30px 30px;"
	></div>

	<div class="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] lg:divide-x-2 lg:divide-accent/10">
		<div class="p-8 lg:px-20">
			<div class="py-16 lg:sticky top-20">
				<div class=" max-w-3xl mx-auto mb-16 gsap-reveal">
					<div
						class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 mb-3 bg-[#2A6268]/5 px-3 py-1"
					>
						<span class="text-[#EFE5D0]/60 font-bold tracking-widest uppercase text-xs"
							>The DCI Ecosystem</span
						>
					</div>
					<h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
						Built for the places care already happens.
					</h2>
					<p class="text-lg text-[#EFE5D0]/80">
						The DCI ecosystem moves from personal reflection to group conversation, trained
						champions, and responsible support when someone needs more care.
					</p>
					<div class="mt-10 grid gap-3 text-sm text-[#EFE5D0]/75 sm:grid-cols-3">
						<div class="border-t border-[#EFE5D0]/20 pt-3">Toolkit</div>
						<div class="border-t border-[#EFE5D0]/20 pt-3">Conversation</div>
						<div class="border-t border-[#EFE5D0]/20 pt-3">Referral</div>
					</div>
					<div class=" flex items-center mt-8">
						<Button
							href={paymentLinks.donation}
							target="_blank"
							class={cn(buttonVariants({ size: 'lg' }), 'w-fit ')}
						>
							<Heart class="lucide lucide-heart text-[#F6ECD9]  " />

							Sponsor a toolkit
						</Button>
						<p class="text-xs text-[#EFE5D0]/70 pl-6 max-w-3xs font-light">
							10% of each toolkit sold funds community champion trainings and donations.
						</p>
					</div>
				</div>
			</div>
		</div>
		<ul
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-px bg-[#EFE5D0]/10 list-none"
			role="list"
		>
			{#each ecosystemData as item, index}
				<li
					class="group relative p-8 bg-[#1A3C40]/95 backdrop-blur-sm hover:bg-[#204B50] transition-colors lg:p-12"
				>
					<span class="absolute top-6 right-6 text-xs font-bold text-[#EFE5D0]/20">
						{String(index + 1).padStart(2, '0')}
					</span>
					<div>
						<div
							class="mb-4 w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center transition group-hover:bg-secondary/25"
						>
							<svelte:component this={item.icon} class="w-6 h-6 text-secondary" />
						</div>
						<h3 class="text-lg font-bold mb-1 text-white">{item.title}</h3>

						<p class="text-xs text-secondary font-semibold mb-3 uppercase tracking-wide">
							{item.subtitle}
						</p>
						<p class="  leading-relaxed text-sm text-[#EFE5D0]/70">{item.description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
