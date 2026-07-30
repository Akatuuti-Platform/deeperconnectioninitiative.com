import {
	CURRENCY,
	getProduct,
	productSlugFromTxRef,
	verifyTransaction
} from '$lib/server/flutterwave';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const status = url.searchParams.get('status') ?? '';
	const txRefParam = url.searchParams.get('tx_ref') ?? '';
	const transactionId = url.searchParams.get('transaction_id');

	if (!transactionId || status === 'cancelled') {
		return { state: 'cancelled' as const, txRef: txRefParam, productName: null, amount: null };
	}

	const tx = await verifyTransaction(fetch, transactionId);
	const slug = productSlugFromTxRef(tx?.txRef || txRefParam);
	const product = slug ? getProduct(slug) : null;

	const paidEnough = product?.amount == null || (tx?.amount ?? 0) >= product.amount;
	if (!tx || tx.status !== 'successful' || tx.currency !== CURRENCY || !paidEnough) {
		return {
			state: 'failed' as const,
			txRef: tx?.txRef || txRefParam,
			productName: product?.name ?? null,
			amount: null
		};
	}

	return {
		state: 'success' as const,
		txRef: tx.txRef,
		productName: product?.name ?? null,
		amount: tx.amount
	};
};
