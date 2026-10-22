<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { ArrowLeftIcon as ArrowLeft, LockSimpleIcon as Lock, ArrowRightIcon as ArrowRight, CaretDownIcon as CaretDown } from 'phosphor-svelte';
	import Logo from '@/lib/components/layout/logo.svelte';
	import DraftBadge from '$lib/components/mental-models/draft-badge.svelte';
	import HelpLine from '$lib/components/mental-models/help-line.svelte';
	import SharePanel from '$lib/components/mental-models/share-panel.svelte';
	import LineToSend from '$lib/components/mental-models/line-to-send.svelte';
	import FullReport from '$lib/components/mental-models/full-report.svelte';
	import KeepNoticing from '$lib/components/mental-models/keep-noticing.svelte';
	import NextCards from '$lib/components/mental-models/next-cards.svelte';
	import CountForm from '$lib/components/mental-models/count-form.svelte';
	import FeedbackForm from '$lib/components/mental-models/feedback-form.svelte';
	import { track } from '$lib/mental-models/track';
	import { QUESTIONS, STATE_QUESTION, HARDEST_QUESTION, MAX_SKIPS, FIRST_PROMPT, THEN_PROMPT } from '$lib/mental-models/questions';
	import { MODELS } from '$lib/mental-models/models';
	import { MODEL_ICONS } from '$lib/mental-models/icons';
	import { computeResult, isComplete } from '$lib/mental-models/scoring';
	import { parseVariants } from '$lib/mental-models/variants';
	import { CONTENT_VERSION, DRAFT_NOTE } from '$lib/mental-models/version';
	import { DEVICE } from '$lib/mental-models/consent-copy';
	import {
		HEADLINE,
		PATTERN_NOTE,
		REACTION,
		RESPONSE,
		GO_TO_LABEL,
		UNDER_PRESSURE_LABEL,
		GO_TO_DEFINITION,
		UNDER_PRESSURE_DEFINITION
	} from '$lib/mental-models/labels';
	import type { Answers, Clarifier, ClarifierChoice, ModelId, StressState } from '$lib/mental-models/types';

	let { data } = $props();

	// Fades are skipped for people who ask their device for less motion.
	const ms = (n: number) =>
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : n;

	type Phase = 'state' | 'pause' | 'question' | 'hardest' | 'clarifier' | 'result';

	// Everything below lives in this page's memory only. Nothing is stored or sent unless the
	// person chooses to (keep on this device, unlock with email, count, or feedback).
	let phase = $state<Phase>('state');
	let stressState = $state<StressState>('unsaid');
	let stateChosen = $state(false);
	let qIndex = $state(0);
	let answers = $state<Answers>({});
	let orders = $state<Record<string, string[]>>({});
	let hardest = $state<string[]>([]);
	let clarifier = $state<Clarifier | null>(null);
	// Which of the two close patterns is listed first is randomised, so position cannot nudge the answer.
	let clarifierOrder = $state<ModelId[]>([]);
	let fit = $state<'yes' | 'partly' | 'no' | null>(null);
	let unlocked = $state(false);
	let heading = $state<HTMLElement | null>(null);

	let variants = $derived(parseVariants(page.url.searchParams));
	let result = $derived(computeResult(answers, clarifier));
	let skipsUsed = $derived(Object.values(answers).filter((a) => a.skipped && !a.first).length);

	let question = $derived(QUESTIONS[qIndex]);
	let current = $derived(answers[question?.id ?? '']);
	// Which tap the person is on: "First, you..." then "If that doesn't help, you...".
	let stage = $derived<'first' | 'then' | 'done'>(!current?.first ? 'first' : !current?.then ? 'then' : 'done');
	let orderedOptions = $derived(
		question ? (orders[question.id] ?? question.options.map((o) => o.id)).map((id) => question.options.find((o) => o.id === id)!) : []
	);

	// Progress: state + 12 scenarios + optional question, then the result.
	const totalSteps = QUESTIONS.length + 2;
	let progress = $derived.by(() => {
		if (phase === 'state' || phase === 'pause') return 0;
		if (phase === 'question') return Math.round(((qIndex + 1) / totalSteps) * 100);
		if (phase === 'hardest') return Math.round(((QUESTIONS.length + 1) / totalSteps) * 100);
		if (phase === 'clarifier') return 96;
		return 100;
	});

	function shuffle<T>(items: T[]): T[] {
		const out = [...items];
		const buf = new Uint32Array(out.length);
		crypto.getRandomValues(buf);
		for (let i = out.length - 1; i > 0; i--) {
			const j = buf[i] % (i + 1);
			[out[i], out[j]] = [out[j], out[i]];
		}
		return out;
	}

	async function go(next: Phase) {
		if (next !== phase) {
			if (next === 'result') track('result_viewed');
			if (next === 'clarifier') track('clarifier_shown');
		}
		phase = next;
		await tick();
		heading?.focus();
		window.scrollTo({ top: 0 });
	}

	function chooseState(value: StressState) {
		stressState = value;
		stateChosen = true;
	}

	async function begin() {
		// Option order is shuffled once per attempt so position never favours a Model.
		track('quiz_started');
		orders = Object.fromEntries(QUESTIONS.map((q) => [q.id, shuffle(q.options.map((o) => o.id))]));
		qIndex = 0;
		await go(stressState === 'overwhelmed' ? 'pause' : 'question');
	}

	function tapOption(id: string) {
		const a = answers[question.id] ?? {};
		if (!a.first || a.skipped) answers[question.id] = { first: id };
		else answers[question.id] = { first: a.first, then: id };
	}

	function changeFirst() {
		answers[question.id] = {};
	}

	function tag(id: string): string {
		if (current?.first === id && current?.then === id) return 'First, then again';
		if (current?.first === id) return 'First';
		if (current?.then === id) return 'Then';
		return '';
	}

	async function next() {
		if (stage !== 'done' && !current?.skipped) return;
		if (qIndex < QUESTIONS.length - 1) {
			qIndex += 1;
			await go('question');
		} else {
			await go('hardest');
		}
	}

	async function skip() {
		if (!current?.skipped && skipsUsed >= MAX_SKIPS) return;
		answers[question.id] = { skipped: true };
		if (qIndex < QUESTIONS.length - 1) {
			qIndex += 1;
			await go('question');
		} else await go('hardest');
	}

	async function back() {
		if (phase === 'question') {
			if (qIndex > 0) {
				qIndex -= 1;
				await go('question');
			} else await go(stressState === 'overwhelmed' ? 'pause' : 'state');
		} else if (phase === 'pause') await go('state');
		else if (phase === 'hardest') {
			qIndex = QUESTIONS.length - 1;
			await go('question');
		} else if (phase === 'clarifier') await go('hardest');
	}

	async function finishQuestions() {
		if (!isComplete(answers)) return;
		track('quiz_completed');
		clarifier = null;
		const pair = computeResult(answers, null).needsClarifier;
		if (pair) clarifierOrder = shuffle([pair.a, pair.b]);
		await go(pair ? 'clarifier' : 'result');
	}

	async function answerClarifier(choice: ClarifierChoice) {
		const pair = computeResult(answers, null).needsClarifier;
		if (!pair) return;
		clarifier = { a: pair.a, b: pair.b, choice };
		await go('result');
	}

	function toggleHardest(value: string) {
		hardest = hardest.includes(value) ? hardest.filter((v) => v !== value) : [...hardest, value];
	}

	async function retake() {
		answers = {};
		hardest = [];
		clarifier = null;
		clarifierOrder = [];
		fit = null;
		unlocked = false;
		stateChosen = false;
		stressState = 'unsaid';
		await go('state');
	}

	// ---- Optional: keep the result on this device (off unless the person chooses) --------------
	const STORE_KEY = 'dci-mental-models-draft1';
	let keepOnDevice = $state(false);
	let storageNote = $state('');

	function setKeep(on: boolean) {
		keepOnDevice = on;
		try {
			if (on) {
				localStorage.setItem(
					STORE_KEY,
					JSON.stringify({ v: CONTENT_VERSION, primary: result.primary, secondary: result.underPressure, at: new Date().toISOString().slice(0, 10) })
				);
				storageNote = 'Saved on this device only. You can delete it any time.';
			} else {
				localStorage.removeItem(STORE_KEY);
				storageNote = 'Deleted from this device.';
			}
		} catch {
			storageNote = 'This browser would not let us save. Nothing was stored.';
			keepOnDevice = false;
		}
	}

	let goTo = $derived(MODELS[result.primary]);
	let under = $derived(result.underPressure ? MODELS[result.underPressure] : null);
	let GoToIcon = $derived(MODEL_ICONS[result.primary]);
	let alsoClose = $derived(result.alsoClose ? MODELS[result.alsoClose] : null);
	let quietNote = $derived(
		hardest.includes('unsafe')
			? 'You mentioned not feeling safe. If you would like to talk to someone, support options are below.'
			: stressState === 'overwhelmed'
				? 'You said things feel like too much right now. If you would like to talk to someone, support options are below.'
				: ''
	);

	const pairText = (a: ModelId) => MODELS[a].insideReason;
