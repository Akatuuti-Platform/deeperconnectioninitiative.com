<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight, BellIcon as Bell, HeartIcon as Heart } from 'phosphor-svelte';
</script>

<!-- (f) Two separate cards. "Keep going": the DCI EWS (coming soon) and the 90-day retake, whose reminder is a box in the "Keep noticing" form above. "Pass it on": sponsor a toolkit. -->
<div class="grid gap-4 sm:grid-cols-2">
	<section aria-labelledby="keep-going" class="rounded-2xl border border-dci-teal/15 bg-white/70 p-5">
		<div class="flex flex-wrap items-center gap-2">
			<h2 id="keep-going" class="text-lg font-semibold text-dci-teal-deep">Keep going</h2>
			<span class="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">Coming soon</span>
		</div>
		<p class="mt-2 text-sm leading-relaxed text-slate-700">
			<strong class="text-dci-teal-deep">Start the DCI Early Warning System.</strong> Free daily mood tracking, so you can notice your patterns over time. It is not open yet. Tick "DCI updates" in the form above to hear when it opens.
		</p>
		<p class="mt-3 text-sm leading-relaxed text-slate-700">
			<Bell class="mr-1 inline size-4 text-dci-teal-deep" /><strong class="text-dci-teal-deep">Retake in 90 days.</strong> Patterns can shift with time and practice. Taking the scorecard again shows you what has changed. Tick the 90-day reminder above, or just come back.
		</p>
		<p class="mt-3 text-xs leading-relaxed text-slate-600">
			Meanwhile:
			<a href="/mental-models/14-day-check" target="_blank" rel="noopener" class="font-semibold text-dci-teal-deep underline underline-offset-4">your free 14-day check</a>
			(print it or keep it on your phone, no sign-up).
		</p>
	</section>

	<section aria-labelledby="pass-it-on" class="rounded-2xl border border-dci-burgundy/20 bg-dci-burgundy/5 p-5">
		<h2 id="pass-it-on" class="text-lg font-semibold text-dci-teal-deep">Pass it on</h2>
		<p class="mt-1 text-sm leading-relaxed text-slate-700">Sponsor a DCI toolkit for someone who cannot buy one.</p>
		<a href="/checkout/donate" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-dci-burgundy px-5 py-2.5 text-sm font-semibold text-dci-cream">
			<Heart class="size-4" /> Sponsor a toolkit <ArrowUpRight class="size-4" />
		</a>
		<p class="mt-4 text-xs leading-relaxed text-slate-600">
			Run a school, organisation or community group? <a href="/partners" target="_blank" rel="noopener" class="underline underline-offset-4">Talk to us</a> about the Early Warning System for your community.
		</p>
	</section>
</div>
