<script lang="ts">
	import { siteConfig } from '@/lib/config/site';
	import { CONSENT_VERSION } from '$lib/mental-models/version';
	import { PRIVACY_NOTICE } from '$lib/mental-models/consent-copy';
</script>

<section class="px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
	<article class="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-slate-800">
		<p class="inline-block rounded-full border border-dci-burgundy/25 bg-dci-burgundy/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-dci-burgundy">Draft for legal review</p>
		<h1 class="font-serif text-4xl font-light text-dci-teal-deep">How the Mental Models Scorecard handles your data</h1>
		<p>This notice covers the DCI Mental Models Scorecard only. It sits alongside DCI's general <a href="/privacy" class="underline underline-offset-4">privacy policy</a>.</p>

		{#each PRIVACY_NOTICE as section (section.heading)}
			<h2 class="text-xl font-semibold text-dci-teal-deep">{section.heading}</h2>
			{#each section.paragraphs ?? [] as p}<p>{p}</p>{/each}
			{#if section.bullets}
				<ul class="list-disc space-y-2 pl-6">{#each section.bullets as b}<li>{b}</li>{/each}</ul>
			{/if}
		{/each}
		<p>If you need help now, see <a href="/support" class="underline underline-offset-4">support options</a>.</p>

		<h2 class="text-xl font-semibold text-dci-teal-deep">Contact</h2>
		<p>DCI Wellness (Deeper Connection Initiative), {siteConfig.contacts.address}. Phone {siteConfig.contacts.tel[0]}, or use our <a href="/contact" class="underline underline-offset-4">contact form</a>.</p>
		<p class="text-xs text-slate-600">Consent wording version: {CONSENT_VERSION}</p>
	</article>
</section>
