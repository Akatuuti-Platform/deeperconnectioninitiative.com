<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import {
		HandFistIcon,
		WarningIcon,
		BridgeIcon,
		FirstAidKitIcon
	} from 'phosphor-svelte';

	const stages = [
		{
			number: '01',
			label: 'CONNECT',
			title: 'Pressure Builds',
			description:
				'Daily stress, unspoken emotions, and isolation pile up with no safe outlet.',
			icon: HandFistIcon,
			crisis: false
		},
		{
			number: '02',
			label: 'EQUIP',
			title: 'Warning Signals',
			description:
				'Mood shifts, withdrawal, and behavioural changes go unnoticed or unnamed.',
			icon: WarningIcon,
			crisis: false
		},
		{
			number: '03',
			label: 'UNDERSTAND',
			title: 'Support Gap',
			description:
				'Communities lack tools, language, and confidence to respond before things escalate.',
			icon: BridgeIcon,
			crisis: false
		},
		{
			number: '04',
			label: 'RESPOND',
			title: 'Crisis',
			description:
				'When everyday pressure becomes a clinical emergency, the cost — human and financial — multiplies.',
			icon: FirstAidKitIcon,
			crisis: true
		}
	];
</script>

<section
	id="crisis-prevention"
	class="w-full bg-dci-cream relative z-10 overflow-hidden"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
		<!-- Asymmetric header -->
		<div
			class="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 mb-14"
			use:reveal={{ delay: 0, y: 18 }}
		>
			<div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1 mb-4"
				>
					<span class="text-xs font-semibold tracking-wide text-dci-teal uppercase"
						>The Crisis Prevention Model</span
					>
				</div>
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
					Most crises are preventable. DCI works upstream.
				</h2>
			</div>
			<div class="flex items-end">
				<p class="text-base lg:text-lg leading-relaxed text-slate-600">
					Mental health emergencies rarely come out of nowhere. They follow a pattern — pressure,
					signals, a support gap, then crisis. DCI's ecosystem targets the first three stages so
					the fourth rarely happens.
				</p>
			</div>
		</div>

		<!-- 2x2 card grid -->
		<div class="grid sm:grid-cols-2 gap-4 lg:gap-5">
			{#each stages as stage, index}
				{@const Icon = stage.icon}
				<div
					use:reveal={{ delay: index * 80, y: 18 }}
					class={cn(
						'relative rounded-[2rem] border p-7 sm:p-8 transition-all duration-300',
						stage.crisis
							? 'border-dci-burgundy/25 bg-dci-burgundy/8'
							: 'border-dci-teal/12 bg-white/70'
					)}
				>
					<div class="flex items-start justify-between mb-5">
						<div
							class={cn(
								'flex size-12 items-center justify-center rounded-2xl',
								stage.crisis ? 'bg-dci-burgundy/12' : 'bg-dci-teal/8'
							)}
						>
							<Icon
								class={cn(
									'size-6',
									stage.crisis ? 'text-dci-burgundy' : 'text-dci-teal'
								)}
								weight="duotone"
							/>
						</div>
						<span
							class={cn(
								'text-xs font-bold tracking-widest uppercase',
								stage.crisis ? 'text-dci-burgundy/50' : 'text-dci-teal/40'
							)}
						>
							{stage.number}
						</span>
					</div>

					<p
						class={cn(
							'text-[0.65rem] font-bold uppercase tracking-widest mb-2',
							stage.crisis ? 'text-dci-burgundy/70' : 'text-dci-teal/70'
						)}
					>
						{stage.label}
					</p>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">{stage.title}</h3>
					<p class="text-sm leading-relaxed text-slate-600">{stage.description}</p>

					{#if stage.crisis}
						<div
							class="mt-5 rounded-xl bg-dci-burgundy/10 border border-dci-burgundy/15 px-4 py-3"
						>
							<p class="text-xs font-semibold text-dci-burgundy leading-relaxed">
								DCI intervenes at stages 1 &ndash; 3 so this rarely happens.
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Bottom reinforcement band -->
		<div
			use:reveal={{ delay: 350, y: 14 }}
			class="mt-8 rounded-2xl bg-dci-teal-deep px-6 py-5 sm:px-8 sm:py-6 text-center"
		>
			<p class="text-sm sm:text-base font-medium text-dci-cream/90 leading-relaxed">
				Prevention is cheaper, kinder, and more effective than response. DCI puts tools
				where pressure builds — homes, schools, clinics, and community spaces.
			</p>
		</div>
	</div>
</section>
