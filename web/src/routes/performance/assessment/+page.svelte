<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import Logo from '@/lib/components/layout/logo.svelte';
	import {
		facets,
		statements,
		scale,
		bandFor,
		bandLabels,
		interpretations,
		scoreAnswers,
		type FacetKey
	} from './assessment';

	let { form } = $props();

	// Flow: 'intro' → facet index 0..4 → 'lead-capture' → 'result'.
	type Step = 'intro' | 'lead-capture' | 'result' | { facetIndex: number };
	let step = $state<Step>('intro');

	let answers = $state<Record<string, number>>({});
	let name = $state('');
	let email = $state('');
	let role = $state('');
	let company = $state('');
	let submitting = $state(false);
	let scores = $state<Record<FacetKey, number> | null>(null);

	const totalSteps = facets.length + 2;
	let progress = $derived.by(() => {
		let position: number;
		if (step === 'intro') position = 0;
		else if (step === 'lead-capture') position = facets.length;
		else if (step === 'result') position = totalSteps;
		else position = step.facetIndex;
		return Math.round((position / totalSteps) * 100);
	});

	let facetIndex = $derived(typeof step === 'object' ? step.facetIndex : -1);
	let currentFacet = $derived(typeof step === 'object' ? facets[step.facetIndex] : null);
	let currentStatements = $derived(
		currentFacet ? statements.filter((s) => s.facet === currentFacet!.key) : []
	);
	let facetComplete = $derived(
		currentStatements.every((s) => typeof answers[s.id] === 'number')
	);

	function goToFacet(index: number) {
		if (index < 0) step = 'intro';
		else if (index >= facets.length) step = 'lead-capture';
		else step = { facetIndex: index };
	}

	// Serialized scores travel with the lead form so DCI gets the snapshot too.
	let scoresPayload = $derived(JSON.stringify(scoreAnswers(answers)));
</script>

