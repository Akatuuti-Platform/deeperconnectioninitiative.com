import { error, fail, redirect } from '@sveltejs/kit';
import { createPayment, getProduct } from '$lib/server/flutterwave';
import type { Actions, PageServerLoad } from './$types';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MIN_DONATION = 5_000;

export const load: PageServerLoad = ({ params }) => {
	const product = getProduct(params.slug);
	if (!product) error(404, 'Product not found');
	return { product };
};

export const actions: Actions = {
	default: async ({ request, params, url, fetch }) => {
		const product = getProduct(params.slug);
		if (!product) error(404, 'Product not found');

		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const rawAmount = String(data.get('amount') ?? '').trim();
		const values = { name, email, phone, amount: rawAmount };

		let amount = product.amount;
		if (amount === null) {
			amount = Number(rawAmount.replace(/[^\d]/g, ''));
		}

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Please add your name.';
		if (!EMAIL_RE.test(email)) errors.email = 'Please add a valid email address.';
		if (product.amount === null && (!Number.isFinite(amount) || (amount ?? 0) < MIN_DONATION)) {
			errors.amount = `Please enter an amount of at least ${MIN_DONATION.toLocaleString('en-US')} UGX.`;
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		const result = await createPayment(fetch, {
			product,
			amount: amount as number,
			customer: { name, email, phone: phone || undefined },
			redirectUrl: `${url.origin}/payment/callback`
		});

		if ('error' in result) {
			const providerError: Record<string, string> = { form: result.error };
			return fail(502, { errors: providerError, values });
		}

		redirect(303, result.link);
	}
};
