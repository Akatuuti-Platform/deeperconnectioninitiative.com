// Bump CONTENT_VERSION whenever questions, scoring, Model wording or pathways change.
// It travels with anonymous pilot feedback so responses can be matched to the exact
// wording and scoring the person saw.
// draft-1.1: two-tap scenarios (Go-to and Under-pressure Models), Reaction/Response wording.
export const CONTENT_VERSION = 'draft-1.1';

export const DRAFT_LABEL = 'Draft 1';
export const DRAFT_NOTE =
	'Draft 1 is a pilot prototype. It is a reflection tool still being tested with young people, not a diagnosis or a clinical assessment.';

// Bump whenever the wording of the "Keep noticing" consent box or the scorecard privacy
// notice changes. Every consent record stores the version the person agreed to.
// b: the email opt-in also unlocks the full report (wording in consent-copy.ts).
export const CONSENT_VERSION = 'mm-consent-2026-10-b';