</script>

<div class="flex min-h-screen flex-col bg-dci-cream">
	<header class="border-b border-dci-teal/10">
		<div class="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
			<Logo isLink />
			<div class="flex items-center gap-3">
				<DraftBadge />
				<a href="/mental-models" class="text-sm font-semibold text-slate-600 hover:text-dci-teal-deep">Exit</a>
			</div>
		</div>
	</header>

	{#if phase !== 'state' && phase !== 'pause'}
		<div class="h-1 w-full bg-dci-teal/10" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
			<div class="h-full bg-dci-burgundy transition-all duration-500 ease-out" style={`width:${progress}%`}></div>
		</div>
	{/if}

	<main class="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
		<!-- 0. How is the pressure right now? Never scored. -->
		{#if phase === 'state'}
			<div in:fade={{ duration: ms(250) }}>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">Before we start &middot; not scored</p>
				<h1 bind:this={heading} tabindex="-1" class="mt-3 font-serif text-3xl font-light leading-tight text-dci-teal-deep outline-none sm:text-4xl">
					{STATE_QUESTION.prompt}
				</h1>
				<p class="mt-3 text-base leading-relaxed text-slate-600">{STATE_QUESTION.hint}</p>

				<div class="mt-6 grid gap-3" role="radiogroup" aria-label="Current pressure">
					{#each STATE_QUESTION.options as o (o.value)}
						<button
							type="button"
							role="radio"
							aria-checked={stateChosen && stressState === o.value}
							onclick={() => chooseState(o.value)}
							class={`rounded-2xl border p-4 text-left transition-colors ${
								stateChosen && stressState === o.value
									? 'border-dci-teal-deep bg-dci-teal-deep text-dci-cream'
									: 'border-dci-teal/20 bg-white/70 text-slate-800 hover:border-dci-teal/50'
							}`}
						>
							<span class="block text-base font-semibold">{o.label}</span>
							<span class={`mt-0.5 block text-sm ${stateChosen && stressState === o.value ? 'text-dci-cream/85' : 'text-slate-600'}`}>{o.text}</span>
						</button>
					{/each}
				</div>

				<p class="mt-6 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
					<Lock class="mt-0.5 size-4 shrink-0 text-dci-teal-deep" />
					<span>Next: 12 short scenarios, two taps each, about 5 minutes. Answer for how you usually respond, not just today. Nothing is saved or sent unless you choose.</span>
				</p>

				<button
					type="button"
					disabled={!stateChosen}
					onclick={begin}
					class="mt-8 w-full rounded-2xl bg-dci-burgundy px-8 py-3.5 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
				>
					Continue
				</button>
				<p class="mt-8 text-xs leading-relaxed text-slate-600">{DRAFT_NOTE}</p>
			</div>

			<!-- A calm pause, only if someone said it feels like too much. No alarm. -->
		{:else if phase === 'pause'}
			<div in:fade={{ duration: ms(250) }}>
				<h1 bind:this={heading} tabindex="-1" class="font-serif text-3xl font-light leading-tight text-dci-teal-deep outline-none sm:text-4xl">
					Before you go on
				</h1>
				<p class="mt-4 text-base leading-relaxed text-slate-800">
					You said it feels like too much right now. You can carry on with the questions, or look at support first and come back any time. Either is fine.
				</p>
				<div class="mt-6 flex flex-col gap-3 sm:flex-row">
					<button type="button" onclick={() => go('question')} class="rounded-2xl bg-dci-teal-deep px-6 py-3 text-sm font-semibold text-dci-cream">Carry on with the questions</button>
					<a href="/support" class="rounded-2xl border border-dci-teal/30 px-6 py-3 text-center text-sm font-semibold text-dci-teal-deep">Look at support first</a>
				</div>
				<button type="button" onclick={back} class="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-dci-teal-deep"><ArrowLeft class="size-4" /> Back</button>
			</div>

			<!-- 1 to 12. Scenarios, two taps each -->
		{:else if phase === 'question' && question}
			{#key question.id}
				<div in:fade={{ duration: ms(220) }}>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">Scenario {qIndex + 1} of {QUESTIONS.length}</p>
					<h1 bind:this={heading} tabindex="-1" class="mt-3 font-serif text-2xl font-light leading-snug text-dci-teal-deep outline-none sm:text-3xl">
						{question.prompt}
					</h1>
					<div class="mt-5 flex items-center gap-3" aria-live="polite">
						<span class={`rounded-full px-3 py-1 text-sm font-semibold ${stage === 'first' ? 'bg-dci-burgundy text-dci-cream' : 'bg-dci-burgundy/10 text-dci-burgundy'}`}>1. {FIRST_PROMPT}</span>
						<span class={`rounded-full px-3 py-1 text-sm font-semibold ${stage === 'then' ? 'bg-dci-teal-deep text-dci-cream' : 'bg-dci-teal/10 text-dci-teal-deep'}`}>2. {THEN_PROMPT}</span>
					</div>
					<p class="mt-3 text-sm text-slate-600">
						{#if stage === 'first'}Tap what you would do first.{:else if stage === 'then'}Now tap what you would do if that does not help. It can be the same one.{:else}Both chosen. Tap Next, or change your first choice.{/if}
					</p>

					<div class="mt-4 grid gap-3">
						{#each orderedOptions as o (o.id)}
							{@const t = tag(o.id)}
							<button
								type="button"
								aria-pressed={t !== ''}
								disabled={stage === 'done' && t === ''}
								onclick={() => tapOption(o.id)}
								class={`flex items-start gap-3 rounded-2xl border p-4 text-left text-base leading-snug transition-colors disabled:opacity-50 ${
									t.startsWith('First')
										? 'border-dci-burgundy bg-dci-burgundy/10 text-slate-900'
										: t === 'Then'
											? 'border-dci-teal-deep bg-dci-teal/10 text-slate-900'
											: 'border-dci-teal/20 bg-white/70 text-slate-800 hover:border-dci-teal/50'
								}`}
							>
								<span class="min-w-0 flex-1">...{o.text}</span>
								{#if t}<span class={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${t.startsWith('First') ? 'bg-dci-burgundy text-dci-cream' : 'bg-dci-teal-deep text-dci-cream'}`}>{t}</span>{/if}
							</button>
						{/each}
					</div>
					{#if stage !== 'first'}
						<button type="button" onclick={changeFirst} class="mt-3 text-sm font-semibold text-slate-600 underline underline-offset-4">Change my first choice</button>
					{/if}

					<div class="mt-8 flex flex-wrap items-center justify-between gap-3">
						<button type="button" onclick={back} class="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-dci-teal-deep"><ArrowLeft class="size-4" /> Back</button>
						<div class="flex items-center gap-4">
							{#if skipsUsed < MAX_SKIPS || current?.skipped}
								<button type="button" onclick={skip} class="text-sm font-semibold text-slate-600 hover:text-dci-teal-deep">None fit, skip ({MAX_SKIPS - skipsUsed} left)</button>
							{/if}
							<button
								type="button"
								disabled={stage !== 'done' && !current?.skipped}
								onclick={next}
								class="rounded-2xl bg-dci-burgundy px-8 py-3 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
							>
								{qIndex === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
							</button>
						</div>
					</div>
				</div>
			{/key}

			<!-- The consultant's optional question. Never scored. -->
		{:else if phase === 'hardest'}
			<div in:fade={{ duration: ms(220) }}>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">Optional &middot; not scored</p>
				<h1 bind:this={heading} tabindex="-1" class="mt-3 font-serif text-2xl font-light leading-snug text-dci-teal-deep outline-none sm:text-3xl">
					{HARDEST_QUESTION.prompt}
				</h1>
				<p class="mt-3 text-sm text-slate-600">{HARDEST_QUESTION.hint}</p>
				<div class="mt-6 grid gap-3">
					{#each HARDEST_QUESTION.options as o (o.value)}
						<button
							type="button"
							aria-pressed={hardest.includes(o.value)}
							onclick={() => toggleHardest(o.value)}
							class={`rounded-2xl border p-4 text-left text-base transition-colors ${hardest.includes(o.value) ? 'border-dci-teal-deep bg-dci-teal/10' : 'border-dci-teal/20 bg-white/70 hover:border-dci-teal/50'}`}
						>
							{o.text}
						</button>
					{/each}
				</div>
				<div class="mt-8 flex items-center justify-between">
					<button type="button" onclick={back} class="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-dci-teal-deep"><ArrowLeft class="size-4" /> Back</button>
					<button type="button" onclick={finishQuestions} class="rounded-2xl bg-dci-burgundy px-8 py-3 text-sm font-semibold text-dci-cream transition-opacity hover:opacity-90">
						{hardest.length ? 'See my result' : 'Skip and see my result'}
					</button>
				</div>
			</div>

			<!-- Close call on the Go-to Model: one more question. No names yet. -->
		{:else if phase === 'clarifier' && clarifierOrder.length === 2}
			<div in:fade={{ duration: ms(220) }}>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">One last question</p>
				<h1 bind:this={heading} tabindex="-1" class="mt-3 font-serif text-2xl font-light leading-snug text-dci-teal-deep outline-none sm:text-3xl">
					Two patterns are close for you. Which sounds more like what is going on underneath?
				</h1>
				<div class="mt-6 grid gap-3">
					{#each clarifierOrder as m (m)}
						<button type="button" onclick={() => answerClarifier(m)} class="rounded-2xl border border-dci-teal/20 bg-white/70 p-4 text-left text-base text-slate-800 transition-colors hover:border-dci-burgundy/50">
							{pairText(m)}
						</button>
					{/each}
					<button type="button" onclick={() => answerClarifier('both')} class="rounded-2xl border border-dci-teal/20 p-4 text-left text-base text-slate-700 hover:border-dci-teal/50">Both sound like me</button>
					<button type="button" onclick={() => answerClarifier('neither')} class="rounded-2xl border border-dci-teal/20 p-4 text-left text-base text-slate-700 hover:border-dci-teal/50">Neither quite fits</button>
				</div>
				<button type="button" onclick={back} class="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-dci-teal-deep"><ArrowLeft class="size-4" /> Back</button>
			</div>

			<!-- Result: one page, in the agreed order a to g -->
		{:else if phase === 'result'}
			<div in:fade={{ duration: ms(300) }} class="space-y-10">
				<!-- (a) Hero: the combination, the signature line, Share -->
				<section aria-labelledby="result-hero">
					<DraftBadge />
					<h1 id="result-hero" bind:this={heading} tabindex="-1" class="mt-4 font-serif text-3xl font-light leading-tight text-dci-teal-deep outline-none sm:text-4xl">{HEADLINE}</h1>
					<div class="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:gap-3">
						<div class="min-w-0 flex-1 rounded-2xl bg-dci-teal-deep p-5 text-dci-cream">
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-cream/70">{GO_TO_LABEL}</p>
							<p class="mt-1 flex items-center gap-2 font-serif text-2xl font-light break-words sm:text-3xl"><GoToIcon class="size-6 shrink-0" /> <span class="min-w-0">{goTo.name}</span></p>
							<p class="mt-1 text-xs text-dci-cream/75">{GO_TO_DEFINITION}</p>
						</div>
						{#if under}
							<div class="flex items-center justify-center text-dci-teal-deep" aria-hidden="true"><ArrowRight class="size-6 rotate-90 sm:rotate-0" /></div>
							<div class="min-w-0 flex-1 rounded-2xl border border-dci-teal/25 bg-white/70 p-5">
								<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">{UNDER_PRESSURE_LABEL}</p>
								<p class="mt-1 font-serif text-2xl font-light break-words text-dci-teal-deep sm:text-3xl">{under.name}</p>
								<p class="mt-1 text-xs text-slate-600">{UNDER_PRESSURE_DEFINITION}</p>
							</div>
						{/if}
					</div>
					<p class="mt-4 font-serif text-xl italic text-slate-800">&ldquo;{goTo.signature}&rdquo;</p>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						{PATTERN_NOTE}
						{#if alsoClose}Your answers also leaned towards {alsoClose.name}.{/if}
					</p>
					{#if quietNote}
						<p class="mt-3 text-sm leading-relaxed text-slate-700">{quietNote}</p>
					{/if}
					<div class="mt-5"><SharePanel primary={result.primary} underPressure={result.underPressure} /></div>
				</section>

				<!-- (b) Reaction vs response, then the tiny step -->
				<section aria-labelledby="reaction-response">
					<h2 id="reaction-response" class="sr-only">Reaction and response</h2>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="rounded-2xl border border-dci-teal/15 bg-white/70 p-5">
							<p class="text-sm font-semibold text-dci-burgundy">{REACTION.label}</p>
							<p class="text-xs text-slate-600">{REACTION.definition}</p>
							<p class="mt-2 text-base leading-relaxed text-slate-800">{goTo.reaction}</p>
						</div>
						<div class="rounded-2xl border border-dci-teal/15 bg-white/70 p-5">
							<p class="text-sm font-semibold text-dci-teal-deep">{RESPONSE.label}</p>
							<p class="text-xs text-slate-600">{RESPONSE.definition}</p>
							<p class="mt-2 text-base leading-relaxed text-slate-800">{goTo.response}</p>
						</div>
					</div>
					<div class="mt-3 rounded-2xl border border-dci-burgundy/20 bg-dci-burgundy/5 p-5">
						<p class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-burgundy">Your tiny step</p>
						<p class="mt-2 text-base leading-relaxed text-slate-900">{goTo.tinyStep}</p>
					</div>
				</section>

				<!-- (c) Blind spot -->
				<section aria-labelledby="blind-spot">
					<h2 id="blind-spot" class="text-lg font-semibold text-dci-teal-deep">Blind spot</h2>
					<p class="mt-1 text-base leading-relaxed text-slate-800">{goTo.blindSpot}</p>
				</section>

				<!-- (d) A line you can send -->
				<LineToSend modelId={result.primary} />

				<!-- (e) Full report: preview, unlocked by email -->
				<div class="space-y-5">
					<FullReport primary={result.primary} underPressure={result.underPressure} {unlocked} pressure={stressState} onfit={(v) => (fit = v)} />
					{#if !unlocked}
						<KeepNoticing primary={result.primary} underPressure={result.underPressure} available={data.remindersAvailable} onunlocked={() => (unlocked = true)} />
					{/if}
				</div>

				<!-- (f) Keep going / Pass it on -->
				<NextCards />

				<!-- Pilot extras (kept from Draft 1): optional, collapsed -->
				<details class="group rounded-2xl border border-dci-teal/15 bg-white/60">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-dci-teal-deep">
						Help improve this pilot (optional)
						<CaretDown class="size-4 shrink-0 transition-transform group-open:rotate-180" />
					</summary>
					<div class="space-y-8 px-5 pb-5">
						<CountForm primary={result.primary} underPressure={result.underPressure} clarity={result.clarity} pressure={stressState} available={data.remindersAvailable} />
						<div>
							<h3 class="text-base font-semibold text-dci-teal-deep">{DEVICE.heading}</h3>
							<p class="mt-1 text-sm leading-relaxed text-slate-600">{DEVICE.body}</p>
							<label class="mt-3 flex items-start gap-2 text-sm text-slate-700">
								<input type="checkbox" checked={keepOnDevice} onchange={(e) => setKeep(e.currentTarget.checked)} class="mt-1 accent-[var(--dci-burgundy)]" />
								{DEVICE.label}
							</label>
							{#if storageNote}<p class="mt-2 text-sm text-dci-teal-deep" role="status">{storageNote}</p>{/if}
						</div>
						<FeedbackForm primary={result.primary} underPressure={result.underPressure} clarity={result.clarity} {variants} pressure={stressState} {hardest} {fit} />
					</div>
				</details>

				<!-- (g) Footer: try another Model, retake, help -->
				<nav aria-label="What next" class="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dci-teal/10 pt-6 text-sm">
					<a href="/mental-models#models" class="font-semibold text-dci-teal-deep underline underline-offset-4">Try another Model</a>
					<button type="button" onclick={retake} class="font-semibold text-dci-teal-deep underline underline-offset-4">Retake</button>
					<HelpLine class="!text-sm" />
				</nav>
				<p class="text-xs leading-relaxed text-slate-600">{DRAFT_NOTE}</p>
			</div>
		{/if}
	</main>

	{#if phase !== 'result'}
		<footer class="border-t border-dci-teal/10 px-4 py-4 text-center sm:px-6">
			<HelpLine class="mx-auto max-w-xl" />
		</footer>
	{/if}
</div>
