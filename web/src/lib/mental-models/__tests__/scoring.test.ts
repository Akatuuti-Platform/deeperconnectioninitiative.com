import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { QUESTIONS, MAX_SKIPS, CLOSE_MARGIN, UNDER_MIN_TAPS } from '../questions';
import { computeResult, isComplete, sumScores, rankModels, answersSeed, underPressureFor } from '../scoring';
import { MODEL_IDS } from '../types';
import type { Answers, ModelId } from '../types';

const opt = (qid: string, m: ModelId) => QUESTIONS.find((q) => q.id === qid)!.options.find((o) => o.model === m)?.id;

/**
 * A respondent whose first tap is always `goTo` where it appears, and whose second tap is
 * `under` where it appears (otherwise the same as the first). Where `goTo` is absent, the first
 * tap rotates through the other Models so the Go-to still clearly leads.
 */
function respondent(goTo: ModelId, under: ModelId = goTo): Answers {
	const answers: Answers = {};
	let rot = 0;
	for (const q of QUESTIONS) {
		const mine = q.options.find((o) => o.model === goTo);
		const first = mine ?? q.options.filter((o) => o.model !== goTo && o.model !== under)[rot++ % 3] ?? q.options[0];
		const then = q.options.find((o) => o.model === under) ?? first;
		answers[q.id] = { first: first.id, then: then.id };
	}
	return answers;
}

describe('every Model can be the Go-to Model', () => {
	for (const m of MODEL_IDS) {
		it(`${m}: a respondent who always taps it first gets it as their Go-to`, () => {
			const r = computeResult(respondent(m));
			expect(r.primary).toBe(m);
			expect(r.clarity).toBe('clear');
			expect(r.goToScores[m]).toBe(6);
		});
	}
});

describe('Go-to and Under-pressure come from the taps, never from a lookup', () => {
	it('every ordered pair of different Models can come out as Go-to then Under pressure', () => {
		for (const g of MODEL_IDS) {
			for (const u of MODEL_IDS) {
				if (g === u) continue;
				const r = computeResult(respondent(g, u));
				expect(r.primary, `${g} -> ${u}`).toBe(g);
				expect(r.underPressure, `${g} -> ${u}`).toBe(u);
				expect(r.underPressureStatus).toBe('shown');
			}
		}
	});

	it('scores the first taps and the second taps separately', () => {
		const a: Answers = { q1: { first: opt('q1', 'drifter'), then: opt('q1', 'receiver') } };
		const raw = sumScores(a);
		expect(raw.goTo.drifter).toBe(1);
		expect(raw.goTo.receiver).toBe(0);
		expect(raw.under.receiver).toBe(1);
		expect(raw.under.drifter).toBe(0);
	});

	it('lets the second tap repeat the first, and counts it as Under pressure', () => {
		const raw = sumScores({ q1: { first: opt('q1', 'navigator'), then: opt('q1', 'navigator') } });
		expect(raw.goTo.navigator).toBe(1);
		expect(raw.under.navigator).toBe(1);
	});

	it('ignores unknown ids and options from another scenario', () => {
		const raw = sumScores({ q1: { first: 'nope', then: 'q2-angel' }, q2: { first: opt('q2', 'angel'), then: 'q1-drifter' } });
		expect(raw.answered).toBe(1);
		expect(raw.goTo.angel).toBe(1);
		expect(Object.values(raw.under).every((v) => v === 0)).toBe(true);
	});
});

describe('one Model only (the fallback)', () => {
	it('shows one Model when the second taps point to the Go-to Model itself', () => {
		const r = computeResult(respondent('champion'));
		expect(r.underPressure).toBeNull();
		expect(r.underPressureStatus).toBe('same');
	});

	it('shows one Model when the second taps do not support a clear second one', () => {
		// Second taps spread thinly: no Model reaches the minimum.
		const a = respondent('observer');
		const spread: ModelId[] = ['angel', 'champion', 'connector', 'sponsor', 'advocate', 'intellectual', 'receiver', 'drifter', 'navigator', 'angel', 'champion', 'connector'];
		QUESTIONS.forEach((q, i) => {
			const t = q.options.find((o) => o.model === spread[i] && o.model !== 'observer') ?? q.options.find((o) => o.model !== 'observer')!;
			a[q.id] = { ...a[q.id], then: t.id };
		});
		const r = computeResult(a);
		expect(r.primary).toBe('observer');
		expect(r.underPressure).toBeNull();
		expect(r.underPressureStatus).toBe('unclear');
	});

	it(`needs at least ${UNDER_MIN_TAPS} second taps for an Under-pressure Model`, () => {
		const under = Object.fromEntries(MODEL_IDS.map((m) => [m, 0])) as Record<ModelId, number>;
		under.drifter = UNDER_MIN_TAPS - 1;
		expect(underPressureFor(under, 'observer', 'x')).toEqual({ model: null, status: 'unclear' });
		under.drifter = UNDER_MIN_TAPS;
		expect(underPressureFor(under, 'observer', 'x')).toEqual({ model: 'drifter', status: 'shown' });
	});
});

