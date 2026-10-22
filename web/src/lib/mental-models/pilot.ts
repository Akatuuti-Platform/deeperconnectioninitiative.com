// The two pilot Models from models.json (marked DRAFT). Change their names here, and only here.
export const PILOT_MODEL_NAMES = { imFine: "I'm Fine", overlooked: 'The Overlooked' } as const;

/**
 * Pilot Models join the scorecard only when their content has been merged and each has
 * question options written for it. Until then they are listed for review but never scored.
 * models.json was not available when Draft 1.1 was built, so this stays false.
 */
export const PILOT_MODELS_ENABLED = false;
