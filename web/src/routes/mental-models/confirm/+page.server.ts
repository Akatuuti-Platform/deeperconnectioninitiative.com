import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { callBackend, rateKeyFor } from '$lib/server/mental-models';

// Confirmation needs a button press, not just a page visit, so email link scanners that open
// every URL cannot sign anyone up.
export const actions: Actions = {
	default: async (event) => {
		const token = String((await event.request.formData()).get('token') ?? '');
		if (!token || token.length > 300) return fail(400, { status: 'invalid' });
		const reply = await callBackend('/mm/contact/confirm', { token, rateKey: await rateKeyFor(event) });
		if (!reply || reply.status !== 200) return fail(503, { status: 'unavailable' });
		return { status: String(reply.data?.status ?? 'invalid') };
	}
};
