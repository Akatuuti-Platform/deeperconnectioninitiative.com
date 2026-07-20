// The Blueprint Assessment — content + scoring model.
// A reflection tool: 20 statements across 5 facets of how someone operates
// under pressure. Each facet scores 1-5, which maps to one of three bands.

export type FacetKey = 'think' | 'recover' | 'decide' | 'communicate' | 'lead';
export type Band = 'strength' | 'steady' | 'redesign';

export type Facet = { key: FacetKey; label: string };

// "friction" statements are reverse-scored (agreement = more friction);
// "positive" statements are scored directly (agreement = more capacity).
export type Statement = {
	id: string;
	facet: FacetKey;
	prompt: string;
	direction: 'friction' | 'positive';
};

export const facets: Facet[] = [
	{ key: 'think', label: 'How you think' },
	{ key: 'recover', label: 'How you recover' },
	{ key: 'decide', label: 'How you decide' },
	{ key: 'communicate', label: 'How you communicate' },
	{ key: 'lead', label: 'How you lead under pressure' }
];

export const statements: Statement[] = [
	{ id: 'think_1', facet: 'think', prompt: "I replay conversations and decisions long after they're over, looking for what I could have done differently.", direction: 'friction' },
	{ id: 'think_2', facet: 'think', prompt: 'My inner voice is harder on me than I would ever be on someone else.', direction: 'friction' },
	{ id: 'think_3', facet: 'think', prompt: "I can name what I'm feeling in the moment, not just afterward.", direction: 'positive' },
	{ id: 'think_4', facet: 'think', prompt: 'When something goes wrong, my first instinct is to look for what I did wrong before I look at the full picture.', direction: 'friction' },

	{ id: 'recover_1', facet: 'recover', prompt: 'Time off rarely feels like rest. I come back just as tired as I left.', direction: 'friction' },
	{ id: 'recover_2', facet: 'recover', prompt: 'I know the difference between being busy and being productive, but I still choose busy.', direction: 'friction' },
	{ id: 'recover_3', facet: 'recover', prompt: 'I have at least one habit that reliably brings my energy back up.', direction: 'positive' },
	{ id: 'recover_4', facet: 'recover', prompt: "I keep working past the point where I'm actually being useful.", direction: 'friction' },

	{ id: 'decide_1', facet: 'decide', prompt: 'I can make a hard call and move on without replaying it for days.', direction: 'positive' },
	{ id: 'decide_2', facet: 'decide', prompt: 'When a decision has no clear right answer, I tend to delay it rather than choose.', direction: 'friction' },
	{ id: 'decide_3', facet: 'decide', prompt: "I trust my own judgment, even when I can't fully explain why.", direction: 'positive' },
	{ id: 'decide_4', facet: 'decide', prompt: "I ask for more information than I actually need before I'll commit to a choice.", direction: 'friction' },

	{ id: 'communicate_1', facet: 'communicate', prompt: 'I say what I actually think in the room, not just what will keep things comfortable.', direction: 'positive' },
	{ id: 'communicate_2', facet: 'communicate', prompt: 'I find it easier to give hard feedback than to receive it.', direction: 'friction' },
	{ id: 'communicate_3', facet: 'communicate', prompt: 'People around me usually know where they stand with me.', direction: 'positive' },
	{ id: 'communicate_4', facet: 'communicate', prompt: "I hold back what I'm really thinking until I'm sure it will land well.", direction: 'friction' },

	{ id: 'lead_1', facet: 'lead', prompt: 'When things get tense, I get calmer, not more reactive.', direction: 'positive' },
	{ id: 'lead_2', facet: 'lead', prompt: "I try to control outcomes I can't actually control.", direction: 'friction' },
	{ id: 'lead_3', facet: 'lead', prompt: 'I can hand off something important and trust it will get done without checking in constantly.', direction: 'positive' },
	{ id: 'lead_4', facet: 'lead', prompt: 'My team can tell when I\'m under pressure, even when I think I\'m hiding it well.', direction: 'friction' }
];

export const scale: { value: number; label: string }[] = [
	{ value: 1, label: 'Rarely true' },
	{ value: 2, label: 'Sometimes true' },
	{ value: 3, label: 'Often true' },
	{ value: 4, label: 'Usually true' },
	{ value: 5, label: 'Almost always true' }
];

export const bandLabels: Record<Band, string> = {
	strength: 'Strength',
	steady: 'Steady',
	redesign: 'Where your next redesign lives'
};

export const interpretations: Record<FacetKey, Record<Band, string>> = {
	think: {
		strength: 'Your inner narrator is mostly on your side. You can look at a mistake without spiraling into it.',
		steady: 'Your thinking is sound under normal conditions, but self criticism gets louder exactly when you need it quietest.',
		redesign: 'The voice in your head is doing more damage than the situation itself. This is one of the highest leverage places to start.'
	},
	recover: {
		strength: "You've built real recovery into your rhythm, not just rest you feel guilty about.",
		steady: "You know what restores you. You just don't protect the time for it yet.",
		redesign: "Rest isn't actually resting you right now. This is often the quiet cause behind everything else feeling harder than it should."
	},
	decide: {
		strength: 'You trust your own judgment, and it shows in how quickly you move.',
		steady: 'You decide well when the stakes are clear. Ambiguity is where you slow down.',
		redesign: 'Decisions are costing you more time and energy than the decisions themselves deserve.'
	},
	communicate: {
		strength: 'People know where they stand with you, and that clarity is rarer than it looks.',
		steady: 'You say the important things, eventually. The delay is where the cost lives.',
		redesign: "What you're not saying is doing more work in the room than what you are."
	},
	lead: {
		strength: "Pressure sharpens you instead of shrinking you. That's not common.",
		steady: 'You hold it together outward, while it costs you more than anyone can see.',
		redesign: "The gap between how in control you look and how in control you feel is wide, and it isn't sustainable."
	}
};

// Map a facet's 1-5 score to a band.
export function bandFor(score: number): Band {
	if (score >= 4) return 'strength';
	if (score >= 2.5) return 'steady';
	return 'redesign';
}

// Score each facet as the mean of its 4 statements, reverse-scoring the
// friction-worded ones so that a higher facet score always means more capacity.
export function scoreAnswers(answers: Record<string, number>): Record<FacetKey, number> {
	const scores = {} as Record<FacetKey, number>;
	for (const facet of facets) {
		const items = statements.filter((s) => s.facet === facet.key);
		const total = items.reduce((sum, item) => {
			const value = answers[item.id] ?? 3;
			return sum + (item.direction === 'friction' ? 6 - value : value);
		}, 0);
		scores[facet.key] = total / items.length;
	}
	return scores;
}
