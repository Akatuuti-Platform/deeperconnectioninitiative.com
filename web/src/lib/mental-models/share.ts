// Sharing is voluntary and carries very little. By default it names the Go-to Model only; the
// person can choose to add their Under-pressure Model. It never carries the stress state, the
// origin story or any score, and the link points at the scorecard's front page, not a result.
// Everything here is about the reader's own pattern: nothing asks them to label anyone else.

import { MODELS } from './models';
import type { ModelId } from './types';

export function shareMessage(primary: ModelId, underPressure: ModelId | null, includeUnder: boolean): string {
	const p = MODELS[primary].name;
	if (includeUnder && underPressure) {
		return `My Model is ${p}, and under pressure I land on ${MODELS[underPressure].name}. Which one are you?`;
	}
	return `My Model is ${p}. Which one are you?`;
}

export function buildShareText(primary: ModelId, underPressure: ModelId | null, includeUnder: boolean, scorecardUrl: string): string {
	return `${shareMessage(primary, underPressure, includeUnder)} ${scorecardUrl}`;
}

export function whatsappUrl(text: string): string {
	return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** "A line you can send": a ready-made message about the reader's own pattern, built from the share line. */
export function lineYouCanSend(model: ModelId): string {
	const line = MODELS[model].shareLine;
	return `Something I'm learning about myself: ${line.charAt(0).toLowerCase()}${line.slice(1)}`;
}
