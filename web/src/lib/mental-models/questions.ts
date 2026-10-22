// The scorecard's scenarios. Edit wording here, then bump CONTENT_VERSION.
//
// Design (Draft 1.1):
//  - 12 scenarios, 5 options each, two taps per scenario:
//      "First, you..."             -> feeds the Go-to Model (what you do first)
//      "If that doesn't help, you..." -> feeds the Under-pressure Model (where you land when that stops working)
//    The second tap uses the same five options and may repeat the first.
//  - Every Model appears in exactly 6 scenarios, so no Model has an easier path to a high score.
//    Every pair of Models meets at least once. Observer, Drifter and Navigator (the three most
//    easily mixed up) meet in 4 scenarios each, and three scenarios hold all three.
//  - Options are actions that complete "you ...". The Observer, Drifter and Navigator options
//    carry their inside reason ("to think it through", "because you don't know where to start",
//    "on your own"), because the outward behaviour (going quiet) is the same for all three.
//  - No option names a Model, and none is written to sound better or worse than another.
//  - The stress state is asked separately, never scored, and never changes a Model.

import type { ModelId, Question, StressState } from './types';

export const FIRST_PROMPT = 'First, you...';
export const THEN_PROMPT = "If that doesn't help, you...";

export const QUESTIONS: Question[] = [
	{
		id: 'q1',
		prompt: "Something goes wrong and you're already stretched.",
		options: [
			{ id: 'q1-drifter', model: 'drifter', text: 'put it off, scroll, and hope it settles' },
			{ id: 'q1-intellectual', model: 'intellectual', text: 'read up on it until you understand why it happened' },
			{ id: 'q1-navigator', model: 'navigator', text: 'work out a way through it on your own' },
			{ id: 'q1-receiver', model: 'receiver', text: "tell someone you need help, even if you're not sure with what" },
			{ id: 'q1-sponsor', model: 'sponsor', text: 'pay for, arrange or fix whatever practical part you can' }
		]
	},
	{
		id: 'q2',
		discriminator: true,
		prompt: "A friend's crisis lands on the same day as your own deadline.",
		options: [
			{ id: 'q2-angel', model: 'angel', text: 'drop your own work to be there for them' },
			{ id: 'q2-champion', model: 'champion', text: 'make a plan that covers both, and push through' },
			{ id: 'q2-drifter', model: 'drifter', text: "freeze, because you don't know where to start, and leave both" },
			{ id: 'q2-navigator', model: 'navigator', text: "quietly juggle both on your own and say you're fine" },
			{ id: 'q2-observer', model: 'observer', text: 'stop and think through what matters most before acting' }
		]
	},
	{
		id: 'q3',
		discriminator: true,
		prompt: "Someone notices you've gone quiet and asks what's wrong.",
		options: [
			{ id: 'q3-drifter', model: 'drifter', text: '"I\'m fine," because you don\'t know where to start' },
			{ id: 'q3-intellectual', model: 'intellectual', text: 'explain exactly what happened, without saying how you feel' },
			{ id: 'q3-navigator', model: 'navigator', text: 'say you\'ve got it, and keep handling it on your own' },
			{ id: 'q3-observer', model: 'observer', text: 'ask for time to think it through before you say anything' },
			{ id: 'q3-sponsor', model: 'sponsor', text: 'change the subject and sort out something practical for them' }
		]
	},
	{
		id: 'q4',
		prompt: "It's late and your mind won't switch off about a problem.",
		options: [
			{ id: 'q4-advocate', model: 'advocate', text: 'write out what needs to be said, and who needs to hear it' },
			{ id: 'q4-connector', model: 'connector', text: "message someone so you're not alone with it" },
			{ id: 'q4-intellectual', model: 'intellectual', text: 'replay it, searching for the reason it happened' },
			{ id: 'q4-navigator', model: 'navigator', text: 'plan the fix and keep it to yourself' },
			{ id: 'q4-observer', model: 'observer', text: 'keep watching the pattern, waiting until it makes sense' }
		]
	},
	{
		id: 'q5',
		prompt: 'You realise you need support.',
		options: [
			{ id: 'q5-advocate', model: 'advocate', text: "talk about the bigger issue rather than how it's hitting you" },
			{ id: 'q5-connector', model: 'connector', text: 'gather people around you and stay busy with them' },
			{ id: 'q5-drifter', model: 'drifter', text: 'wait, hope it passes, and tell no one' },
			{ id: 'q5-observer', model: 'observer', text: 'go quiet and think it over before telling anyone' },
			{ id: 'q5-receiver', model: 'receiver', text: 'say plainly that you need help, and let people in' }
		]
	},
	{
		id: 'q6',
		prompt: 'Someone you love is having a hard time.',
		options: [
			{ id: 'q6-advocate', model: 'advocate', text: "speak up about what isn't fair, and get others to listen" },
			{ id: 'q6-angel', model: 'angel', text: 'show up, listen, and make sure they feel safe' },
			{ id: 'q6-champion', model: 'champion', text: 'step in, make a plan and get things moving' },
			{ id: 'q6-receiver', model: 'receiver', text: "tell them they don't have to do it alone, and find who else can help" },
			{ id: 'q6-sponsor', model: 'sponsor', text: 'cover what they need: pay, arrange or fix the practical side' }
		]
	},
	{
		id: 'q7',
		prompt: 'A group you belong to is falling apart under pressure.',
		options: [
			{ id: 'q7-advocate', model: 'advocate', text: "call out what's going wrong so it gets addressed" },
			{ id: 'q7-angel', model: 'angel', text: "check on each person and make sure they're okay" },
			{ id: 'q7-champion', model: 'champion', text: 'take charge and decide who does what' },
			{ id: 'q7-connector', model: 'connector', text: 'bring everyone together to talk it through' },
			{ id: 'q7-receiver', model: 'receiver', text: "tell the group you're struggling, and ask for support" }
		]
	},
	{
		id: 'q8',
		prompt: 'Pressure has been building for weeks.',
		options: [
			{ id: 'q8-advocate', model: 'advocate', text: 'throw yourself into a cause instead of how you feel' },
			{ id: 'q8-angel', model: 'angel', text: 'keep giving to others while your own needs wait' },
			{ id: 'q8-connector', model: 'connector', text: "fill every hour with people so you don't sit with it" },
			{ id: 'q8-drifter', model: 'drifter', text: 'cancel plans and go quiet without telling anyone' },
			{ id: 'q8-intellectual', model: 'intellectual', text: 'analyse it from every angle, and still feel the same' }
		]
	},
	{
		id: 'q9',
		discriminator: true,
		prompt: 'A problem feels too big to handle.',
		options: [
			{ id: 'q9-champion', model: 'champion', text: 'break it into tasks and start doing, carrying most of it yourself' },
			{ id: 'q9-drifter', model: 'drifter', text: 'keep putting it off, and the longer you wait, the harder it gets' },
			{ id: 'q9-navigator', model: 'navigator', text: 'adapt and keep going on your own' },
			{ id: 'q9-observer', model: 'observer', text: 'wait until you understand it well enough to act' },
			{ id: 'q9-receiver', model: 'receiver', text: "tell someone, even if you can't say clearly what you need" }
		]
	},
	{
		id: 'q10',
		prompt: 'Money is tight, and someone close asks you for help.',
		options: [
			{ id: 'q10-angel', model: 'angel', text: 'help them anyway, even if it leaves you short' },
			{ id: 'q10-connector', model: 'connector', text: 'connect them with someone else who can help' },
			{ id: 'q10-observer', model: 'observer', text: 'take time to think it through before you answer' },
			{ id: 'q10-receiver', model: 'receiver', text: "say honestly that you're stretched too, and ask who can share it" },
			{ id: 'q10-sponsor', model: 'sponsor', text: 'find a way to cover it, even if you have to work more' }
		]
	},
	{
		id: 'q11',
		prompt: 'Bad news arrives about something you care about.',
		options: [
			{ id: 'q11-advocate', model: 'advocate', text: 'share it and rally people to respond' },
			{ id: 'q11-angel', model: 'angel', text: 'think first of who will be hurt, and go to them' },
			{ id: 'q11-champion', model: 'champion', text: 'make a plan and start acting on it' },
			{ id: 'q11-intellectual', model: 'intellectual', text: 'look up everything you can about it' },
			{ id: 'q11-sponsor', model: 'sponsor', text: 'work out what you can pay for or provide to help' }
		]
	},
	{
		id: 'q12',
		prompt: 'A plan you were counting on falls apart at the last minute.',
		options: [
			{ id: 'q12-champion', model: 'champion', text: 'take control and rebuild the plan yourself' },
			{ id: 'q12-connector', model: 'connector', text: 'call people to see who can help' },
			{ id: 'q12-intellectual', model: 'intellectual', text: 'work out exactly why it failed before you move' },
			{ id: 'q12-navigator', model: 'navigator', text: 'adapt on the spot and find another way, on your own' },
			{ id: 'q12-sponsor', model: 'sponsor', text: 'spend money or effort to patch it up' }
		]
	}
];

