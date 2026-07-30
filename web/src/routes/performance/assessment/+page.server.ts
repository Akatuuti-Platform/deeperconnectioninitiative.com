import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { facets, bandFor, bandLabels, type FacetKey } from './assessment';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const actions: Actions = {
	// Lead capture for the Blueprint Assessment. Results are computed and shown
	// client-side; this action records the lead and emails DCI a copy of the
	// snapshot. It always resolves so the person still sees their results.
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		// Honeypot: bots fill the hidden field; humans leave it empty.
		if (String(data.get('company_url') ?? '').trim() !== '') {
			return { success: true };
		}

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const role = String(data.get('role') ?? '').trim();
		const company = String(data.get('company') ?? '').trim();
		const values = { name, email, role, company };

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Please add your name.';
		if (!EMAIL_RE.test(email)) errors.email = 'Please add a valid email address.';
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		// Parse the per-facet scores the client computed, for the internal copy.
		let scores: Partial<Record<FacetKey, number>> = {};
		try {
			scores = JSON.parse(String(data.get('scores') ?? '{}'));
		} catch {
			scores = {};
		}

		const snapshotLines = facets.map((f) => {
			const value = scores[f.key];
			const band = typeof value === 'number' ? bandLabels[bandFor(value)] : '-';
			const shown = typeof value === 'number' ? value.toFixed(1) : '-';
			return `${f.label}: ${band} (${shown}/5)`;
		});

		const apiKey = env.RESEND_API_KEY;
		const to = env.CONTACT_TO_EMAIL || 'info@utaliicreative.com';
		const from = env.CONTACT_FROM_EMAIL || 'DCI Website <onboarding@resend.dev>';

		if (!apiKey) {
			// No key configured yet: acknowledge so the flow works in dev, but make
			// it loud that nothing was delivered.
			console.warn(
				'[assessment] RESEND_API_KEY not set - lead NOT delivered:',
				JSON.stringify({ name, email, role, company })
			);
			return { success: true };
		}

		const subject = `New Blueprint Assessment - ${name}`;
		const text = [
			`Name: ${name}`,
			`Email: ${email}`,
			`Role: ${role || '-'}`,
			`Company: ${company || '-'}`,
			'',
			'Blueprint snapshot:',
			...snapshotLines
		].join('\n');
		const html = `
			<h2>New Blueprint Assessment</h2>
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			<p><strong>Role:</strong> ${escapeHtml(role) || '-'}</p>
			<p><strong>Company:</strong> ${escapeHtml(company) || '-'}</p>
			<hr />
			<p><strong>Blueprint snapshot</strong></p>
			<ul>${snapshotLines.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>
		`;

		try {
			const res = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ from, to, reply_to: email, subject, text, html })
			});

			if (!res.ok) {
				console.error('[assessment] Resend send failed', res.status, await res.text());
				// Non-fatal: still let the person see their results.
				return { success: true, delivered: false };
			}
		} catch (err) {
			console.error('[assessment] Resend request threw', err);
			return { success: true, delivered: false };
		}

		return { success: true, delivered: true };
	}
};
