<script lang="ts">
	import LegalPage from '$lib/components/legal-page.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<LegalPage
	eyebrow="Accessibility"
	title="Accessibility Statement"
	description="Our commitment to making DCI usable for everyone."
	updated="14 July 2026"
>
	<p>
		Deeper Connection Initiative is built on the belief that support should reach everyone. That
		includes how you experience this website. We aim to meet the Web Content Accessibility Guidelines
		(WCAG) 2.1 Level AA and to keep improving.
	</p>

	<h2>What we do</h2>
	<ul>
		<li>Structure pages with clear headings and landmarks for screen-reader navigation.</li>
		<li>Provide text alternatives for meaningful images.</li>
		<li>Support keyboard navigation, including the main menu.</li>
		<li>Respect your system's reduced-motion preference for animations.</li>
		<li>Aim for readable colour contrast throughout.</li>
	</ul>

	<h2>Ongoing work</h2>
	<p>
		Accessibility is never "finished." We review the site regularly and welcome reports of anything
		that gets in your way.
	</p>

	<h2>Tell us about a barrier</h2>
	<p>
		If you hit an access barrier, or need information in a different format, please contact us at
		<a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a> or
		{siteConfig.contacts.tele}. We'll do our best to help and to fix the issue.
	</p>
</LegalPage>
