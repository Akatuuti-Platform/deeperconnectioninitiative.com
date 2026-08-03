import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {
	CURRENCY,
	getProduct,
	productSlugFromTxRef,
	verifyTransaction
} from '$lib/server/flutterwave';
import type { RequestHandler } from './$types';

// Flutterwave payment webhook. Configure in the Flutterwave dashboard:
//   Settings > Webhooks > URL: https://deeperconnectioninitiative.com/api/flutterwave/webhook
//   Secret hash: must match FLUTTERWAVE_WEBHOOK_HASH.
// The webhook body is never trusted on its own; the transaction is re-verified
// against the Flutterwave API before any notification is sent.
export const POST: RequestHandler = async ({ request, fetch }) => {
	const secretHash = env.FLUTTERWAVE_WEBHOOK_HASH;
	if (!secretHash) {
		console.warn('[webhook] FLUTTERWAVE_WEBHOOK_HASH not set; webhook disabled');
		return json({ status: 'not configured' }, { status: 503 });
	}

	if (request.headers.get('verif-hash') !== secretHash) {
		return json({ status: 'unauthorized' }, { status: 401 });
	}

	const payload = await request.json().catch(() => null);
	const txId = payload?.data?.id;
	if (!txId) return json({ status: 'ignored' });

	const tx = await verifyTransaction(fetch, String(txId));
	if (!tx || tx.status !== 'successful' || tx.currency !== CURRENCY) {
		return json({ status: 'not successful' });
	}

	const slug = productSlugFromTxRef(tx.txRef);
	const product = slug ? getProduct(slug) : null;
	const productName = product?.name ?? tx.txRef;

	// Notify the DCI team so fulfilment does not depend on the buyer
	// returning to the site after paying.
	const apiKey = env.RESEND_API_KEY;
	const to = env.ORDERS_TO_EMAIL || env.CONTACT_TO_EMAIL || 'info@utaliicreative.com';
	const from = env.CONTACT_FROM_EMAIL || 'DCI Website <onboarding@resend.dev>';
	if (!apiKey) {
		console.warn('[webhook] RESEND_API_KEY not set; payment received but not emailed:', tx.txRef);
		return json({ status: 'ok' });
	}

	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				from,
				to,
				subject: `Payment received: ${productName} (${tx.amount.toLocaleString('en-US')} ${tx.currency})`,
				text: [
					`Product: ${productName}`,
					`Amount: ${tx.amount.toLocaleString('en-US')} ${tx.currency}`,
					`Buyer email: ${tx.customerEmail || 'unknown'}`,
					`Reference: ${tx.txRef}`,
					`Flutterwave transaction id: ${txId}`
				].join('\n')
			})
		});
		if (!res.ok) {
			console.error('[webhook] order notification failed', res.status, await res.text());
		}
	} catch (err) {
		console.error('[webhook] order notification threw', err);
	}

	return json({ status: 'ok' });
};
