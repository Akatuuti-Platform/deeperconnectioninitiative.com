import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		// Honeypot: bots fill the hidden field; humans leave it empty.
		if (String(data.get('company') ?? '').trim() !== '') {
			return { success: true };
		}

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const topic = String(data.get('topic') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();
		const values = { name, email, phone, topic, message };

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Please add your name.';
		if (!EMAIL_RE.test(email)) errors.email = 'Please add a valid email address.';
		if (message.length < 10) errors.message = 'Please add a bit more detail (10+ characters).';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		// Deliver via Resend (https://resend.com). Reads config from private env:
		//   RESEND_API_KEY       — required to actually send
		//   CONTACT_TO_EMAIL     — where enquiries land (default: DCI inbox)
		//   CONTACT_FROM_EMAIL   — verified Resend sender (default: resend test sender)
		const apiKey = env.RESEND_API_KEY;
		const to = env.CONTACT_TO_EMAIL || 'info@utaliicreative.com';
		const from = env.CONTACT_FROM_EMAIL || 'DCI Website <onboarding@resend.dev>';

		if (!apiKey) {
			// No key configured yet: validate + acknowledge so the form works in
			// dev, but make it loud that nothing was delivered.
			console.warn(
				'[contact] RESEND_API_KEY not set — enquiry NOT delivered:',
				JSON.stringify({ name, email, topic })
			);
			return { success: true };
		}

		const subject = `New enquiry${topic ? `: ${topic}` : ''} — ${name}`;
		const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\nTopic: ${topic || '—'}\n\n${message}`;
		const html = `
			<h2>New DCI enquiry</h2>
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			<p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
			<p><strong>Topic:</strong> ${escapeHtml(topic) || '—'}</p>
			<hr />
			<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
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
				console.error('[contact] Resend send failed', res.status, await res.text());
				const sendError: Record<string, string> = {
					form: 'Something went wrong sending your message. Please email us directly.'
				};
				return fail(502, { errors: sendError, values });
			}
		} catch (err) {
			console.error('[contact] Resend request threw', err);
			const sendError: Record<string, string> = {
				form: 'Something went wrong sending your message. Please email us directly.'
			};
			return fail(502, { errors: sendError, values });
		}

		return { success: true };
	}
};
