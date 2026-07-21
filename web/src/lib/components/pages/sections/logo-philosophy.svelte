<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="w-full bg-white relative z-10 overflow-hidden">
	<div
		class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center"
		use:reveal={{ delay: 0, y: 18 }}
	>
		<img
			src="/photos/dci-logo-mark.png"
			alt="DCI logo mark"
			loading="lazy"
			class="mx-auto mb-8 w-20 h-20 object-contain"
		/>
		<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-4">
			No hair. No gender. No name.
		</h2>
		<p class="text-base leading-relaxed text-slate-600 max-w-lg mx-auto">
			The DCI mark represents anyone willing to start an honest conversation about
			how they feel. It is deliberately unfinished — because the work is never done
			and the person doing it can be anyone.
		</p>
	</div>
</section>
