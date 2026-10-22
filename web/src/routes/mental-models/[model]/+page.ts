import { error } from '@sveltejs/kit';
import { isModelId } from '$lib/mental-models/models';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!isModelId(params.model)) error(404, 'That Model does not exist');
	return { modelId: params.model };
};
