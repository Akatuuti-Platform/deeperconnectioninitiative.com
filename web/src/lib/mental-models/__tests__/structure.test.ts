import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { QUESTIONS, OPTION_INDEX, STATE_QUESTION, HARDEST_QUESTION } from '../questions';
import { MODELS, MODEL_LIST } from '../models';
import { MODEL_IDS } from '../types';
import { orderedPathways, stateMessage } from '../pathways';
import { buildShareText, shareMessage, whatsappUrl, lineYouCanSend } from '../share';
import { PILOT_MODEL_NAMES, PILOT_MODELS_ENABLED } from '../pilot';
import { mergeModels } from '../merge';
import * as consentCopy from '../consent-copy';
import { HEADLINE, REACTION, RESPONSE } from '../labels';

const dir = join(__dirname, '..');
const EM_DASH = /—/;

describe('question bank design', () => {
	it('has 12 questions with 5 distinct options each', () => {
		expect(QUESTIONS).toHaveLength(12);
		for (const q of QUESTIONS) {
			expect(q.options).toHaveLength(5);
			expect(new Set(q.options.map((o) => o.model)).size).toBe(5);
		}
	});

	it('uses unique option ids that start with their question id', () => {
		const ids = QUESTIONS.flatMap((q) => q.options.map((o) => o.id));
		expect(new Set(ids).size).toBe(ids.length);
		for (const q of QUESTIONS) for (const o of q.options) expect(o.id.startsWith(`${q.id}-`)).toBe(true);
		expect(Object.keys(OPTION_INDEX)).toHaveLength(60);
	});

	it('shows every Model in exactly 6 questions, so no Model has an easier path to a high score', () => {
		for (const m of MODEL_IDS) {
			const n = QUESTIONS.filter((q) => q.options.some((o) => o.model === m)).length;
			expect(n, m).toBe(6);
		}
	});

	it('puts every pair of Models in at least one question together', () => {
		for (let i = 0; i < MODEL_IDS.length; i++) {
			for (let j = i + 1; j < MODEL_IDS.length; j++) {
				const together = QUESTIONS.filter(
					(q) => q.options.some((o) => o.model === MODEL_IDS[i]) && q.options.some((o) => o.model === MODEL_IDS[j])
				).length;
				expect(together, `${MODEL_IDS[i]} + ${MODEL_IDS[j]}`).toBeGreaterThanOrEqual(1);
			}
		}
	});

	it('tests Observer, Drifter and Navigator against each other, not just alongside others', () => {
		const together = (a: string, b: string) =>
			QUESTIONS.filter((q) => q.options.some((o) => o.model === a) && q.options.some((o) => o.model === b)).length;
		expect(together('observer', 'drifter')).toBeGreaterThanOrEqual(4);
		expect(together('observer', 'navigator')).toBeGreaterThanOrEqual(4);
		expect(together('drifter', 'navigator')).toBeGreaterThanOrEqual(4);
		const allThree = QUESTIONS.filter((q) => ['observer', 'drifter', 'navigator'].every((m) => q.options.some((o) => o.model === m)));
		expect(allThree.length).toBeGreaterThanOrEqual(3);
	});

	it('marks three discriminator questions, each holding Observer, Drifter and Navigator', () => {
		const d = QUESTIONS.filter((q) => q.discriminator);
		expect(d).toHaveLength(3);
		for (const q of d) for (const m of ['observer', 'drifter', 'navigator']) expect(q.options.some((o) => o.model === m)).toBe(true);
	});

	it('keeps options short enough for a phone and never names a Model', () => {
		const names = MODEL_LIST.map((m) => m.name.toLowerCase());
		for (const q of QUESTIONS) {
			expect(q.prompt.length).toBeLessThan(120);
			for (const o of q.options) {
				expect(o.text.split(/\s+/).length, o.id).toBeLessThanOrEqual(16);
				for (const n of names) expect(o.text.toLowerCase().includes(n), `${o.id} names ${n}`).toBe(false);
			}
		}
	});

	it('balances option length across Models so length is not a hint', () => {
		const avg = (m: string) => {
			const opts = QUESTIONS.flatMap((q) => q.options.filter((o) => o.model === m));
			return opts.reduce((s, o) => s + o.text.length, 0) / opts.length;
		};
		const lens = MODEL_IDS.map(avg);
		expect(Math.max(...lens) - Math.min(...lens)).toBeLessThan(22);
	});
});

