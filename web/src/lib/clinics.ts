// Conversation Clinics run on the last Wednesday of every month. Dates are
// generated rather than hardcoded so the schedule never goes stale.

export const CLINIC_VENUE = 'Yujo Izakaya Restaurant, Kampala';
export const CLINIC_START = '5:30 PM';
export const CLINIC_END = '7:00 PM';
export const CLINIC_PRICE_UGX = 20_000;

/** Last Wednesday of the given month. Month is 0-indexed, matching Date. */
export function lastWednesday(year: number, month: number): Date {
	// Start at the last day of the month and walk back to Wednesday (day 3).
	const date = new Date(Date.UTC(year, month + 1, 0));
	const offset = (date.getUTCDay() - 3 + 7) % 7;
	date.setUTCDate(date.getUTCDate() - offset);
	return date;
}

/**
 * The next `count` clinic dates, starting with this month's if it has not
 * already passed. `from` is injectable so the logic stays testable.
 */
export function upcomingClinics(count = 4, from: Date = new Date()): Date[] {
	const dates: Date[] = [];
	let year = from.getUTCFullYear();
	let month = from.getUTCMonth();

	// Compare on date alone: a clinic is still "upcoming" on the day it runs.
	const today = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());

	while (dates.length < count) {
		const candidate = lastWednesday(year, month);
		if (candidate.getTime() >= today) dates.push(candidate);
		month += 1;
		if (month > 11) {
			month = 0;
			year += 1;
		}
	}
	return dates;
}

export function formatClinicDate(date: Date): string {
	return date.toLocaleDateString('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

export function formatClinicDateShort(date: Date): string {
	return date.toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC'
	});
}

/** ISO day (YYYY-MM-DD), used as the booking and check-in key. */
export function clinicKey(date: Date): string {
	return date.toISOString().slice(0, 10);
}