describe('ties', () => {
	it('an Under-pressure tie at the top shows only the Go-to Model', () => {
		const under = Object.fromEntries(MODEL_IDS.map((m) => [m, 0])) as Record<ModelId, number>;
		under.drifter = 4;
		under.navigator = 4;
		expect(underPressureFor(under, 'observer', 'seed')).toEqual({ model: null, status: 'unclear' });
	});

	/** Three first taps each for two Models, the rest spread across others. */
	function goToTie(x: ModelId, y: ModelId): Answers {
		const a: Answers = {};
		let nx = 0;
		let ny = 0;
		let rot = 0;
		for (const q of QUESTIONS) {
			const ox = q.options.find((o) => o.model === x);
			const oy = q.options.find((o) => o.model === y);
			let first;
			if (ox && nx < 3) { first = ox; nx++; }
			else if (oy && ny < 3) { first = oy; ny++; }
			else first = q.options.filter((o) => o.model !== x && o.model !== y)[rot++ % 3];
			a[q.id] = { first: first.id, then: first.id };
		}
		return a;
	}

	it(`asks a clarifier when the Go-to top two are within ${CLOSE_MARGIN} tap`, () => {
		const r = computeResult(goToTie('champion', 'angel'));
		expect(r.goToScores.champion).toBe(r.goToScores.angel);
		expect(r.clarity).toBe('pending');
		expect(new Set([r.needsClarifier!.a, r.needsClarifier!.b])).toEqual(new Set(['champion', 'angel']));
	});

	it('names the Model the person chooses in the clarifier', () => {
		const a = goToTie('champion', 'angel');
		const { a: x, b: y } = computeResult(a).needsClarifier!;
		const r = computeResult(a, { a: x, b: y, choice: y });
		expect(r.clarity).toBe('clarified');
		expect(r.primary).toBe(y);
	});

	it('with "both" or "neither", names the stronger one and says the other was close', () => {
		const a = goToTie('champion', 'angel');
		const { a: x, b: y } = computeResult(a).needsClarifier!;
		for (const choice of ['both', 'neither'] as const) {
			const r = computeResult(a, { a: x, b: y, choice });
			expect(r.clarity).toBe('blend');
			expect([x, y]).toContain(r.primary);
			expect(r.alsoClose).toBe(r.primary === x ? y : x);
		}
	});

	it('ignores a stale clarifier asked about a different pair', () => {
		expect(computeResult(goToTie('champion', 'angel'), { a: 'observer', b: 'drifter', choice: 'observer' }).clarity).toBe('pending');
	});

	it('orders an exact tie without favouring a fixed Model order', () => {
		const scores = Object.fromEntries(MODEL_IDS.map((m) => [m, 0])) as Record<ModelId, number>;
		scores.observer = 4;
		scores.drifter = 4;
		let observerFirst = 0;
		for (let i = 0; i < 400; i++) if (rankModels(scores, `person-${i}`)[0] === 'observer') observerFirst++;
		expect(observerFirst).toBeGreaterThan(140);
		expect(observerFirst).toBeLessThan(260);
		expect(rankModels(scores, answersSeed(respondent('angel')))).toEqual(rankModels(scores, answersSeed(respondent('angel'))));
	});
});

describe('completeness and skipping', () => {
	it('requires both taps on every answered scenario', () => {
		const a = respondent('angel');
		expect(isComplete(a)).toBe(true);
		a.q1 = { first: a.q1.first };
		expect(isComplete(a)).toBe(false);
	});

	it(`allows up to ${MAX_SKIPS} skipped scenarios and no more`, () => {
		const skip = (n: number): Answers => {
			const a = respondent('angel');
			QUESTIONS.slice(0, n).forEach((q) => (a[q.id] = { skipped: true }));
			return a;
		};
		expect(isComplete(skip(MAX_SKIPS))).toBe(true);
		expect(isComplete(skip(MAX_SKIPS + 1))).toBe(false);
	});
});

describe('stress state is not part of scoring', () => {
	it('the scoring module never references a state', () => {
		const src = readFileSync(join(__dirname, '..', 'scoring.ts'), 'utf8')
			.split('\n')
			.filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l))
			.join('\n');
		expect(/StressState|stress|steady|strained|overwhelmed/i.test(src)).toBe(false);
		expect(computeResult.length).toBeLessThanOrEqual(2);
	});
});
