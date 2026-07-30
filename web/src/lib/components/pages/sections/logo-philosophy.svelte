<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="w-full bg-white relative z-10 overflow-hidden">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
		<div use:reveal={{ delay: 0, y: 18 }}>
			<span
				class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dci-teal"
			>
				The mark
			</span>

			<!-- Breathing logo mark - the pulse is the point -->
			<img
				src="/photos/dci-logo-mark.png"
				alt="DCI logo mark"
				loading="lazy"
				class="dci-breathe mx-auto mt-8 mb-8 w-24 h-24 object-contain"
			/>

			<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-4">
				No skin. No name. No gender.
			</h2>
			<p class="text-base leading-relaxed text-slate-600 max-w-xl mx-auto">
				Our mark is drawn from the muscular system: the body with the skin peeled
				back. Look beneath the surface and you can't tell who is Black, who is Indian,
				who is anyone. The striving underneath looks the same in all of us. That shared,
				unhidden humanity is the whole idea of DCI.
			</p>
		</div>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="mt-12 grid gap-6 sm:grid-cols-3 text-left"
		>
			<div class="rounded-2xl border border-dci-sand bg-dci-cream/70 p-6">
				<p class="text-xs font-bold uppercase tracking-widest text-dci-teal/70 mb-2">Peel back</p>
				<p class="text-sm leading-relaxed text-slate-700">
					Healing starts by stripping away the layers we perform behind, and looking
					honestly at what's really there.
				</p>
			</div>
			<div class="rounded-2xl border border-dci-sand bg-dci-cream/70 p-6">
				<p class="text-xs font-bold uppercase tracking-widest text-dci-teal/70 mb-2">Breathe</p>
				<p class="text-sm leading-relaxed text-slate-700">
					A living body is always moving: blood through muscle, a pulse through the whole.
					The mark breathes because healing is motion, not a finished state.
				</p>
			</div>
			<div class="rounded-2xl border border-dci-sand bg-dci-cream/70 p-6">
				<p class="text-xs font-bold uppercase tracking-widest text-dci-teal/70 mb-2">Unfinished</p>
				<p class="text-sm leading-relaxed text-slate-700">
					The mark is deliberately incomplete, because the work is never done, and the
					person doing it can be anyone willing to start an honest conversation.
				</p>
			</div>
		</div>

		<p
			use:reveal={{ delay: 220, y: 14 }}
			class="mt-12 text-lg font-medium italic text-dci-teal"
		>
			Own your healing: peel back the layers.
		</p>
	</div>
</section>

<style>
	/* The mark breathes: a slow pulse, like blood moving through muscle.
	   Subtle by design - healing in motion, never a hard beat. */
	.dci-breathe {
		animation: dci-breathe 4.5s ease-in-out infinite;
		transform-origin: center;
		will-change: transform, opacity;
	}

	@keyframes dci-breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.92;
		}
		50% {
			transform: scale(1.045);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dci-breathe {
			animation: none;
		}
	}
</style>
