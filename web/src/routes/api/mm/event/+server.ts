import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FUNNEL_EVENTS } from '../../../../../convex/lib/validators';
import { callBackend, rateKeyFor } from '$lib/server/mental-models';

// Anonymous funnel counts for the Mental Models Scorecard. Only an event name is accepted:
// no identifier, no cookie, no page address. The backend stores a daily count per event.
const ALLOWED = new Set<string>(FUNNEL_EVENTS.filter((e) => e !== 'keep_noticing_submitted' && e !== 'result_contributed'));

export const POST: RequestHandler = async (event) => {
	let name = '';
	try {
		const body = (await event.request.json()) as { event?: unknown };
		name = typeof body.event === 'string' ? body.event : '';
	} catch {
		/* ignore */
	}
	if (ALLOWED.has(name)) await callBackend('/mm/event', { event: name, rateKey: await rateKeyFor(event) });
	return json({ ok: true }, { status: 202 });
};
