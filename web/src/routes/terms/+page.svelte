<script lang="ts">
	import LegalPage from '$lib/components/legal-page.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<LegalPage
	eyebrow="Terms"
	title="Terms of Service"
	description="The terms that govern your use of this website and DCI's services."
	updated="14 July 2026"
>
	<p>
		By using the Deeper Connection Initiative website and services, you agree to these terms. Please
		read them carefully.
	</p>

	<h2>Who we are</h2>
	<p>
		Deeper Connection Initiative is a community wellbeing organisation based in Kampala, Uganda. We
		provide toolkits, Conversation Clinics, Champion training, and related programmes.
	</p>

	<h2>Not a substitute for professional care</h2>
	<p>
		Our tools and programmes support early, community-level wellbeing. They are not medical advice,
		diagnosis, treatment, or crisis intervention, and they do not replace care from a qualified
		professional. If you or someone else is in danger, contact local emergency services immediately.
	</p>

	<h2>Purchases and payments</h2>
	<ul>
		<li>Toolkit and training purchases are processed by our payment provider, Flutterwave.</li>
		<li>Prices are shown in Ugandan Shillings (UGX) unless stated otherwise.</li>
		<li>
			For questions about an order, refund, or sponsorship, contact us at
			<a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>.
		</li>
	</ul>

	<h2>Acceptable use</h2>
	<p>
		Please use this site lawfully and respectfully. Do not attempt to disrupt the site, misuse the
		contact form, or infringe the rights of others.
	</p>

	<h2>Content</h2>
	<p>
		The content, branding, and materials on this site belong to Deeper Connection Initiative unless
		otherwise noted, and may not be reproduced without permission.
	</p>

	<h2>Changes</h2>
	<p>
		We may update these terms as our programmes evolve. Continued use of the site means you accept
		the current version.
	</p>

	<h2>Contact</h2>
	<p>
		Questions? Reach us at <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
		or {siteConfig.contacts.address}.
	</p>
</LegalPage>
