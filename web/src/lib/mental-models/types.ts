// DCI Mental Models Scorecard, Draft 1. Shared types.
//
// Everything the scorecard shows or scores lives under src/lib/mental-models so a
// pilot reviewer can change wording, questions or scoring without touching the
// page components. Bump CONTENT_VERSION in version.ts whenever any of it changes.

export const MODEL_IDS = [
	'champion',
	'angel',
	'connector',
	'sponsor',
	'navigator',
	'intellectual',
	'observer',
	'receiver',
	'drifter',
	'advocate'
] as const;

export type ModelId = (typeof MODEL_IDS)[number];

/** Current pressure, as the person describes it today. Never scored and never feeds the Model. */
export type StressState = 'steady' | 'strained' | 'overwhelmed' | 'unsaid';

export interface ModelOrigin {
	/** The DCI Journal stage this reflection draws on. One possible influence, never a cause. */
	stage: string;
	/** e.g. "growing up among siblings". */
	ageNote: string;
	/** The monthly letter in the DCI Reflection Journal. */
	journalLetter: string;
	body: string;
	reflect: string;
	/** Technical words people may have heard. Shown only inside the optional story section, never as a label. */
	youMayHaveHeard?: string;
}

export interface Pathway {
	/** Short action label. */
	label: string;
	/** Internal route on this site. */
	href: string;
	/** Why this suits this Model, in one plain sentence. */
	why: string;
}

export interface ModelPathways {
	learn: Pathway;
	community: Pathway;
	support: Pathway;
}

export interface Model {
	id: ModelId;
	name: string;
	/** "I DO", "I FIND A WAY", ... Shown on the Model page. See variants.ts for the Drifter pilot options. */
	verb: string;
	/** The line this Model says under pressure. */
	signature: string;
	/** The question this Model asks itself. */
	question: string;

	// 01 Recognise
	firstMove: string;

	// 02 Understand your pattern
	strength: string;
	/** Reaction: what may happen by default, without thinking, when the pressure builds. */
	reaction: string;
	tooMuch: string;
	/** Asked as a question the reader can accept or reject. Never a statement of their motive. */
	protecting: string;
	blindSpot: string;

	// 03 Choose
	/** Response: a chosen next step, with awareness. */
	response: string;
	tinyStep: string;

	// 04 Explore your story (optional)
	origin: ModelOrigin;

	// 05 Grow with others. A skill to learn from another Model, never a match or a ranking.
	learnFrom: {
		model: ModelId;
		why: string;
		/** The other Model's move, e.g. "ASK FOR HELP", and one sentence on trying it. */
		tryVerb: string;
		tryText: string;
	};
	canTeach: string;

	/** The only text that leaves the page when someone shares (with the name and signature). */
	shareLine: string;

	/** One plain sentence about what is underneath this pattern, used only in "close call" clarifiers. */
	insideReason: string;

	pathways: ModelPathways;
}

// ---- Quiz -----------------------------------------------------------------

export interface QuestionOption {
	id: string;
	model: ModelId;
	text: string;
}

export interface Question {
	id: string;
	prompt: string;
	/** Shown under the prompt. */
	hint?: string;
	options: QuestionOption[];
	/**
	 * Discriminator questions are built to separate the Models people most often mix up
	 * (Observer, Drifter, Navigator). They break ties before a clarifier is asked.
	 */
	discriminator?: boolean;
}

export interface Answer {
	/** "First, you..." : the option chosen first. Feeds the Go-to Model. */
	first?: string;
	/** "If that doesn't help, you..." : the next option. Feeds the Under-pressure Model. May be the same option. */
	then?: string;
	/** True when the person chose to skip this scenario. */
	skipped?: boolean;
}

export type Answers = Record<string, Answer>;

export type ClarifierChoice = ModelId | 'both' | 'neither';

export interface Clarifier {
	a: ModelId;
	b: ModelId;
	choice: ClarifierChoice;
}

/** pending: first and second are too close; ask the clarifier before naming a Model. */
/** pending: first and second Go-to are too close; ask the clarifier before naming a Model. */
export type Clarity = 'clear' | 'clarified' | 'blend' | 'pending';

/**
 * Why an Under-pressure Model is or is not shown.
 *  shown:   a clear, different second Model.
 *  same:    the second taps point to the Go-to Model itself.
 *  unclear: the second taps do not support a clear second Model.
 */
export type UnderPressureStatus = 'shown' | 'same' | 'unclear';

export interface QuizResult {
	/** First taps per Model. */
	goToScores: Record<ModelId, number>;
	/** Second taps per Model. */
	underScores: Record<ModelId, number>;
	/** Go-to Models from strongest to weakest. */
	ranking: ModelId[];
	/** The Go-to Model: what the person tends to do first. */
	primary: ModelId;
	/** The Under-pressure Model, or null when only one Model is shown. */
	underPressure: ModelId | null;
	underPressureStatus: UnderPressureStatus;
	/** When the Go-to clarifier ended in "both" or "neither", the other close Model. */
	alsoClose: ModelId | null;
	/** Gap between first and second Go-to before any clarifier. */
	margin: number;
	clarity: Clarity;
	answered: number;
	skipped: number;
	/** Set when first and second Go-to are too close to call without one more question. */
	needsClarifier: { a: ModelId; b: ModelId } | null;
}