describe('Model content', () => {
	it('has every field filled for all ten Models', () => {
		expect(MODEL_LIST).toHaveLength(10);
		for (const m of MODEL_LIST) {
			for (const key of ['name', 'verb', 'signature', 'question', 'firstMove', 'strength', 'reaction', 'tooMuch', 'protecting', 'blindSpot', 'response', 'tinyStep', 'canTeach', 'shareLine', 'insideReason'] as const) {
				expect(m[key].trim().length, `${m.id}.${key}`).toBeGreaterThan(3);
			}
			expect(m.origin.body.length).toBeGreaterThan(40);
			expect(m.origin.reflect.endsWith('?')).toBe(true);
			expect(MODEL_IDS).toContain(m.learnFrom.model);
			expect(m.learnFrom.model).not.toBe(m.id);
		}
	});

	it('keeps childhood-origin material out of the main fields', () => {
		for (const m of MODEL_LIST) {
			for (const key of ['firstMove', 'strength', 'reaction', 'tooMuch', 'blindSpot', 'response', 'tinyStep'] as const) {
				expect(/childhood|parent|attachment|as a child/i.test(m[key]), `${m.id}.${key}`).toBe(false);
			}
		}
	});

	it('uses origin technical terms only in the optional "you may have heard" row', () => {
		for (const m of MODEL_LIST) {
			expect(/parentification|avoidant attachment|overparent/i.test(m.origin.body + m.origin.reflect)).toBe(false);
		}
		expect(MODELS.champion.origin.youMayHaveHeard).toMatch(/Parentification/);
	});

	it('never claims a cause for an origin: always "may", "perhaps" or "one possible"', () => {
		for (const m of MODEL_LIST) expect(/\bmay\b|\bperhaps\b|\bmight\b/.test(m.origin.body), m.id).toBe(true);
	});

	it('has no em dashes in any visible copy', () => {
		for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
			const text = readFileSync(join(dir, file), 'utf8');
			// Comments are exempt; only string literals matter, so check lines that are not comments.
			for (const line of text.split('\n')) {
				if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue;
				expect(EM_DASH.test(line), `${file}: ${line.trim().slice(0, 60)}`).toBe(false);
			}
		}
	});
});

describe('pathways and state handling', () => {
	const SITE_PATHS = ['/toolkit', '/clinics', '/champions', '/volunteering', '/support', '/contact'];

	it('gives every Model a learn, community and support step on real site routes', () => {
		for (const m of MODEL_LIST) {
			for (const kind of ['learn', 'community', 'support'] as const) {
				const p = m.pathways[kind];
				expect(p.label.length).toBeGreaterThan(5);
				expect(p.why.length).toBeGreaterThan(10);
				expect(SITE_PATHS.includes(p.href.split('#')[0]), `${m.id}.${kind} -> ${p.href}`).toBe(true);
			}
			expect(m.pathways.support.href).toBe('/support');
		}
	});

	it('puts support first when someone says it feels like too much, and never otherwise', () => {
		expect(orderedPathways('champion', 'overwhelmed')[0].kind).toBe('support');
		for (const s of ['steady', 'strained', 'unsaid'] as const) expect(orderedPathways('champion', s)[0].kind).not.toBe('support');
		for (const s of ['steady', 'strained', 'overwhelmed', 'unsaid'] as const) {
			expect(orderedPathways('observer', s).map((p) => p.kind).sort()).toEqual(['community', 'learn', 'support']);
		}
		expect(stateMessage('overwhelmed').emphasis).toBe('support');
		expect(stateMessage('steady').emphasis).toBe('none');
	});

	it('does not make the state question sound clinical or scored', () => {
		expect(STATE_QUESTION.hint).toMatch(/never scored/i);
		expect(STATE_QUESTION.options.map((o) => o.value)).toEqual(['steady', 'strained', 'overwhelmed', 'unsaid']);
		expect(HARDEST_QUESTION.hint).toMatch(/never scored/i);
	});
});

