<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import {
		ArrowUpRightIcon,
		BookOpenTextIcon,
		CardsIcon,
		ChartLineUpIcon,
		NotebookIcon,
		SquaresFourIcon
	} from 'phosphor-svelte';

	const tools = [
		{
			id: 'cards',
			label: 'Conversation cards',
			kicker: 'Open a prompt',
			icon: CardsIcon,
			title: 'Use a card when a conversation needs a gentle way in.',
			description:
				'Prompts help people speak without performing, explaining everything, or finding perfect mental health language first.',
			detail: 'Best for clinics, youth groups, family check-ins, and first sessions.',
			cta: 'See card game',
			href: '#toolkit-products',
			accent: '#6F231E'
		},
		{
			id: 'journal',
			label: 'Reflection journal',
			kicker: 'Follow the page',
			icon: NotebookIcon,
			title: 'Give thoughts somewhere structured to land.',
			description:
				'Guided pages make reflection easier for people who need a little shape before they can name what is happening.',
			detail: 'Best for personal practice, counseling support, and post-session reflection.',
			cta: 'See journal',
			href: '#toolkit-products',
			accent: '#2A6268'
		},
		{
			id: 'mood',
			label: 'Mood tracker',
			kicker: 'Notice patterns',
			icon: ChartLineUpIcon,
			title: 'Track emotional patterns without turning care into homework.',
			description:
				'A simple rhythm helps people notice what shifts across days, places, relationships, and routines.',
			detail: 'Best for daily awareness, support teams, and low-language mental health settings.',
			cta: 'See tracker',
			href: '#toolkit-products',
			accent: '#2A6268'
		}
	] as const;

	type Tool = (typeof tools)[number];

	let activeTool = $state<Tool>(tools[0]);
</script>

<section
	use:reveal={{ delay: 80, y: 22 }}
	class="relative overflow-hidden rounded-[2.5rem] border border-[#2A6268]/12 bg-[#1A3C40] text-[#F6ECD9] shadow-[0_28px_85px_-66px_rgba(0,0,0,0.72)]"
