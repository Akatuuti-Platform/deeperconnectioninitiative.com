<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '@/lib/components/ui/button';
	import GetInvolved from '@/lib/components/pages/sections/get-involved.svelte';
	import SpotIllustration from '@/lib/components/spot-illustration.svelte';
	import { reveal } from '@/lib/actions/reveal';
	import { siteConfig } from '@/lib/config/site';

	let { form } = $props();
	let submitting = $state(false);
	import {
		ArrowUpRightIcon as ArrowUpRight,
		ClockIcon as Clock3,
		EnvelopeIcon as Mail,
		MapPinIcon as MapPin,
		ChatCircleTextIcon as MessageCircle,
		PhoneIcon as Phone
	} from 'phosphor-svelte';

	const supportPaths = [
		'Toolkit purchase or sponsorship',
		'Community clinic or event',
		'Partner training',
		'Provider network',
		'Volunteer inquiry'
	];
</script>

<section class="relative overflow-hidden pt-28">
	<div
		class="pointer-events-none absolute top-28 right-0 hidden h-72 w-72 rounded-full bg-dci-teal/8 blur-3xl lg:block"
	></div>
	<div class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
			<aside
				use:reveal={{ delay: 0, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-8 text-dci-cream lg:sticky lg:top-28 lg:p-10"
			>
				<div
					class="pointer-events-none absolute inset-0 opacity-10"
					style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 26px 26px;"
				></div>
				<div class="relative space-y-10">
					<div class="space-y-5">
						<div
							class="inline-flex items-center rounded-full border border-dci-cream/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dci-cream/70"
						>
							Contact DCI
						</div>
						<div class="space-y-4">
							<h1
								class="max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl"
							>
								Let us know what kind of support you need.
							</h1>
							<p class="max-w-lg text-base leading-relaxed text-dci-cream/75 sm:text-lg">
								Reach out about toolkits, clinics, trainings, partnerships, or responsible mental
								health referrals. We will route your message to the right person.
							</p>
						</div>
					</div>

					<div class="grid gap-3">
						<a
							href={`mailto:${siteConfig.contacts.email}`}
							class="group dci-soft-hover grid grid-cols-[2.75rem_1fr] gap-3 rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-4 transition hover:bg-dci-cream/10"
						>
							<span
								class="flex size-11 items-center justify-center rounded-xl bg-dci-cream/12 text-dci-cream"
							>
								<Mail class="size-5" weight="duotone" />
							</span>
							<span>
								<span class="block text-sm font-semibold text-white">Email</span>
								<span class="mt-1 flex items-center gap-2 text-sm text-dci-cream/70">
									{siteConfig.contacts.email}
									<ArrowUpRight
										class="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
										weight="regular"
									/>
								</span>
							</span>
						</a>

						<a
							href={`tel:${siteConfig.contacts.tele}`}
							class="group dci-soft-hover grid grid-cols-[2.75rem_1fr] gap-3 rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-4 transition hover:bg-dci-cream/10"
						>
							<span
								class="flex size-11 items-center justify-center rounded-xl bg-dci-cream/12 text-dci-cream"
							>
								<Phone class="size-5" weight="duotone" />
							</span>
							<span>
								<span class="block text-sm font-semibold text-white">Phone</span>
								<span class="mt-1 block text-sm text-dci-cream/70">{siteConfig.contacts.tele}</span>
							</span>
						</a>

						<div
							class="grid grid-cols-[2.75rem_1fr] gap-3 rounded-2xl border border-dci-cream/12 bg-dci-cream/6 p-4"
						>
							<span
								class="flex size-11 items-center justify-center rounded-xl bg-dci-cream/12 text-dci-cream"
							>
								<MapPin class="size-5" weight="duotone" />
							</span>
							<span>
								<span class="block text-sm font-semibold text-white">Office</span>
								<span class="mt-1 block text-sm text-dci-cream/70"
									>{siteConfig.contacts.address}</span
								>
							</span>
						</div>
					</div>

					<div class="grid gap-3 border-t border-dci-cream/15 pt-6 sm:grid-cols-2">
						<div>
							<Clock3 class="mb-3 size-5 text-dci-cream/70" weight="regular" />
							<p class="text-sm font-semibold text-white">Office hours</p>
							<p class="mt-1 text-sm leading-relaxed text-dci-cream/65">
								Monday-Friday, 9:00 AM-5:00 PM
							</p>
						</div>
						<div>
							<MessageCircle class="mb-3 size-5 text-dci-cream/70" weight="regular" />
							<p class="text-sm font-semibold text-white">Response window</p>
							<p class="mt-1 text-sm leading-relaxed text-dci-cream/65">
								Usually within 1-2 working days.
							</p>
						</div>
					</div>
				</div>
			</aside>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-5 shadow-dci-lift sm:p-8 lg:p-10"
			>
				<SpotIllustration
					variant="care"
					class="pointer-events-none absolute -right-20 bottom-20 hidden w-80 rotate-3 opacity-16 lg:block"
				/>
				<div class="relative z-10 mb-8 max-w-2xl space-y-3">
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Send a message</p>
					<h2
						class="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl"
					>
						Start with the basics. We will follow up with care.
					</h2>
					<p class="text-base leading-relaxed text-slate-600">
						Use this form for general inquiries. If someone is in immediate danger, contact local
						emergency services or a trusted crisis support provider.
					</p>
				</div>

				{#if form?.success}
					<div
						class="relative z-10 mb-6 rounded-2xl border border-dci-teal/25 bg-dci-teal/8 px-5 py-4 text-sm text-dci-teal-deep"
						role="status"
					>
						<p class="font-semibold">Thanks — your message is in.</p>
						<p class="mt-1 text-slate-700">We'll follow up at the email you provided. For anything urgent, call {siteConfig.contacts.tele}.</p>
					</div>
				{/if}
				{#if form?.errors?.form}
					<div
						class="relative z-10 mb-6 rounded-2xl border border-dci-burgundy/25 bg-dci-burgundy/8 px-5 py-4 text-sm text-dci-burgundy"
						role="alert"
					>
						{form.errors.form} You can reach us at
						<a href={`mailto:${siteConfig.contacts.email}`} class="font-semibold underline underline-offset-4">{siteConfig.contacts.email}</a>.
					</div>
				{/if}

				<form
					class="relative z-10 space-y-6"
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<input
						autocomplete="off"
						name="company"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>

					<div class="grid gap-5 sm:grid-cols-2">
						<div class="space-y-2">
							<label for="name" class="text-sm font-semibold text-slate-950">Your name</label>
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								required
								value={form?.values?.name ?? ''}
								aria-invalid={form?.errors?.name ? 'true' : undefined}
								placeholder="Full name"
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							/>
							{#if form?.errors?.name}
								<p class="text-sm text-dci-burgundy">{form.errors.name}</p>
							{/if}
						</div>

						<div class="space-y-2">
							<label for="email" class="text-sm font-semibold text-slate-950">Email address</label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								value={form?.values?.email ?? ''}
								aria-invalid={form?.errors?.email ? 'true' : undefined}
								placeholder="you@example.com"
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							/>
							{#if form?.errors?.email}
								<p class="text-sm text-dci-burgundy">{form.errors.email}</p>
							{/if}
						</div>
					</div>

					<div class="grid gap-5 sm:grid-cols-2">
						<div class="space-y-2">
							<label for="phone" class="text-sm font-semibold text-slate-950">Phone number</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								placeholder="+256..."
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							/>
						</div>

						<div class="space-y-2">
							<label for="topic" class="text-sm font-semibold text-slate-950"
								>What is this about?</label
							>
							<select
								id="topic"
								name="topic"
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-slate-950 outline-none transition focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							>
								{#each supportPaths as path}
									<option>{path}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="space-y-2">
						<label for="message" class="text-sm font-semibold text-slate-950">Message</label>
						<textarea
							id="message"
							name="message"
							rows="7"
							required
							aria-invalid={form?.errors?.message ? 'true' : undefined}
							placeholder="Tell us what you are hoping to do, who the support is for, and the best way to reach you."
							class="w-full resize-y rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 py-4 text-base leading-relaxed text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							>{form?.values?.message ?? ''}</textarea>
						{#if form?.errors?.message}
							<p class="text-sm text-dci-burgundy">{form.errors.message}</p>
						{/if}
					</div>

					<div
						class="flex flex-col gap-4 border-t border-dci-teal/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
					>
						<p class="max-w-md text-sm leading-relaxed text-slate-600">
							Please avoid sending sensitive clinical details through this form.
						</p>
						<Button type="submit" size="lg" disabled={submitting} class="rounded-full px-8">
							{submitting ? 'Sending…' : 'Send message'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<GetInvolved />
</section>
