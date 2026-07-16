<script lang="ts">
	import LegalPage from '$lib/components/legal-page.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<LegalPage
	eyebrow="Privacy"
	title="Privacy Policy"
	description="How Deeper Connection Initiative collects, uses, and protects your information."
	updated="14 July 2026"
>
	<p>
		Deeper Connection Initiative ("DCI", "we", "us") respects your privacy. This policy explains what
		we collect, why, and the choices you have. It applies to this website and the services offered
		through it.
	</p>

	<h2>What we collect</h2>
	<ul>
		<li>
			<strong>Contact details you give us</strong> — your name, email, phone number, and message when
			you use our contact form or sign up for a programme.
		</li>
		<li>
			<strong>Purchase information</strong> — when you buy or sponsor a toolkit or training, payment
			is handled by our payment provider (Flutterwave). We do not store your card details.
		</li>
		<li>
			<strong>Basic usage data</strong> — standard, non-identifying information your browser sends,
			used to keep the site secure and working.
		</li>
	</ul>

	<h2>How we use it</h2>
	<ul>
		<li>To respond to your enquiries and deliver the toolkits, clinics, or trainings you request.</li>
		<li>To coordinate community programmes, Champion training, and partnerships.</li>
		<li>To improve our services and measure wellbeing impact in aggregate, non-identifying form.</li>
	</ul>

	<h2>Sensitive information</h2>
	<p>
		Please do not send detailed clinical or crisis information through this website. DCI provides
		early, community-level support and is not a substitute for professional or emergency care. If
		you are in crisis, please contact a qualified provider or local emergency services.
	</p>

	<h2>Sharing</h2>
	<p>
		We do not sell your personal information. We share it only with the service providers who help us
		operate (such as our payment and email providers), and only as needed to deliver what you asked
		for or as required by law.
	</p>

	<h2>Your choices</h2>
	<p>
		You can ask us to access, correct, or delete the personal information we hold about you. To make
		a request, contact us at <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy? Reach us at
		<a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a> or
		{siteConfig.contacts.address}.
	</p>
</LegalPage>
