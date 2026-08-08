import { clinicsRemainingThisYear, upcomingClinics } from '$lib/clinics';
import type { PageServerLoad } from './$types';

// Dates are computed on the server so every visitor sees the same schedule
// regardless of device clock or timezone.
export const load: PageServerLoad = () => {
	// Late in December the current year runs out, so roll into the next one
	// rather than showing an empty calendar.
	const remaining = clinicsRemainingThisYear();
	const clinics = remaining.length > 0 ? remaining : upcomingClinics(4);

	return { clinics: clinics.map((d) => d.toISOString()) };
};
