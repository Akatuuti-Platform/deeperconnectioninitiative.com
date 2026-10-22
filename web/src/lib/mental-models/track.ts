// Fire-and-forget anonymous step counts. Sends only the event name.
export function track(event: string): void {
	try {
		const body = JSON.stringify({ event });
		const sent = typeof navigator !== 'undefined' && navigator.sendBeacon?.('/api/mm/event', new Blob([body], { type: 'application/json' }));
		if (!sent) void fetch('/api/mm/event', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
	} catch {
		/* counting must never break the page */
	}
}
