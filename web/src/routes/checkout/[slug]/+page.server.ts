import { error, fail, redirect } from '@sveltejs/kit';
import { createPayment, getProduct } from '$lib/server/flutterwave';
import { CLINIC_VENUE, formatClinicDate, isClinicDate } from '$lib/clinics';
import type { Actions, PageServerLoad } from './$types';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MIN_DONATION = 5_000;

/** A clinic seat is for a specific date. The date is validated against the
 *  generated schedule, so nothing arbitrary can be booked or charged. */
function clinicDateFrom(slug: string, raw: string | null): string | null {
	if (slug !== 'clinic' || !raw) return null;
	return isClinicDate(raw) ? raw : null;
}

export const load: PageServerLoad = ({ params, url }) => {
	const product = getProduct(params.slug);
	if (!product) error(404, 'Product not found');

	const clinicDate = clinicDateFrom(params.slug, url.searchParams.get('date'));
	return {
		product,
		clinicDate,
		clinicDateLabel: clinicDate ? formatClinicDate(new Date(clinicDate)) : null,
		clinicVenue: clinicDate ? CLINIC_VENUE : null
	};
};

export const actions: Actions = {
	default: async ({ request, params, url, fetch }) => {
		const product = getProduct(params.slug);
		if (!product) error(404, 'Product not found');

		const data = await request.formData();

		// Honeypot: bots fill the hidden field; humans leave it empty. Bounce
		// them without creating a payment session.
		if (String(data.get('company') ?? '').trim() !== '') {
			redirect(303, '/');
		}

		const email = String(data.get('email') ?? '').trim();
		const rawAmount = String(data.get('amount') ?? '').trim();
		const values = { email, amount: rawAmount };

		// Re-validated server side, never trusted from the form.
		const clinicDate = clinicDateFrom(params.slug, String(data.get('date') ?? '') || null);

		let amount = product.amount;
		if (amount === null) {
			amount = Number(rawAmount.replace(/[^\d]/g, ''));
		}

		const errors: Record<string, string> = {};
		if (!EMAIL_RE.test(email)) errors.email = 'Please add a valid email address.';
		if (product.amount === null && (!Number.isFinite(amount) || (amount ?? 0) < MIN_DONATION)) {
			errors.amount = `Please enter an amount of at least ${MIN_DONATION.toLocaleString('en-US')} UGX.`;
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		const dateLabel = clinicDate ? formatClinicDate(new Date(clinicDate)) : null;

		const result = await createPayment(fetch, {
			product,
			amount: amount as number,
			customer: { email },
			redirectUrl: `${url.origin}/payment/callback`,
			meta: clinicDate ? { clinic_date: clinicDate } : undefined,
			description: dateLabel ? `${product.name}, ${dateLabel}` : undefined
		});

		if ('error' in result) {
			const providerError: Record<string, string> = { form: result.error };
			return fail(502, { errors: providerError, values });
		}

		redirect(303, result.link);
	}
};