/** Looks up an option anywhere in the bank. */
export const OPTION_INDEX: Record<string, { questionId: string; model: ModelId }> = Object.fromEntries(
	QUESTIONS.flatMap((q) => q.options.map((o) => [o.id, { questionId: q.id, model: o.model }]))
);

// ---- Current pressure: asked, shown, and never scored -----------------------

export interface StateOption {
	value: StressState;
	label: string;
	text: string;
}

export const STATE_QUESTION = {
	prompt: 'Before we start: how is the pressure for you right now?',
	hint: 'This is only about today. It is never scored, and it does not change your result.',
	options: [
		{ value: 'steady', label: 'Steady', text: 'Things feel manageable right now.' },
		{ value: 'strained', label: 'Strained', text: "It's heavy lately and I'm stretching to keep up." },
		{ value: 'overwhelmed', label: 'Overwhelmed', text: 'It feels like too much right now.' },
		{ value: 'unsaid', label: 'Rather not say', text: "I'd rather keep that to myself." }
	] as StateOption[]
};

// ---- The consultant's optional question: asked, never scored ----------------

export const HARDEST_QUESTION = {
	prompt: 'One more, only if you want to: when something is difficult, what feels hardest about letting someone see what is happening?',
	hint: 'Choose any that fit. This is never scored.',
	options: [
		{ value: 'judgment', text: 'Fear of being judged' },
		{ value: 'burden', text: 'Not wanting to be a burden' },
		{ value: 'explain', text: 'Not knowing how to explain it' },
		{ value: 'alone', text: 'Wanting to handle it alone' },
		{ value: 'unsafe', text: 'Not feeling safe' }
	]
};

export type HardestValue = (typeof HARDEST_QUESTION.options)[number]['value'];

// ---- Scoring constants ------------------------------------------------------

/** Each tap counts one. First taps build the Go-to score, second taps the Under-pressure score. */
export const TAP_POINTS = 1;
/** A person can skip a few scenarios, but not so many that the result means little. */
export const MAX_SKIPS = 4;
/** Go-to first and second this close (or closer, in taps) need one more question before a Model is named. */
export const CLOSE_MARGIN = 1;
/** An Under-pressure Model needs at least this many second taps... */
export const UNDER_MIN_TAPS = 3;
/** ...and must lead the next Model by at least this many, or only the Go-to Model is shown. */
export const UNDER_MIN_LEAD = 1;
