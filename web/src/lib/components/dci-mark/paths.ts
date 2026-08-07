// Path data copied verbatim from the supplied DciMark.jsx. Do not edit.
// The clip paths in defs and the ink outlines in the ribbons must stay
// identical, so both read from here.

export const MARK_SRC = '/photos/dci-mark-2026.png';

export const BAND_A =
	'M-14 42 C30 16 70 48 112 22 C146 2 190 16 264 4 L264 18 C190 30 146 16 112 36 C70 62 30 30 -14 56 Z';
export const BAND_B =
	'M-14 62 C30 36 70 68 112 42 C146 22 190 36 264 24 L264 38 C190 50 146 36 112 56 C70 82 30 50 -14 76 Z';
export const BAND_C =
	'M-14 82 C30 56 70 88 112 62 C146 42 190 56 264 44 L264 58 C190 70 146 56 112 76 C70 102 30 70 -14 96 Z';

export const BANDS = [
	{ letter: 'a', path: BAND_A, clip: 'dciBandA', tile: 'dciTileA' },
	{ letter: 'b', path: BAND_B, clip: 'dciBandB', tile: 'dciTileB' },
	{ letter: 'c', path: BAND_C, clip: 'dciBandC', tile: 'dciTileC' }
] as const;

// The block sequence tiles every 130 units, so this set loops seamlessly.
export const TILE_OFFSETS = [-130, 0, 130, 260];
