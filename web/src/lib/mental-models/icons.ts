import {
	FlagIcon,
	HandHeartIcon,
	UsersThreeIcon,
	CoinsIcon,
	CompassIcon,
	BookOpenIcon,
	EyeIcon,
	HandWavingIcon,
	WindIcon,
	MegaphoneIcon
} from 'phosphor-svelte';
import type { Component } from 'svelte';
import type { ModelId } from './types';

// One quiet icon per Model. No colour coding, so no Model reads as better or worse.
export const MODEL_ICONS: Record<ModelId, Component<any>> = {
	champion: FlagIcon,
	angel: HandHeartIcon,
	connector: UsersThreeIcon,
	sponsor: CoinsIcon,
	navigator: CompassIcon,
	intellectual: BookOpenIcon,
	observer: EyeIcon,
	receiver: HandWavingIcon,
	drifter: WindIcon,
	advocate: MegaphoneIcon
};