<div class="flex min-h-screen flex-col bg-dci-cream">
	<!-- Minimal, distraction-free header for the assessment flow. -->
	<header class="border-b border-dci-teal/10">
		<div class="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
			<Logo isLink />
			<span class="text-xs font-semibold uppercase tracking-[0.22em] text-dci-burgundy/80">
				Performance Blueprint™
			</span>
		</div>
	</header>

	<!-- Progress bar (hidden on the intro screen). -->
	{#if step !== 'intro'}
		<div class="h-1 w-full bg-dci-teal/10">
			<div
				class="h-full bg-dci-burgundy transition-all duration-500 ease-out"
				style={`width:${progress}%`}
			></div>
		</div>
	{/if}

	<main class="flex flex-1 flex-col items-center px-4 py-14 sm:px-6 sm:py-20">
		<!-- Intro -->
		{#if step === 'intro'}
			<div in:fade={{ duration: 300 }} class="mx-auto max-w-2xl text-center">
				<p class="text-xs font-semibold uppercase tracking-[0.22em] text-dci-burgundy">
					The Blueprint Assessment
				</p>
				<h1
					class="mt-5 font-serif text-4xl font-light leading-tight text-dci-teal-deep sm:text-5xl"
				>
					Discover the hidden patterns shaping your performance.
				</h1>
				<p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-700">
					Free. About 10 minutes. Twenty short statements across five facets of how you operate: how
					you think, recover, decide, communicate, and lead under pressure. At the end, you'll get a
					personal Blueprint snapshot to keep.
				</p>
				<button
					type="button"
					onclick={() => goToFacet(0)}
					class="mt-10 inline-flex items-center justify-center rounded-2xl bg-dci-burgundy px-9 py-3.5 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90"
				>
					Begin
				</button>
				<p class="mx-auto mt-9 max-w-md text-sm leading-relaxed text-slate-500">
					This is a reflection tool, not a clinical assessment. If you're struggling, DCI can point
					you to real support.
				</p>
			</div>

			<!-- Facet questions -->
		{:else if typeof step === 'object' && currentFacet}
			{#key facetIndex}
				<div in:fade={{ duration: 250 }} class="mx-auto w-full max-w-2xl">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-dci-burgundy">
						Facet {facetIndex + 1} of {facets.length}
					</p>
					<h2 class="mt-3 font-serif text-3xl font-light text-dci-teal-deep sm:text-4xl">
						{currentFacet.label}
					</h2>

					<div class="mt-10 space-y-10">
						{#each currentStatements as statement (statement.id)}
							<div>
								<p class="text-lg leading-relaxed text-slate-800">{statement.prompt}</p>
								<div class="mt-4 flex gap-2">
									{#each scale as option (option.value)}
										<button
											type="button"
											aria-label={option.label}
											onclick={() => (answers = { ...answers, [statement.id]: option.value })}
											class={`flex h-10 flex-1 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
												answers[statement.id] === option.value
													? 'border-dci-burgundy bg-dci-burgundy text-dci-cream'
													: 'border-dci-teal/15 text-slate-500 hover:border-dci-burgundy/40'
											}`}
										>
											{option.value}
										</button>
									{/each}
								</div>
								<div class="mt-2 flex justify-between text-xs text-slate-400">
									<span>{scale[0].label}</span>
									<span>{scale[scale.length - 1].label}</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-12 flex items-center justify-between">
						<button
							type="button"
							onclick={() => goToFacet(facetIndex - 1)}
							class="text-sm font-semibold text-slate-500 transition-colors hover:text-dci-teal-deep"
						>
							← Back
						</button>
						<button
							type="button"
							disabled={!facetComplete}
							onclick={() => goToFacet(facetIndex + 1)}
							class="inline-flex items-center justify-center rounded-2xl bg-dci-burgundy px-8 py-3 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
						>
							Next
						</button>
					</div>
				</div>
			{/key}

			<!-- Lead capture -->
		{:else if step === 'lead-capture'}
			<div in:fade={{ duration: 250 }} class="mx-auto w-full max-w-md text-center">
				<p class="text-xs font-semibold uppercase tracking-[0.22em] text-dci-burgundy">
					Almost there
				</p>
				<h2 class="mt-3 font-serif text-3xl font-light text-dci-teal-deep sm:text-4xl">
					Save your Blueprint and get your results.
				</h2>
				<p class="mt-4 text-base leading-relaxed text-slate-600">
					We'll send you a copy and show you your personal snapshot right now.
				</p>

				<form
					method="POST"
					class="mt-8 space-y-3 text-left"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							// Compute and reveal results regardless of email delivery.
							scores = scoreAnswers(answers);
							await update({ reset: false });
							submitting = false;
							step = 'result';
						};
					}}
				>
					<!-- Honeypot -->
					<input
						autocomplete="off"
						name="company_url"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>
					<input type="hidden" name="scores" value={scoresPayload} />

					<input
						bind:value={name}
						name="name"
						type="text"
						autocomplete="name"
						required
						placeholder="Your name"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={email}
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="you@email.com"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={role}
						name="role"
						type="text"
						placeholder="Role (optional)"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={company}
						name="company"
						type="text"
						placeholder="Company (optional)"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>

					{#if form?.errors?.email}
						<p class="text-sm text-dci-burgundy">{form.errors.email}</p>
					{/if}
					{#if form?.errors?.name}
						<p class="text-sm text-dci-burgundy">{form.errors.name}</p>
					{/if}

					<button
						type="submit"
						disabled={submitting}
						class="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-dci-burgundy px-6 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:opacity-60"
					>
						{submitting ? 'Preparing your Blueprint...' : 'Show my results'}
					</button>
				</form>

				<button
					type="button"
					onclick={() => goToFacet(facets.length - 1)}
					class="mt-6 text-sm font-semibold text-slate-500 transition-colors hover:text-dci-teal-deep"
				>
					← Back
				</button>
			</div>

			<!-- Result -->
		{:else if step === 'result' && scores}
			<div in:fade={{ duration: 300 }} class="mx-auto w-full max-w-2xl">
				<div class="text-center">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-dci-burgundy">
						Your Blueprint snapshot
					</p>
					<h2 class="mt-3 font-serif text-3xl font-light text-dci-teal-deep sm:text-4xl">
						Here's how your system currently operates.
					</h2>
				</div>

				<div class="mt-12 space-y-6">
					{#each facets as facet (facet.key)}
						{@const value = scores[facet.key]}
						{@const band = bandFor(value)}
						<div class="rounded-[1.5rem] bg-white p-7 shadow-dci-lift">
							<div class="flex items-start justify-between gap-4">
								<h3 class="font-serif text-xl text-dci-teal-deep">{facet.label}</h3>
								<span class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-teal">
									{bandLabels[band]}
								</span>
							</div>
							<div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-dci-teal/10">
								<div
									class="h-full rounded-full bg-dci-burgundy"
									style={`width:${(value / 5) * 100}%`}
								></div>
							</div>
							<p class="mt-4 text-sm leading-relaxed text-slate-600">
								{interpretations[facet.key][band]}
							</p>
						</div>
					{/each}
				</div>

				<div class="mt-14 rounded-[1.5rem] bg-dci-teal-deep px-7 py-10 text-center">
					<p class="font-serif text-xl font-light text-dci-cream">This is the map.</p>
					<p class="font-serif text-xl font-light text-dci-cream">
						Coaching is where you redesign it.
					</p>
					<a
						href="/performance#tiers"
						class="mt-6 inline-flex items-center gap-2 rounded-2xl bg-dci-cream px-6 py-3 font-semibold text-dci-teal-deep transition-opacity hover:opacity-90"
					>
						Explore coaching
						<ArrowUpRight class="size-4" weight="regular" />
					</a>
				</div>

				<p class="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-slate-500">
					This is a reflection tool, not a clinical assessment. If you're struggling, DCI can point
					you to real support.
				</p>
			</div>
		{/if}
	</main>
</div>
