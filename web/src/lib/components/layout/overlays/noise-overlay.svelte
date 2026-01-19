<script lang="ts">
  // Simple way to ensure unique IDs if you use this component multiple times
  const id = `noise-${Math.random().toString(36).slice(2)}`;
</script>

<svg
	class="pointer-events-none absolute inset-0 -z-1 h-full w-full opacity-40 "
	style="filter: contrast(125%) brightness(110%)"
>
	<filter {id}>
		<feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" stitchTiles="stitch" />
		<feColorMatrix type="saturate" values="0" />
	</filter>
	<rect width="100%" height="100%" filter="url(#{id})" />
</svg>
