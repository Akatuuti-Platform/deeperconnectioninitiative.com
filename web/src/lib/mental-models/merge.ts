// Merges Model content from models.json into the existing Model content.
// Rule (Draft 1.1 brief): for each field, keep whichever is more complete, and report every
// conflict so a person can check it. Used once models.json is available; see pilot.ts.

export interface MergeConflict {
	model: string;
	field: string;
	kept: unknown;
	other: unknown;
}

/** How much content a value carries: words in text, summed through arrays and objects. */
export function completeness(value: unknown): number {
	if (typeof value === 'string') return value.trim() ? value.trim().split(/\s+/).length : 0;
	if (Array.isArray(value)) return value.reduce((n: number, v) => n + completeness(v), 0);
	if (value && typeof value === 'object') return Object.values(value).reduce((n: number, v) => n + completeness(v), 0);
	return value === null || value === undefined ? 0 : 1;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
	return !!v && typeof v === 'object' && !Array.isArray(v);
}

function mergeValue(existing: unknown, incoming: unknown, model: string, field: string, conflicts: MergeConflict[]): unknown {
	if (completeness(incoming) === 0) return existing;
	if (completeness(existing) === 0) return incoming;
	if (isPlainObject(existing) && isPlainObject(incoming)) {
		const out: Record<string, unknown> = {};
		for (const key of new Set([...Object.keys(existing), ...Object.keys(incoming)])) {
			out[key] = mergeValue(existing[key], incoming[key], model, `${field}.${key}`, conflicts);
		}
		return out;
	}
	if (JSON.stringify(existing) === JSON.stringify(incoming)) return existing;
	// Both present and different: keep the more complete one (existing wins a tie) and report it.
	const keepIncoming = completeness(incoming) > completeness(existing);
	conflicts.push({ model, field, kept: keepIncoming ? incoming : existing, other: keepIncoming ? existing : incoming });
	return keepIncoming ? incoming : existing;
}

export function mergeModels(
	existing: Record<string, Record<string, unknown>>,
	incoming: Record<string, Record<string, unknown>>
): { merged: Record<string, Record<string, unknown>>; conflicts: MergeConflict[]; added: string[] } {
	const conflicts: MergeConflict[] = [];
	const merged: Record<string, Record<string, unknown>> = {};
	const added: string[] = [];
	for (const id of new Set([...Object.keys(existing), ...Object.keys(incoming)])) {
		if (!existing[id]) added.push(id);
		merged[id] = mergeValue(existing[id] ?? {}, incoming[id] ?? {}, id, '', conflicts) as Record<string, unknown>;
	}
	for (const c of conflicts) c.field = c.field.replace(/^\./, '');
	return { merged, conflicts, added };
}
