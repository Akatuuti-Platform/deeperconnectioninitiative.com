<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRightIcon as ArrowRight, LockSimpleIcon as Lock } from 'phosphor-svelte';
	import DraftBadge from '$lib/components/mental-models/draft-badge.svelte';
	import HelpLine from '$lib/components/mental-models/help-line.svelte';
	import { MODEL_LIST, MODELS, isModelId } from '$lib/mental-models/models';
	import { MODEL_ICONS } from '$lib/mental-models/icons';
	import { DRAFT_NOTE } from '$lib/mental-models/version';
	import { track } from '$lib/mental-models/track';

	const STORE_KEY = 'dci-mental-models-draft1';
	let saved = $state<{ primary: string; secondary: string | null; at: string } | null>(null);

	// Only shows if the person chose to keep a result on this device.
	onMount(() => {
		track('landing_view');
		try {
			const raw = localStorage.getItem(STORE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (parsed && isModelId(parsed.primary)) saved = parsed;
		} catch {
			saved = null;
		}
	});

	function forget() {
		try {
			localStorage.removeItem(STORE_KEY);
		} catch {
			/* nothing to remove */
		}
		saved = null;
	}

	const steps = [
		['Notice', 'What is happening in me?'],
		['Understand', 'What is my familiar reaction protecting?'],
		['Choose', 'What is one next step?'],
		['Practise', 'What small action, and who could help?']
	];
</script>

<section class="px-4 pb-10 pt-28 sm:px-6 lg:pt-36">
	<div class="mx-auto max-w-3xl">
		<DraftBadge />
		<p class="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">DCI Mental Models Scorecard</p>
		<h1 class="mt-3 font-serif text-4xl font-light leading-tight text-dci-teal-deep sm:text-6xl">When stress hits, how do you respond?</h1>
		<p class="mt-4 text-lg leading-relaxed text-slate-700">Or: what do you do when something feels wrong?</p>
		<p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-700">
			You may not choose your first reaction. You can learn to recognise it, understand what it is trying to do for you, and practise choosing what comes next.
		</p>

		{#if saved}
			<div class="mt-6 rounded-2xl border border-dci-teal/20 bg-white/70 p-4 text-sm text-slate-700" role="status">
				You kept a result on this device ({saved.at}): <strong class="text-dci-teal-deep">{MODELS[saved.primary as keyof typeof MODELS]?.name}</strong>.
				<a href={`/mental-models/${saved.primary}`} class="font-semibold text-dci-teal-deep underline underline-offset-4">Read it again</a>
				or <button type="button" onclick={forget} class="font-semibold text-dci-burgundy underline underline-offset-4">delete it from this device</button>.
			</div>
		{/if}

		<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
			<a
				href="/mental-models/take"
				class="inline-flex items-center justify-center gap-2 rounded-2xl bg-dci-burgundy px-8 py-4 text-base font-semibold text-dci-cream transition-opacity hover:opacity-90"
			>
				Discover How You Respond to Stress <ArrowRight class="size-5" />
			</a>
			<p class="flex items-center gap-2 text-sm text-slate-600"><Lock class="size-4 text-dci-teal-deep" /> 12 short scenarios, two taps each &middot; about 5 minutes &middot; private by default</p>
		</div>
	</div>
</section>

<section class="px-4 py-10 sm:px-6">
	<div class="mx-auto max-w-3xl space-y-10">
		<div>
			<h2 class="text-2xl font-semibold text-dci-teal-deep">Four steps sit across every Model</h2>
			<ol class="mt-4 grid gap-3 sm:grid-cols-2">
				{#each steps as [title, q], i}
					<li class="rounded-2xl border border-dci-teal/15 bg-white/60 p-4">
						<p class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-burgundy">{i + 1} &middot; {title}</p>
						<p class="mt-1 text-base text-slate-800">{q}</p>
					</li>
				{/each}
			</ol>
			<p class="mt-4 text-sm leading-relaxed text-slate-600">
				A reaction is not bad and a response is not good. Reactions can signal danger, unmet needs or injustice. The aim is more options. &ldquo;Response-ability&rdquo; means some say over your next step, not blame for how you feel.
			</p>
		</div>

		<div>
			<h2 class="text-2xl font-semibold text-dci-teal-deep">Two separate things</h2>
			<div class="mt-4 grid gap-3 sm:grid-cols-2">
				<div class="rounded-2xl border border-dci-teal/15 bg-white/60 p-5">
					<p class="text-sm font-semibold text-dci-teal-deep">How much pressure am I under?</p>
					<p class="mt-2 text-base text-slate-800">Steady, strained or overwhelmed. This changes. It is a state for today, not a type, and it is never scored.</p>
				</div>
				<div class="rounded-2xl border border-dci-teal/15 bg-white/60 p-5">
					<p class="text-sm font-semibold text-dci-teal-deep">How am I responding?</p>
					<p class="mt-2 text-base text-slate-800">A reaction can happen by default, without thinking; a response is a chosen next step, with awareness. Your Model is your go-to way of coping. It is a pattern, not who you are, and you can have more than one.</p>
				</div>
			</div>
		</div>

		<div id="models" class="scroll-mt-28">
			<h2 class="text-2xl font-semibold text-dci-teal-deep">The Models</h2>
			<p class="mt-1 text-sm text-slate-600">Browse them any time. You do not need to take the scorecard first.</p>
			<ul class="mt-4 grid gap-3 sm:grid-cols-2">
				{#each MODEL_LIST as m (m.id)}
					{@const Icon = MODEL_ICONS[m.id]}
					<li>
						<a href={`/mental-models/${m.id}`} class="flex h-full items-start gap-3 rounded-2xl border border-dci-teal/15 bg-white/60 p-4 transition-colors hover:border-dci-burgundy/40">
							<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-dci-teal/10 text-dci-teal-deep"><Icon class="size-5" /></span>
							<span>
								<span class="block text-base font-semibold text-dci-teal-deep">{m.name}</span>
								<span class="mt-0.5 block font-serif text-sm italic text-slate-700">&ldquo;{m.signature}&rdquo;</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="rounded-2xl bg-dci-teal-deep p-6 text-dci-cream">
			<h2 class="text-lg font-semibold">What this is, and is not</h2>
			<ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-dci-cream/90">
				<li>It is a reflection tool about how you usually respond. It is not a diagnosis or a clinical assessment.</li>
				<li>Your result is a pattern that can change, never a fixed identity.</li>
				<li>Your result is private by default. Sharing is always your choice.</li>
				<li>Looking at where a pattern may come from is optional, and only ever one possible influence.</li>
			</ul>
			<p class="mt-4 text-sm leading-relaxed text-dci-cream/90">
				The scorecard is a snapshot of how you tend to respond when stress hits. It is not a diagnosis, and it cannot tell you what will happen. Tracking your mood over time shows you how you actually are, day to day, so you can notice a pattern sooner. For communities, the DCI Early Warning System is being built to look at shared patterns so people can step in earlier. These are tools for awareness and earlier conversations. They are not tests, and they have not been shown to predict a crisis.
			</p>
		</div>

		<HelpLine />
		<p class="text-xs leading-relaxed text-slate-600">{DRAFT_NOTE}</p>
	</div>
</section>
