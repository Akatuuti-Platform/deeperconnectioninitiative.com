<script lang="ts">
	import { PhoneIcon as Phone, ChatCircleTextIcon as Chat } from 'phosphor-svelte';
	import { siteConfig } from '@/lib/config/site';
</script>

<section class="px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
	<div class="mx-auto max-w-3xl space-y-10">
		<div>
			<p class="text-xs font-semibold uppercase tracking-[0.2em] text-dci-burgundy">Support</p>
			<h1 class="mt-3 font-serif text-4xl font-light leading-tight text-dci-teal-deep sm:text-5xl">When it feels bigger than a pattern</h1>
			<p class="mt-4 text-lg leading-relaxed text-slate-700">
				You do not have to wait until it is an emergency, and you do not have to know exactly what is wrong. Reaching out is allowed at any size.
			</p>
		</div>

		<div class="rounded-2xl border border-dci-burgundy/30 bg-dci-burgundy/5 p-6">
			<h2 class="text-xl font-semibold text-dci-teal-deep">If you or someone else is in danger right now</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">
				Contact your local emergency services, or go to the nearest health facility or somewhere safe, and tell someone nearby. DCI is not an emergency service and cannot respond in a crisis.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-dci-teal-deep">Talk to DCI about what is next</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">
				DCI does not provide clinical care. We will listen, and help you find a responsible next step, including referral to professional support where it is needed. You do not need the whole story to start.
			</p>
			<div class="mt-4 grid gap-3 sm:grid-cols-2">
				<a href={`tel:${siteConfig.contacts.tele}`} class="flex items-center gap-3 rounded-2xl border border-dci-teal/20 bg-white/70 p-4 transition-colors hover:border-dci-burgundy/40">
					<Phone class="size-6 text-dci-teal-deep" />
					<span><span class="block text-sm font-semibold text-dci-teal-deep">Call or message</span><span class="block text-base text-slate-800">{siteConfig.contacts.tel[0]}</span></span>
				</a>
				<a href="/contact" class="flex items-center gap-3 rounded-2xl border border-dci-teal/20 bg-white/70 p-4 transition-colors hover:border-dci-burgundy/40">
					<Chat class="size-6 text-dci-teal-deep" />
					<span><span class="block text-sm font-semibold text-dci-teal-deep">Write to us</span><span class="block text-base text-slate-800">Use the contact form</span></span>
				</a>
			</div>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-dci-teal-deep">Tell one person, in one sentence</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">A trusted friend, relative, teacher, counsellor, faith leader or colleague. If you are under 18, a trusted adult is a good place to start. You could say:</p>
			<ul class="mt-3 space-y-2 text-base text-slate-800">
				<li class="rounded-xl bg-dci-teal/8 p-3">&ldquo;I am finding things hard and I do not know where to start.&rdquo;</li>
				<li class="rounded-xl bg-dci-teal/8 p-3">&ldquo;I do not need you to fix it. I just need someone to know.&rdquo;</li>
				<li class="rounded-xl bg-dci-teal/8 p-3">&ldquo;Can I tell you something, and can you just listen first?&rdquo;</li>
			</ul>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-dci-teal-deep">Support in community</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">
				A Conversation Clinic is a small group with a trained Champion, built for honest conversation. It is not therapy, and it can be a first step.
			</p>
			<a href="/clinics" class="mt-3 inline-block text-sm font-semibold text-dci-teal-deep underline underline-offset-4">See Conversation Clinics</a>
		</div>

		<!-- PLACEHOLDER: verified support contacts. Do not publish until confirmed by Restless. -->
		<div class="rounded-2xl border-2 border-dashed border-dci-burgundy/40 p-6" aria-label="Placeholder">
			<p class="text-xs font-semibold uppercase tracking-[0.18em] text-dci-burgundy">Placeholder &middot; Draft 1</p>
			<h2 class="mt-2 text-xl font-semibold text-dci-teal-deep">Verified local support services</h2>
			<p class="mt-2 text-base leading-relaxed text-slate-800">[To be confirmed: verified helplines and services, with names, numbers and opening hours. No contact is listed here until it has been checked.]</p>
			<p class="mt-2 text-sm text-slate-600">Until then, DCI will help you find the right one when you contact us.</p>
		</div>
	</div>
</section>