>
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<div class="relative grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
		<div class="p-6 sm:p-8 lg:p-10">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-[#F6ECD9]/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#F6ECD9]/70"
			>
				<SquaresFourIcon class="size-3.5" weight="duotone" />
				Open the kit
			</div>
			<h3 class="mt-5 max-w-lg text-4xl font-semibold leading-tight text-white sm:text-5xl">
				A tool for the moment you are in.
			</h3>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-[#F6ECD9]/72">
				Each piece has a different job: opening a conversation, making reflection easier, or
				helping someone notice patterns over time.
			</p>

			<div class="mt-8 grid gap-2">
				{#each tools as tool}
					{@const Icon = tool.icon}
					<button
						type="button"
						class={cn(
							'group grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition duration-300',
							activeTool.id === tool.id
								? 'border-[#F6ECD9]/30 bg-[#F6ECD9]/12 text-white'
								: 'border-[#F6ECD9]/10 bg-[#F6ECD9]/5 text-[#F6ECD9]/72 hover:bg-[#F6ECD9]/9'
						)}
						aria-pressed={activeTool.id === tool.id}
						onclick={() => (activeTool = tool)}
					>
						<span
							class={cn(
								'flex size-11 items-center justify-center rounded-xl transition',
								activeTool.id === tool.id ? 'bg-[#F6ECD9] text-[#1A3C40]' : 'bg-[#F6ECD9]/10'
							)}
						>
							<Icon class="size-5" weight="duotone" />
						</span>
						<span>
							<span class="block text-sm font-semibold">{tool.label}</span>
							<span class="mt-1 block text-xs text-[#F6ECD9]/58">{tool.kicker}</span>
						</span>
						<span
							class={cn(
								'h-2 w-2 rounded-full transition',
								activeTool.id === tool.id ? 'bg-[#D49C70]' : 'bg-[#F6ECD9]/18'
							)}
						></span>
					</button>
				{/each}
			</div>
		</div>

		<div class="relative overflow-hidden bg-[#F6ECD9] p-6 text-slate-950 sm:p-8 lg:p-10">
			<div class="grid gap-8 2xl:grid-cols-[0.9fr_1fr] 2xl:items-center">
				<div class="relative min-h-[20rem] 2xl:min-h-[23rem]">
					<div class="absolute inset-0 rounded-[2rem] bg-[#FFF9EA]/70"></div>
					{#if activeTool.id === 'cards'}
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="relative h-64 w-64 2xl:h-72 2xl:w-72">
								{#each Array(5) as _, index}
									<div
										class={cn(
											'absolute left-1/2 top-1/2 aspect-[3/4] w-32 origin-bottom rounded-2xl border border-[#6F231E]/15 p-4 shadow-[0_22px_45px_-35px_rgba(0,0,0,0.72)] transition-transform duration-500 2xl:w-36',
											index % 3 === 0 ? 'bg-[#FFF9EA]' : index % 3 === 1 ? 'bg-[#DFA169]' : 'bg-[#F4D5D0]'
										)}
										style={`transform: translate(-50%, -50%) rotate(${(index - 2) * 10}deg) translateY(${Math.abs(index - 2) * 8}px);`}
									>
										<div class="h-1.5 w-12 rounded-full bg-[#6F231E]/45"></div>
										<div class="mt-16 space-y-2">
											<div class="h-1.5 rounded-full bg-[#6F231E]/20"></div>
											<div class="h-1.5 rounded-full bg-[#6F231E]/20"></div>
											<div class="h-1.5 w-2/3 rounded-full bg-[#6F231E]/20"></div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{:else if activeTool.id === 'journal'}
						<div class="absolute inset-0 flex items-center justify-center p-8">
							<div class="aspect-[4/5] w-full max-w-[18rem] rounded-[1.75rem] bg-[#FFF9EA] p-6 shadow-[0_24px_55px_-38px_rgba(0,0,0,0.72)]">
								<div class="h-full rounded-2xl border-2 border-[#2A6268]/20 p-5">
									<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">
										Reflection Journal
									</p>
									<p class="mt-8 text-2xl font-semibold leading-tight text-slate-950">
										What felt heavy today?
									</p>
									<div class="mt-10 space-y-3">
										<div class="h-2 rounded-full bg-[#2A6268]/22"></div>
										<div class="h-2 rounded-full bg-[#2A6268]/18"></div>
										<div class="h-2 w-2/3 rounded-full bg-[#2A6268]/18"></div>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="absolute inset-0 flex items-center justify-center p-8">
							<div class="aspect-[4/5] w-full max-w-[18rem] rounded-[1.75rem] bg-[#EEF1E5] p-6 shadow-[0_24px_55px_-38px_rgba(0,0,0,0.72)]">
								<p class="text-xs font-bold uppercase tracking-widest text-[#2A6268]">
									Mood Tracker
								</p>
								<div class="mt-10 grid grid-cols-5 gap-3">
									{#each Array(30) as _, index}
										<span
											class={cn(
												'aspect-square rounded-full transition duration-500',
												index % 7 === 0
													? 'bg-[#6F231E]'
													: index % 5 === 0
														? 'bg-[#D49C70]'
														: index % 4 === 0
															? 'bg-[#2A6268]/35'
															: 'bg-[#2A6268]/18'
											)}
										></span>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-[#2A6268]">
						{activeTool.kicker}
					</p>
					<h4 class="mt-4 text-3xl font-semibold leading-tight text-slate-950">
						{activeTool.title}
					</h4>
					<p class="mt-4 text-base leading-relaxed text-slate-700">{activeTool.description}</p>
					<div class="mt-6 rounded-2xl border border-[#2A6268]/12 bg-[#FFF9EA]/70 p-4">
						<p class="text-sm font-semibold text-[#1A3C40]">{activeTool.detail}</p>
					</div>
					<a
						href={activeTool.href}
						class="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1A3C40] px-6 text-sm font-semibold text-[#F6ECD9] transition hover:bg-[#234F53] active:scale-[0.98]"
					>
						{activeTool.cta}
						<ArrowUpRightIcon class="size-4" weight="regular" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