describe('sharing is private, minimal and about yourself', () => {
	it('shares the Go-to Model only by default', () => {
		expect(shareMessage('observer', 'drifter', false)).toBe('My Model is Observer. Which one are you?');
	});

	it('adds the Under-pressure Model only when the person chooses to', () => {
		expect(shareMessage('observer', 'drifter', true)).toBe('My Model is Observer, and under pressure I land on Drifter. Which one are you?');
		expect(shareMessage('observer', null, true)).toBe('My Model is Observer. Which one are you?');
	});

	it('never carries the verb, the origin story, the state or a score, and links to the front page', () => {
		for (const m of MODEL_LIST) {
			const text = buildShareText(m.id, null, false, 'https://example.test/mental-models');
			expect(text.includes(m.verb)).toBe(false);
			expect(text.includes(m.origin.body.slice(0, 30))).toBe(false);
			expect(/overwhelm|strained|steady|score|point/i.test(text)).toBe(false);
			expect(text.endsWith('/mental-models')).toBe(true);
		}
	});

	it('builds a WhatsApp link with the message encoded', () => {
		expect(whatsappUrl('My Model is Observer.')).toBe('https://wa.me/?text=My%20Model%20is%20Observer.');
	});

	it('"a line you can send" is built from the share line and speaks about the reader only', () => {
		for (const m of MODEL_LIST) {
			const line = lineYouCanSend(m.id);
			expect(line.startsWith("Something I'm learning about myself: ")).toBe(true);
			expect(line.toLowerCase()).toContain(m.shareLine.slice(1).toLowerCase());
			expect(/\byou are a\b|\bthey are\b|which one is/i.test(line)).toBe(false);
		}
	});
});

describe('wording rules (Draft 1.1)', () => {
	const svelteDirs = [join(dir, '..', 'components', 'mental-models'), join(dir, '..', '..', 'routes', 'mental-models')];
	const svelteFiles = (d: string): string[] =>
		readdirSync(d, { recursive: true }).map(String).filter((f) => f.endsWith('.svelte')).map((f) => join(d, f));
	const allSvelte = svelteDirs.flatMap(svelteFiles);

	it('uses Reaction and Response, never "On autopilot" or "On purpose"', () => {
		expect(REACTION.label).toBe('Reaction');
		expect(RESPONSE.label).toBe('Response');
		for (const f of allSvelte) expect(/On autopilot|On purpose/.test(readFileSync(f, 'utf8')), f).toBe(false);
	});

	it('uses the agreed headline', () => {
		expect(HEADLINE).toBe('Your Model is your go-to way of coping.');
	});

	it('never says "victim" anywhere in the content or pages', () => {
		const texts = [JSON.stringify(MODEL_LIST), JSON.stringify(QUESTIONS), JSON.stringify(consentCopy), ...allSvelte.map((f) => readFileSync(f, 'utf8'))];
		for (const t of texts) expect(/victim/i.test(t)).toBe(false);
	});

	it('has no em dashes in any page or component of the scorecard', () => {
		for (const f of allSvelte) expect(EM_DASH.test(readFileSync(f, 'utf8')), f).toBe(false);
	});

	it('keeps all consent wording in one file', () => {
		for (const key of ['UNLOCK', 'COUNT', 'FEEDBACK', 'DEVICE', 'PRIVACY_NOTICE', 'UNAVAILABLE']) expect(consentCopy).toHaveProperty(key);
		expect(consentCopy.UNAVAILABLE).toMatch(/not available right now/i);
	});
});

describe('pilot Models and merging', () => {
	it('keeps the two pilot Model names in one config value', () => {
		expect(Object.values(PILOT_MODEL_NAMES)).toEqual(["I'm Fine", 'The Overlooked']);
		expect(PILOT_MODELS_ENABLED).toBe(false);
	});

	it('merges by keeping the more complete field, and reports every conflict', () => {
		const { merged, conflicts, added } = mergeModels(
			{ observer: { strength: 'You see what others miss.', blindSpot: '' } },
			{ observer: { strength: 'You are reflective and you see what others miss.', blindSpot: 'Waiting can become not starting.' }, imFine: { name: "I'm Fine" } }
		);
		expect(merged.observer.strength).toBe('You are reflective and you see what others miss.');
		expect(merged.observer.blindSpot).toBe('Waiting can become not starting.');
		expect(conflicts).toEqual([{ model: 'observer', field: 'strength', kept: 'You are reflective and you see what others miss.', other: 'You see what others miss.' }]);
		expect(added).toEqual(['imFine']);
	});
});
