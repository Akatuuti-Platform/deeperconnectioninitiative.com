// Server-only bridge between the site and the Mental Models backend on Convex.
// The browser never calls Convex. Every call goes through here, with the shared secret.
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { RequestEvent } from '@sveltejs/kit';

const encoder = new TextEncoder();

async function hmacHex(key: string, message: string): Promise<string> {
	const k = await crypto.subtle.importKey('raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const sig = await crypto.subtle.sign('HMAC', k, encoder.encode(message));
	return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * A key for rate limiting that is not the visitor's address: a keyed hash of the address and
 * today's date. It changes every day and cannot be turned back into the address.
 */
export async function rateKeyFor(event: RequestEvent): Promise<string> {
	let address = 'unknown';
	try {
		address = event.getClientAddress();
	} catch {
		/* not available in some environments */
	}
	const salt = env.MM_RATE_SALT || env.MM_SERVER_SECRET || 'unset';
	return (await hmacHex(salt, `${new Date().toISOString().slice(0, 10)}|${address}`)).slice(0, 32);
}

export interface BackendReply {
	status: number;
	data: Record<string, unknown> | null;
}

/** Posts to a Mental Models endpoint. Returns null when the backend is not configured or unreachable. */
export async function callBackend(path: string, body: Record<string, unknown>): Promise<BackendReply | null> {
	const base = publicEnv.PUBLIC_CONVEX_SITE_URL;
	const secret = env.MM_SERVER_SECRET;
	if (!base || !secret) {
		console.warn('[mental-models] backend not configured (PUBLIC_CONVEX_SITE_URL or MM_SERVER_SECRET missing)');
		return null;
	}
	try {
		const res = await fetch(`${base.replace(/\/$/, '')}${path}`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(8000)
		});
		return { status: res.status, data: (await res.json().catch(() => null)) as Record<string, unknown> | null };
	} catch {
		console.error(`[mental-models] backend unreachable: ${path}`);
		return null;
	}
}

/**
 * Cloudflare Turnstile check. Until TURNSTILE_SECRET_KEY is set this returns true, and the
 * backend's rate limits are the only protection. Set it before launch.
 */
export async function passesTurnstile(token: string | null, event: RequestEvent): Promise<boolean> {
	const secret = env.TURNSTILE_SECRET_KEY;
	if (!secret) return true;
	if (!token) return false;
	const form = new URLSearchParams({ secret, response: token });
	try {
		form.set('remoteip', event.getClientAddress());
	} catch {
		/* optional */
	}
	try {
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body: form,
			signal: AbortSignal.timeout(8000)
		});
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch {
		return false;
	}
}
