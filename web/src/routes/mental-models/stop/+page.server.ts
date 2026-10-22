import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { callBackend, rateKeyFor } from '$lib/server/mental-models';

// Stopping deletes the person's details. It needs a button press so link scanners cannot do it.
export const actions: Actions = {
	default: async (event) => {
		const token = String((await event.request.formData()).get('token') ?? '');
		if (!token || token.length > 300) return fail(400, { status: 'invalid' });
		const reply = await callBackend('/mm/contact/withdraw', { token, rateKey: await rateKeyFor(event) });
		if (!reply || reply.status !== 200) return fail(503, { status: 'unavailable' });
		return { status: String(reply.data?.status ?? 'invalid') };
	}
};
