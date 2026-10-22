import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { env as publicEnv } from '$env/dynamic/public';
import { isModelId } from '$lib/mental-models/models';
import { HARDEST_QUESTION } from '$lib/mental-models/questions';
import { CONSENT_VERSION, CONTENT_VERSION } from '$lib/mental-models/version';
import { callBackend, passesTurnstile, rateKeyFor } from '$lib/server/mental-models';

// Anonymous pilot feedback for the Mental Models Scorecard (Draft 1).
//
// Privacy by construction:
//  - No name, email, IP or user agent is read or stored.
//  - The person's state and their "hardest" answer are included only if they ticked the box.
//  - The Model result itself is a fixed pair of ids, sent so feedback can be matched to wording.
// Delivery is by email through Resend, like the Blueprint Assessment. If RESEND_API_KEY is
// not set the action still succeeds so the flow works, and says nothing was delivered.

const RECOGNISED = new Set(['yes', 'partly', 'no']);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const CLARITY_VALUES = new Set(['clear', 'clarified', 'blend']);
const AGE_BANDS = new Set(['under18', '18to24', '25to34', '35plus']);
const REGION_VALUES = new Set(['uganda', 'eastAfrica', 'elsewhere']);
const STATE_BUCKETS = new Set(['steady', 'strained', 'overwhelmed']);
const FEEL = new Set(['invitation', 'label', 'unsure']);
const STATES = new Set(['steady', 'strained', 'overwhelmed', 'unsaid']);
const CLARITY = new Set(['clear', 'clarified', 'blend']);
const HARDEST = new Set(HARDEST_QUESTION.options.map((o) => o.value as string));

function escapeHtml(s: string) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function oneOf(value: FormDataEntryValue | null, allowed: Set<string>): string {
	const v = String(value ?? '');
	return allowed.has(v) ? v : '';
}

// Reminders, unlocking and counting need the backend. Without it (for example on a Vercel
// preview, which has no Convex settings) the page shows "not available right now" and the
// actions store nothing.
export const load: PageServerLoad = () => ({
	remindersAvailable: Boolean(publicEnv.PUBLIC_CONVEX_SITE_URL && env.MM_SERVER_SECRET)
});

