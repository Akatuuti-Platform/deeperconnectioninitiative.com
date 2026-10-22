// Wording the consultant's draft asked to test in the youth pilot. Defaults are this
// draft's first-pass decisions. Reviewers can preview the alternatives with
//   ?drifterVerb=stuck|hide|withdraw   and   ?sectionFive=learn-from|compatible
// and the active variants are sent with anonymous feedback.

export type DrifterVerb = 'stuck' | 'hide' | 'withdraw';
export type SectionFive = 'learn-from' | 'compatible';

export interface Variants {
	drifterVerb: DrifterVerb;
	sectionFive: SectionFive;
}

export const DEFAULT_VARIANTS: Variants = { drifterVerb: 'stuck', sectionFive: 'learn-from' };

const DRIFTER_VERBS: Record<DrifterVerb, string> = {
	stuck: 'I GET STUCK',
	hide: 'I HIDE',
	withdraw: 'I WITHDRAW'
};

export function parseVariants(params: URLSearchParams): Variants {
	const verb = params.get('drifterVerb');
	const five = params.get('sectionFive');
	return {
		drifterVerb: verb && verb in DRIFTER_VERBS ? (verb as DrifterVerb) : DEFAULT_VARIANTS.drifterVerb,
		sectionFive: five === 'compatible' || five === 'learn-from' ? five : DEFAULT_VARIANTS.sectionFive
	};
}

/** The verb shown for a Model, honouring the Drifter pilot variant. */
export function verbFor(modelId: string, defaultVerb: string, variants: Variants): string {
	return modelId === 'drifter' ? DRIFTER_VERBS[variants.drifterVerb] : defaultVerb;
}

export function sectionFiveHeading(variants: Variants): string {
	return variants.sectionFive === 'compatible' ? 'Most compatible with' : 'Learn from';
}
