// Simulated respondents. These are NOT real people and prove nothing about validity. They check
// one narrow thing: given the scenarios and scoring, can a known Go-to and Under-pressure pattern
// be recovered from noisy answers, and how often is a second Model shown when it should not be?
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../questions';
import { computeResult } from '../scoring';
import { MODEL_IDS } from '../types';
import type { Answers, ModelId } from '../types';

function mulberry32(seed: number) {
	return () => {
		seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const AFFINITY: Array<[ModelId, ModelId]> = [
	['observer', 'intellectual'], ['observer', 'drifter'], ['observer', 'navigator'], ['drifter', 'navigator'],
	['drifter', 'receiver'], ['navigator', 'champion'], ['navigator', 'receiver'], ['angel', 'sponsor'],
	['angel', 'champion'], ['connector', 'receiver'], ['connector', 'angel'], ['advocate', 'champion'],
	['advocate', 'intellectual'], ['champion', 'sponsor']
];
const related = (a: ModelId, b: ModelId) => AFFINITY.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

function pick<T extends { model: ModelId }>(items: T[], near: ModelId, rnd: () => number): T {
	const w = items.map((o) => 1 + (related(near, o.model) ? 3 : 0));
	let r = rnd() * w.reduce((a, b) => a + b, 0);
	for (let i = 0; i < items.length; i++) { r -= w[i]; if (r <= 0) return items[i]; }
	return items[items.length - 1];
}

function respond(goTo: ModelId, under: ModelId, hit: number, rnd: () => number): Answers {
	const answers: Answers = {};
	for (const q of QUESTIONS) {
		const g = q.options.find((o) => o.model === goTo);
		const first = g && rnd() < hit ? g : pick(q.options, goTo, rnd);
		const u = q.options.find((o) => o.model === under);
		const then = u && rnd() < hit ? u : rnd() < 0.3 ? first : pick(q.options, under, rnd);
		answers[q.id] = { first: first.id, then: then.id };
	}
	return answers;
}

function run(hit: number, perModel: number, seed: number) {
	const rnd = mulberry32(seed);
	let goRight = 0, total = 0, clar = 0;
	let diff = 0, underShownRight = 0, underShownWrong = 0, underHidden = 0;
	let same = 0, sameWronglyShown = 0;
	for (const g of MODEL_IDS) {
		for (let i = 0; i < perModel; i++) {
			const u = rnd() < 0.25 ? g : MODEL_IDS.filter((m) => m !== g)[Math.floor(rnd() * 9)];
			const a = respond(g, u, hit, rnd);
			let r = computeResult(a);
			if (r.needsClarifier) {
				clar++;
				const { a: x, b: y } = r.needsClarifier;
				const choice = g === x || g === y ? (rnd() < 0.75 ? g : g === x ? y : x) : rnd() < 0.5 ? x : y;
				r = computeResult(a, { a: x, b: y, choice });
			}
			total++;
			if (r.primary === g) goRight++;
			if (u === g) {
				same++;
				if (r.underPressure) sameWronglyShown++;
			} else {
				diff++;
				if (!r.underPressure) underHidden++;
				else if (r.underPressure === u) underShownRight++;
				else underShownWrong++;
			}
		}
	}
	return {
		goTo: goRight / total,
		clarifier: clar / total,
		underRightWhenShown: underShownRight / Math.max(1, underShownRight + underShownWrong),
		underShownWhenDifferent: (underShownRight + underShownWrong) / diff,
		secondWronglyShownWhenSame: sameWronglyShown / same
	};
}

const pct = (n: number) => `${Math.round(n * 100)}%`;

describe('simulated respondents (design check, not validity evidence)', () => {
	for (const hit of [0.7, 0.5]) {
		it(`recovers patterns when a respondent picks their own option ${pct(hit)} of the time`, () => {
			const r = run(hit, 1200, 11);
			console.log(`\nhit ${pct(hit)}: Go-to right ${pct(r.goTo)} (clarifier asked ${pct(r.clarifier)}); Under-pressure shown when different ${pct(r.underShownWhenDifferent)}, right when shown ${pct(r.underRightWhenShown)}; a second Model wrongly shown when there is none ${pct(r.secondWronglyShownWhenSame)}`);
			if (hit >= 0.7) {
				expect(r.goTo).toBeGreaterThan(0.75);
				expect(r.underRightWhenShown).toBeGreaterThan(0.8);
			} else {
				expect(r.goTo).toBeGreaterThan(0.45);
			}
		});
	}

	it('does not favour any Go-to Model when answers are random', () => {
		const rnd = mulberry32(99);
		const counts: Record<string, number> = Object.fromEntries(MODEL_IDS.map((m) => [m, 0]));
		const N = 6000;
		for (let i = 0; i < N; i++) {
			const a: Answers = {};
			for (const q of QUESTIONS) a[q.id] = { first: q.options[Math.floor(rnd() * 5)].id, then: q.options[Math.floor(rnd() * 5)].id };
			counts[computeResult(a).primary]++;
		}
		const shares = MODEL_IDS.map((m) => counts[m] / N);
		console.log('\nRandom-answer Go-to shares: ' + MODEL_IDS.map((m, i) => `${m} ${pct(shares[i])}`).join(', '));
		for (const s of shares) { expect(s).toBeGreaterThan(0.075); expect(s).toBeLessThan(0.125); }
	});
});
