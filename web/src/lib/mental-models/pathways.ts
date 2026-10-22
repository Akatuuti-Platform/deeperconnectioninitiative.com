// Next steps. Every result gets all three kinds of step, ordered by how someone said they are.
//
// DCI does not provide clinical support itself. It builds the infrastructure that lets
// communities own support, and refers responsibly. So the "support" step always routes to
// DCI's contact and referral page and never implies a clinical service.

import { MODELS } from './models';
import type { ModelId, Pathway, StressState } from './types';

export type PathwayKind = 'learn' | 'community' | 'support';

export interface OrderedPathway extends Pathway {
	kind: PathwayKind;
	kindLabel: string;
}

const KIND_LABELS: Record<PathwayKind, string> = {
	learn: 'Learn',
	community: 'Community',
	support: 'Support'
};

const ORDER: Record<StressState, PathwayKind[]> = {
	steady: ['learn', 'community', 'support'],
	strained: ['learn', 'support', 'community'],
	// Support first. The person said it feels like too much, so the first thing on offer is a person.
	overwhelmed: ['support', 'community', 'learn'],
	unsaid: ['learn', 'community', 'support']
};

export function orderedPathways(model: ModelId, state: StressState): OrderedPathway[] {
	const p = MODELS[model].pathways;
	return ORDER[state].map((kind) => ({ ...p[kind], kind, kindLabel: KIND_LABELS[kind] }));
}

export interface StateMessage {
	title: string;
	body: string;
	/** support: show the support card above the Model. gentle: a calm note. none: nothing extra. */
	emphasis: 'support' | 'gentle' | 'none';
}

export function stateMessage(state: StressState): StateMessage {
	switch (state) {
		case 'overwhelmed':
			return {
				title: 'First, a word about right now',
				body: 'You said it feels like too much right now. That matters more than any result on this page. You do not have to carry it alone, and you can start with a person.',
				emphasis: 'support'
			};
		case 'strained':
			return {
				title: 'A note on how heavy it has been',
				body: 'You said it has been heavy lately. Small steps count, and you do not have to take them alone.',
				emphasis: 'gentle'
			};
		default:
			return { title: '', body: '', emphasis: 'none' };
	}
}
