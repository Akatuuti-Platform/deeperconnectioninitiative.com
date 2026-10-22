<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight, PrinterIcon as Printer, BellIcon as Bell, HeartIcon as Heart } from 'phosphor-svelte';
	import { track } from '$lib/mental-models/track';
</script>

<!-- (f) Two cards. "Keep going" reuses the "Keep noticing" reminders form above for the 90-day retake. -->
<div class="grid gap-4 sm:grid-cols-2">
	<section aria-labelledby="keep-going" class="rounded-2xl border border-dci-teal/15 bg-white/70 p-5">
		<h2 id="keep-going" class="text-lg font-semibold text-dci-teal-deep">Keep going</h2>
		<p class="mt-1 text-sm leading-relaxed text-slate-600">
			Free mood tracking in the DCI Early Warning System is coming soon. Until then:
		</p>
		<ul class="mt-3 space-y-3 text-sm">
			<li>
				<a href="/mental-models/14-day-check" target="_blank" rel="noopener" class="flex items-start gap-2 font-semibold text-dci-teal-deep">
					<Printer class="mt-0.5 size-4 shrink-0" /> <span>Your free 14-day check <span class="font-normal text-slate-600">(print it or keep it on your phone, no sign-up)</span></span>
				</a>
			</li>
			<li>
				<a href="#unlock" class="flex items-start gap-2 font-semibold text-dci-teal-deep">
					<Bell class="mt-0.5 size-4 shrink-0" /> <span>Retake in 90 days <span class="font-normal text-slate-600">(get one reminder, using the form above)</span></span>
				</a>
			</li>
			<li class="text-slate-700">
				Prefer paper? The DCI Mood Tracker, 31,000 UGX.
				<a href="/toolkit#toolkit-products" target="_blank" rel="noopener" onclick={() => track('tracker_link_clicked')} class="font-semibold text-dci-teal-deep underline underline-offset-4">See it</a>
			</li>
		</ul>
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
