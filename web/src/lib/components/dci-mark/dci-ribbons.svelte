<script lang="ts">
	import { BANDS, TILE_OFFSETS } from './paths';
</script>

<svg class="dci-ribbons" viewBox="0 0 250 108" aria-hidden="true" focusable="false">
	{#each BANDS as band}
		<g class={`dci-band dci-band--${band.letter}`}>
			<g clip-path={`url(#${band.clip})`}>
				<g class={`dci-drift dci-drift--${band.letter}`}>
					{#each TILE_OFFSETS as x}
						<use href={`#${band.tile}`} {x} />
					{/each}
				</g>
				<rect class="dci-hatch" x="-150" y="-20" width="450" height="150" />
			</g>
			<path class="dci-ink" d={band.path} />
		</g>
	{/each}
</svg>
