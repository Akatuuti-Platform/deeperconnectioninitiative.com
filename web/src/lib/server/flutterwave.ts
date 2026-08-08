import { env } from '$env/dynamic/private';

const FLW_API_BASE = 'https://api.flutterwave.com/v3';

export const CURRENCY = 'UGX';

export type Product = {
	slug: string;
	name: string;
	description: string;
	/** Fixed price in UGX. Null means the supporter chooses the amount (donations). */
	amount: number | null;
};

export const products: Record<string, Product> = {
	toolkit: {
		slug: 'toolkit',
		name: 'The Full Toolkit',
		description:
			'Card Game, Reflection Journal, Mood Tracker, and QR access bundled for everyday self-awareness, group facilitation, and community support.',
		amount: 200_000
	},
	'card-game': {
		slug: 'card-game',
		name: 'DCI Card Game',
		description: 'Guided conversation prompts that open up honest reflection, solo or in groups.',
		amount: 69_000
	},
	journal: {
		slug: 'journal',
		name: 'DCI Reflection Journal',
		description: 'Structured journaling that turns daily reflection into emotional strength.',
		amount: 100_000
	},
	'mood-tracker': {
		slug: 'mood-tracker',
		name: 'DCI Mood Tracker',
		description: 'A simple tactile tool for noticing patterns in how you feel, day by day.',
		amount: 31_000
	},
	't-shirt': {
		slug: 't-shirt',
		name: 'DCI Volunteer T-Shirt',
		description: 'Wear the mission. Every shirt supports community champion training.',
		amount: 50_000
	},
	'cert-foundation': {
		slug: 'cert-foundation',
		name: 'Foundation Level: Community Champion Certification',
		description: 'Foundational training for facilitating DCI conversations in your community.',
		amount: 500_000
	},
	'cert-advanced': {
		slug: 'cert-advanced',
		name: 'Advanced Level: Institutional Champion Certification',
		description: 'Advanced training for embedding DCI practices inside institutions.',
		amount: 1_500_000
	},
	'cert-master': {
		slug: 'cert-master',
		name: 'Master Trainer Certification',
		description: 'Train and certify new champions as a DCI master trainer.',
		amount: 3_000_000
	},
	clinic: {
		slug: 'clinic',
		name: 'Conversation Clinic Seat',
		description:
			'One seat at the next Wellness Wednesday Conversation Clinic: a peer-led session with a trained Champion and the full DCI toolkit. Booking checks you in and counts your Connection Mile.',
		amount: 20_000
	},
	donate: {
		slug: 'donate',
		name: 'Sponsor a Toolkit',
		description:
			'Your donation puts healing tools in the hands of someone who could not otherwise afford them.',
		amount: null
	}
};

export function getProduct(slug: string): Product | null {
	return products[slug] ?? null;
}

/** tx_ref format: dci-<slug>-<timestamp>-<random>. Slugs may contain hyphens. */
export function productSlugFromTxRef(txRef: string): string | null {
	const match = /^dci-(.+)-\d+-[0-9a-f]+$/.exec(txRef);
	return match ? match[1] : null;
}

type CreatePaymentInput = {
	product: Product;
	amount: number;
	customer: { email: string; name?: string; phone?: string };
	redirectUrl: string;
	/** Extra detail carried on the payment, e.g. which clinic date was booked.
	 *  Appears in the Flutterwave record and in the order email. */
	meta?: Record<string, string>;
	/** Overrides the description shown on the Flutterwave payment page. */
	description?: string;
};

export async function createPayment(
	fetchFn: typeof fetch,
	{ product, amount, customer, redirectUrl, meta, description }: CreatePaymentInput
): Promise<{ link: string; txRef: string } | { error: string }> {
	const secretKey = env.FLUTTERWAVE_SECRET_KEY;
	if (!secretKey) {
		console.error('[payments] FLUTTERWAVE_SECRET_KEY not set - cannot start checkout');
		return { error: 'Payments are not configured yet. Please contact us to complete your order.' };
	}

	const txRef = `dci-${product.slug}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

	try {
		const res = await fetchFn(`${FLW_API_BASE}/payments`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${secretKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				tx_ref: txRef,
				amount,
				currency: CURRENCY,
				redirect_url: redirectUrl,
				customer: {
					email: customer.email,
					...(customer.name ? { name: customer.name } : {}),
					...(customer.phone ? { phonenumber: customer.phone } : {})
				},
				customizations: {
					title: 'DCI Wellness',
					description: description ?? product.name
				},
				meta: { product: product.slug, ...(meta ?? {}) }
			})
		});

		const body = await res.json().catch(() => null);
		if (!res.ok || body?.status !== 'success' || !body?.data?.link) {
			console.error('[payments] create payment failed', res.status, body);
			return { error: 'We could not start the payment. Please try again in a moment.' };
		}
		return { link: body.data.link as string, txRef };
	} catch (err) {
		console.error('[payments] create payment threw', err);
		return { error: 'We could not reach the payment provider. Please try again in a moment.' };
	}
}

export type VerifiedTransaction = {
	status: string;
	amount: number;
	currency: string;
	txRef: string;
	customerEmail: string;
};

export async function verifyTransaction(
	fetchFn: typeof fetch,
	transactionId: string
): Promise<VerifiedTransaction | null> {
	const secretKey = env.FLUTTERWAVE_SECRET_KEY;
	if (!secretKey) {
		console.error('[payments] FLUTTERWAVE_SECRET_KEY not set - cannot verify transaction');
		return null;
	}

	try {
		const res = await fetchFn(
			`${FLW_API_BASE}/transactions/${encodeURIComponent(transactionId)}/verify`,
			{ headers: { Authorization: `Bearer ${secretKey}` } }
		);
		const body = await res.json().catch(() => null);
		if (!res.ok || body?.status !== 'success' || !body?.data) {
			console.error('[payments] verify failed', res.status, body);
			return null;
		}
		return {
			status: String(body.data.status ?? ''),
			amount: Number(body.data.amount ?? 0),
			currency: String(body.data.currency ?? ''),
			txRef: String(body.data.tx_ref ?? ''),
			customerEmail: String(body.data.customer?.email ?? '')
		};
	} catch (err) {
		console.error('[payments] verify threw', err);
		return null;
	}
}
