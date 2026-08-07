<script lang="ts">
	import { BAND_A, BAND_B, BAND_C } from './paths';

	// Render ONCE per document, near the top of the root layout.
	// Every mark instance references these ids, so the patterns, tiles and
	// clip paths are downloaded, parsed and animated a single time.
</script>

<svg width="0" height="0" style="position: absolute" aria-hidden="true" focusable="false">
	<defs>
		<pattern id="dciHatch" width="6" height="6" patternUnits="userSpaceOnUse">
			<line x1="3" y1="-1" x2="3" y2="7" stroke="#1E1E28" stroke-opacity=".34" stroke-width="1.5" />
			<animateTransform
				attributeName="patternTransform"
				type="translate"
				from="0 0"
				to="-6 0"
				dur="2.6s"
				repeatCount="indefinite"
			/>
		</pattern>

		<pattern id="dciHatchBold" width="11" height="11" patternUnits="userSpaceOnUse">
			<line
				x1="5.5"
				y1="-1"
				x2="5.5"
				y2="12"
				stroke="#1E1E28"
				stroke-opacity=".38"
				stroke-width="2.6"
			/>
			<animateTransform
				attributeName="patternTransform"
				type="translate"
				from="0 0"
				to="-11 0"
				dur="3.4s"
				repeatCount="indefinite"
			/>
		</pattern>

		<path
			id="dciSpiral"
			d="M0 0 A1.5 1.5 0 0 1 3 0 A2.5 2.5 0 0 1 -2 0 A3.5 3.5 0 0 1 5 0 A4.5 4.5 0 0 1 -4 0"
			fill="none"
			stroke="#1E1E28"
			stroke-opacity=".55"
			stroke-width="1"
			stroke-linecap="round"
		/>
		<path
			id="dciCoil"
			d="M-6 -6 H6 V6 H-6 V-3.5 H3.5 V3.5 H-3.5 V-1 H1"
			fill="none"
			stroke="#1E1E28"
			stroke-opacity=".45"
			stroke-width="1"
			stroke-linejoin="round"
		/>

		<g id="dciTileA">
			<rect x="0" y="-20" width="42" height="150" fill="#B5613A" />
			<rect x="42" y="-20" width="28" height="150" fill="#2E5F5C" />
			<rect x="70" y="-20" width="34" height="150" fill="#E8DFCB" />
			<rect x="104" y="-20" width="26" height="150" fill="#8C4A2F" />
			<use href="#dciSpiral" x="86" y="38" />
			<use href="#dciCoil" x="22" y="36" />
		</g>
		<g id="dciTileB">
			<rect x="0" y="-20" width="38" height="150" fill="#E8DFCB" />
			<rect x="38" y="-20" width="28" height="150" fill="#B5613A" />
			<rect x="66" y="-20" width="32" height="150" fill="#2E5F5C" />
			<rect x="98" y="-20" width="32" height="150" fill="#C9B99A" />
			<use href="#dciCoil" x="18" y="58" />
			<use href="#dciSpiral" x="112" y="52" />
		</g>
		<g id="dciTileC">
			<rect x="0" y="-20" width="46" height="150" fill="#2E5F5C" />
			<rect x="46" y="-20" width="26" height="150" fill="#8C4A2F" />
			<rect x="72" y="-20" width="28" height="150" fill="#E8DFCB" />
			<rect x="100" y="-20" width="30" height="150" fill="#B5613A" />
			<use href="#dciSpiral" x="84" y="76" />
			<use href="#dciCoil" x="30" y="74" />
		</g>

		<clipPath id="dciBandA"><path d={BAND_A} /></clipPath>
		<clipPath id="dciBandB"><path d={BAND_B} /></clipPath>
		<clipPath id="dciBandC"><path d={BAND_C} /></clipPath>
	</defs>
</svg>