export const actions: Actions = {
	// "Keep noticing": opt-in reminders. Contact details go to the backend only with the
	// 18 or older confirmation and at least one chosen reminder. Nothing is sent until the
	// person confirms from their inbox.
	keepNoticing: async (event) => {
		const data = await event.request.formData();
		if (String(data.get('website') ?? '').trim() !== '') return { kept: true };

		const email = String(data.get('email') ?? '').trim();
		const firstName = String(data.get('firstName') ?? '').trim().slice(0, 40);
		const consents = {
			followUp: data.get('followUp') === 'on',
			dailyCheck: data.get('dailyCheck') === 'on',
			productInfo: data.get('productInfo') === 'on',
			rememberResult: data.get('rememberResult') === 'on'
		};
		const rawModel = String(data.get('rememberedModel') ?? '');
		const rememberedModel = consents.rememberResult && consents.followUp && isModelId(rawModel) ? rawModel : null;

		const errors: Record<string, string> = {};
		if (!EMAIL_RE.test(email) || email.length > 254) errors.email = 'Please add a valid email address.';
		if (!consents.followUp && !consents.dailyCheck && !consents.productInfo) errors.choices = 'Choose at least one reminder.';
		if (data.get('adult') !== 'on') errors.adult = 'Reminders are for people aged 18 or older for now.';
		if (Object.keys(errors).length) return fail(400, { keepErrors: errors });

		if (!(await passesTurnstile(String(data.get('cf-turnstile-response') ?? '') || null, event))) {
			return fail(400, { keepErrors: { form: 'Please complete the quick check and try again.' } });
		}

		const rateKey = await rateKeyFor(event);
		const reply = await callBackend('/mm/contact/request', {
			email,
			firstName: firstName || null,
			consents,
			rememberedModel,
			adultConfirmed: true,
			consentVersion: CONSENT_VERSION,
			rateKey
		});
		if (!reply) return fail(503, { keepErrors: { form: 'Reminders are not available right now. Your result is still here.' } });
		if (reply.status === 429) return fail(429, { keepErrors: { form: 'Too many tries. Please wait a little and try again.' } });
		if (reply.status !== 200) return fail(400, { keepErrors: { form: 'Something was not right with that. Please check and try again.' } });
		await callBackend('/mm/event', { event: 'keep_noticing_submitted', rateKey });
		return { kept: true };
	},

	// "Count my result, anonymously": a separate request from the reminders form, so the
	// count and any contact can never be tied together.
	contribute: async (event) => {
		const data = await event.request.formData();
		if (String(data.get('website') ?? '').trim() !== '') return { contributed: true };
		const primary = String(data.get('primary') ?? '');
		const secondaryRaw = String(data.get('secondary') ?? '');
		const clarity = String(data.get('clarity') ?? '');
		if (!isModelId(primary) || !CLARITY_VALUES.has(clarity) || (secondaryRaw && !isModelId(secondaryRaw))) {
			return fail(400, { contributeError: 'That result could not be counted.' });
		}
		const pick = (name: string, allowed: Set<string>) => {
			const value = String(data.get(name) ?? '');
			return allowed.has(value) ? value : null;
		};
		const rateKey = await rateKeyFor(event);
		const reply = await callBackend('/mm/result', {
			contentVersion: CONTENT_VERSION,
			primary,
			secondary: secondaryRaw || null,
			clarity,
			ageBand: pick('ageBand', AGE_BANDS),
			region: pick('region', REGION_VALUES),
			stateBucket: data.get('includeState') === 'on' ? pick('state', STATE_BUCKETS) : null,
			rateKey
		});
		if (!reply || reply.status !== 200) return fail(503, { contributeError: 'Counting is not available right now. Thank you for offering.' });
		await callBackend('/mm/event', { event: 'result_contributed', rateKey });
		return { contributed: true };
	},

	feedback: async ({ request, fetch }) => {
		const data = await request.formData();

		// Honeypot: humans never see or fill this.
		if (String(data.get('website') ?? '').trim() !== '') return { success: true, delivered: true };

		let meta: Record<string, unknown> = {};
		try {
			meta = JSON.parse(String(data.get('meta') ?? '{}'));
		} catch {
			meta = {};
		}

		const variants = (meta.variants ?? {}) as Record<string, unknown>;
		const primary = typeof meta.primary === 'string' && isModelId(meta.primary) ? meta.primary : '';
		const secondary = typeof meta.secondary === 'string' && isModelId(meta.secondary) ? meta.secondary : '';
		const clarity = oneOf(String(meta.clarity ?? ''), CLARITY);
		const fit = oneOf(String(meta.fit ?? ''), RECOGNISED);
		const version = String(meta.version ?? '').slice(0, 24);
		const drifterVerb = String(variants.drifterVerb ?? '').slice(0, 12);
		const sectionFive = String(variants.sectionFive ?? '').slice(0, 16);

		const recognised = oneOf(data.get('recognised'), RECOGNISED);
		const feel = oneOf(data.get('feel'), FEEL);
		const comment = String(data.get('comment') ?? '').trim().slice(0, 800);
		const state = oneOf(data.get('state'), STATES);
		const hardest = String(data.get('hardest') ?? '')
			.split(',')
			.filter((h) => HARDEST.has(h));

		if (!recognised && !feel && !comment) {
			return fail(400, { error: 'Add at least one answer before sending.' });
		}

		const lines = [
			`Content version: ${version || '-'}`,
			`Variants: drifterVerb=${drifterVerb || '-'}, sectionFive=${sectionFive || '-'}`,
			`Result shown: ${primary || '-'}${secondary ? ` (also ${secondary})` : ''}, ${clarity || '-'}`,
			`Tapped on the Model's "Does that fit?" chips: ${fit || 'not answered'}`,
			`Did this sound like you: ${recognised || '-'}`,
			`"Does that fit your experience?" lines felt like: ${feel || '-'}`,
			state ? `Pressure that day (shared by choice): ${state}` : null,
			hardest.length ? `Hardest about letting someone see (shared by choice): ${hardest.join(', ')}` : null,
			'',
			`Comment: ${comment || '-'}`
		].filter((l): l is string => l !== null);

		const apiKey = env.RESEND_API_KEY;
		const to = env.CONTACT_TO_EMAIL || 'info@utaliicreative.com';
		const from = env.CONTACT_FROM_EMAIL || 'DCI Website <onboarding@resend.dev>';

		if (!apiKey) {
			console.warn('[mental-models] RESEND_API_KEY not set. Feedback NOT delivered:', JSON.stringify(lines));
			return { success: true, delivered: false };
		}

		try {
			const res = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({
					from,
					to,
					subject: 'Mental Models Draft 1: anonymous feedback',
					text: lines.join('\n'),
					html: `<h2>Mental Models Draft 1: anonymous feedback</h2><pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(lines.join('\n'))}</pre>`
				})
			});
			if (!res.ok) {
				console.error('[mental-models] Resend send failed', res.status, await res.text());
				return { success: true, delivered: false };
			}
		} catch (err) {
			console.error('[mental-models] Resend request threw', err);
			return { success: true, delivered: false };
		}
		return { success: true, delivered: true };
	}
};
