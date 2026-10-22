// Scoring for the Mental Models Scorecard, Draft 1.1.
//
// How it works:
//  1. Each scenario has two taps. "First, you..." gives 1 to the Model behind that option
//     (the Go-to score). "If that doesn't help, you..." gives 1 to the Model behind the second
//     option (the Under-pressure score). Skipped scenarios score nothing.
//  2. Every Model appears in exactly 6 scenarios, so totals are directly comparable (maximum 6).
//  3. The Go-to Model is the highest Go-to score. If first and second are within CLOSE_MARGIN,
//     one clarifier question decides ("which sounds more like what is underneath?"). Exact ties
//     are ordered by a hash of the person's own answers, never by a fixed Model order.
//  4. The Under-pressure Model is the highest Under-pressure score, shown only when it is clear:
//     at least UNDER_MIN_TAPS taps, a lead of UNDER_MIN_LEAD over the next Model, and different
//     from the Go-to Model. Otherwise only one Model is shown. No combination is hand-assigned.
//
// What is NOT here, on purpose: the person's current stress state. Nothing in this file accepts
// it, so it cannot change a Model. See the structural test in __tests__.

import { QUESTIONS, TAP_POINTS, MAX_SKIPS, CLOSE_MARGIN, UNDER_MIN_TAPS, UNDER_MIN_LEAD } from './questions';
import { MODEL_IDS } from './types';
import type { Answers, Clarifier, ModelId, QuizResult, UnderPressureStatus } from './types';

function emptyScores(): Record<ModelId, number> {
	return Object.fromEntries(MODEL_IDS.map((m) => [m, 0])) as Record<ModelId, number>;
}

export interface RawScores {
	goTo: Record<ModelId, number>;
	under: Record<ModelId, number>;
	answered: number;
	skipped: number;
}

/** Sums taps per Model. Unknown option ids, or options from another scenario, are ignored. */
export function sumScores(answers: Answers): RawScores {
	const goTo = emptyScores();
	const under = emptyScores();
	let answered = 0;
	let skipped = 0;

	for (const q of QUESTIONS) {
		const a = answers[q.id];
		if (!a) continue;
		if (a.skipped && !a.first) {
			skipped += 1;
			continue;
		}
		const first = q.options.find((o) => o.id === a.first);
		if (!first) continue;
		answered += 1;
		goTo[first.model] += TAP_POINTS;
		const then = q.options.find((o) => o.id === a.then);
		if (then) under[then.model] += TAP_POINTS;
	}
	return { goTo, under, answered, skipped };
}

/** True when every scenario has both taps or was skipped, and no more than MAX_SKIPS were skipped. */
export function isComplete(answers: Answers): boolean {
	let skipped = 0;
	for (const q of QUESTIONS) {
		const a = answers[q.id];
		if (!a) return false;
		if (a.skipped && !a.first) {
			skipped += 1;
			continue;
		}
		const ids = q.options.map((o) => o.id);
		if (!a.first || !a.then || !ids.includes(a.first) || !ids.includes(a.then)) return false;
	}
	return skipped <= MAX_SKIPS;
}

/** A small stable hash, so tie-breaks look random across people but never change for one person. */
function tieHash(seed: string, model: ModelId): number {
	let h = 2166136261;
	const text = `${seed}|${model}`;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

/** The same answers always produce the same seed. */
export function answersSeed(answers: Answers): string {
	return QUESTIONS.map((q) => `${q.id}:${answers[q.id]?.first ?? ''}:${answers[q.id]?.then ?? ''}`).join('|');
}

/** Strongest first. Equal scores are ordered by a hash of the person's own answers. */
export function rankModels(scores: Record<ModelId, number>, seed: string): ModelId[] {
	return [...MODEL_IDS].sort((x, y) => {
		if (scores[y] !== scores[x]) return scores[y] - scores[x];
		return tieHash(seed, x) - tieHash(seed, y);
	});
}

/** The Under-pressure Model, or why there is not one. */
export function underPressureFor(
	under: Record<ModelId, number>,
	goTo: ModelId,
	seed: string
): { model: ModelId | null; status: UnderPressureStatus } {
	const ranked = rankModels(under, `${seed}|under`);
	const top = ranked[0];
	const lead = under[top] - under[ranked[1]];
	if (under[top] < UNDER_MIN_TAPS || lead < UNDER_MIN_LEAD) return { model: null, status: 'unclear' };
	if (top === goTo) return { model: null, status: 'same' };
	return { model: top, status: 'shown' };
}

export function computeResult(answers: Answers, clarifier?: Clarifier | null): QuizResult {
	const raw = sumScores(answers);
	const seed = answersSeed(answers);
	const ranking = rankModels(raw.goTo, seed);
	const top = ranking[0];
	const next = ranking[1];
	const margin = raw.goTo[top] - raw.goTo[next];

	const base = {
		goToScores: raw.goTo,
		underScores: raw.under,
		ranking,
		margin,
		answered: raw.answered,
		skipped: raw.skipped
	};

	const withUnder = (primary: ModelId) => {
		const u = underPressureFor(raw.under, primary, seed);
		return { primary, underPressure: u.model, underPressureStatus: u.status };
	};

	if (margin > CLOSE_MARGIN) {
		return { ...base, ...withUnder(top), alsoClose: null, clarity: 'clear', needsClarifier: null };
	}

	// A clarifier only counts if it was asked about this exact pair.
	const pair = new Set([clarifier?.a, clarifier?.b]);
	const matches = clarifier && pair.size === 2 && pair.has(top) && pair.has(next);

	if (!matches || !clarifier) {
		return { ...base, ...withUnder(top), alsoClose: null, clarity: 'pending', needsClarifier: { a: top, b: next } };
	}

	if (clarifier.choice === top || clarifier.choice === next) {
		return { ...base, ...withUnder(clarifier.choice), alsoClose: null, clarity: 'clarified', needsClarifier: null };
	}

	// "Both" or "neither": name the stronger one, and say the other was close.
	return { ...base, ...withUnder(top), alsoClose: next, clarity: 'blend', needsClarifier: null };
}
