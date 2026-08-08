<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Section, SectionHeading } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';
	import {
		CalendarDotsIcon as CalendarDays,
		MapPinIcon as MapPin,
		ClockIcon as Clock,
		ChatCircleTextIcon as MessageCircle,
		UsersThreeIcon as Users,
		HandHeartIcon as HandHeart,
		ArrowUpRightIcon as ArrowUpRight
	} from 'phosphor-svelte';
	import {
		CLINIC_END,
		CLINIC_PRICE_UGX,
		CLINIC_START,
		CLINIC_VENUE,
		clinicKey,
		formatClinicDate
	} from '$lib/clinics';

	let { data } = $props();

	const dates = $derived(data.clinics.map((iso: string) => new Date(iso)));
	const next = $derived(dates[0]);

	const price = `${CLINIC_PRICE_UGX.toLocaleString('en-US')} UGX`;

	const howItWorks = [
		{
			icon: Users,
			title: 'You arrive and you sit down',
			body: 'A small group, a trained Champion holding the room, and a set of cards on the table. Nobody is put on the spot.'
		},
		{
			icon: MessageCircle,
			title: 'A card opens the conversation',
			body: 'Someone draws a question. You answer if you want to. Listening counts as taking part, and plenty of people start there.'
		},
		{
			icon: HandHeart,
			title: 'You leave with something practical',
			body: 'A way of naming what you are carrying, and people who now know your name. Many come back the following month.'
		}
	];

</script>

<svelte:head>
	<title>Conversation Clinics | DCI Wellness</title>
	<meta
		name="description"
		content="A monthly Conversation Clinic in Kampala. Last Wednesday of every month at {CLINIC_VENUE}. Book your seat for {price}."
	/>
</svelte:head>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
			<div class="space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
				>
					<CalendarDays class="size-4 text-dci-teal" weight="duotone" />
					<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
						Every last Wednesday
					</span>
				</div>
				<h1
					class="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl"
				>
					A room where the conversation is already started.
				</h1>
				<p class="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
					The Conversation Clinic is a monthly meet-up in Kampala. A trained Champion, the DCI
					card game, and a small group of people who came for the same reason you did. You do not
					need the right words. The cards do that part.
				</p>
			</div>

			<div
				use:reveal={{ delay: 120, y: 18 }}
				class="relative overflow-hidden rounded-[2rem] bg-dci-teal-deep p-7 text-dci-cream shadow-dci-panel sm:p-9"
			>
				<div
					class="pointer-events-none absolute inset-0 opacity-10"
					style="background-image: radial-gradient(#F6ECD9 1px, transparent 1px); background-size: 26px 26px;"
				></div>
				<div class="relative space-y-6">
					<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
						Next clinic
					</p>
					<p class="text-3xl font-semibold leading-tight text-white sm:text-4xl">
						{formatClinicDate(next)}
					</p>

					<div class="space-y-3 border-t border-dci-cream/15 pt-5 text-sm">
						<p class="flex items-center gap-2.5 text-dci-cream/85">
							<Clock class="size-4 shrink-0" weight="regular" />
							{CLINIC_START} to {CLINIC_END}
						</p>
						<p class="flex items-start gap-2.5 text-dci-cream/85">
							<MapPin class="mt-0.5 size-4 shrink-0" weight="regular" />
							{CLINIC_VENUE}
						</p>
					</div>

					<div class="border-t border-dci-cream/15 pt-5">
						<p class="text-3xl font-bold text-white">{price}</p>
						<p class="mt-1 text-sm text-dci-cream/70">Per seat, includes the session.</p>
					</div>

					<Button
						href="/checkout/clinic"
						size="lg"
						class="w-full rounded-full bg-dci-cream text-dci-teal-deep hover:bg-white"
					>
						Book your seat
					</Button>
					<p class="text-center text-xs text-dci-cream/60">
						Pay by Mobile Money or card. Seats are limited.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<Section tone="cream">
	<SectionHeading
		eyebrow="What actually happens"
		title="Ninety minutes of your month."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each howItWorks as step, index}
			{@const Icon = step.icon}
			<div
				use:reveal={{ delay: index * 80, y: 22 }}
				class="rounded-[2rem] border border-dci-teal/12 bg-dci-paper p-7"
			>
				<span
					class="flex size-11 items-center justify-center rounded-xl bg-dci-teal/10 text-dci-teal"
				>
					<Icon class="size-5" weight="duotone" />
				</span>
				<h3 class="mt-5 text-xl font-semibold leading-tight text-slate-950">{step.title}</h3>
				<p class="mt-3 text-sm leading-relaxed text-slate-700">{step.body}</p>
			</div>
		{/each}
	</div>
</Section>
<Section tone="cream">
	<SectionHeading
		eyebrow="Attend a clinic"
		title="Every clinic left this year."
		class="mb-10"
	/>
	<div class="space-y-3">
		{#each dates as date, index}
			<article
				use:reveal={{ delay: index * 60, y: 18 }}
				class={`grid gap-4 rounded-[2rem] border p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6 ${
					index === 0
						? 'border-dci-teal/25 bg-dci-paper shadow-dci-lift'
						: 'border-dci-teal/12 bg-dci-cream'
				}`}
			>
				<div
					class="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-dci-teal-deep text-dci-cream"
				>
					<span class="text-[0.65rem] font-bold uppercase tracking-wide">
						{date.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })}
					</span>
					<span class="text-2xl font-semibold leading-none">{date.getUTCDate()}</span>
				</div>

				<div class="min-w-0">
					<p class="text-lg font-semibold leading-tight text-slate-950">
						{formatClinicDate(date)}
						{#if index === 0}
							<span
								class="ml-2 rounded-full bg-dci-teal/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-dci-teal"
							>Next</span
						>
						{/if}
					</p>
					<p class="mt-1 text-sm text-slate-600">
						{CLINIC_START} to {CLINIC_END} · {CLINIC_VENUE}
					</p>
					<p class="mt-1 text-sm text-slate-600">
						{price} · earns 1 Connection Mile, issued when you check in on the day.
					</p>
				</div>

				<Button
					href={`/checkout/clinic?date=${clinicKey(date)}`}
					class="w-full shrink-0 rounded-full sm:w-auto"
				>
					Book this date
				</Button>
			</article>
		{/each}
	</div>
	<p class="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
		Conversation Clinics are peer-led. They are not therapy and do not replace care from a
		professional.
	</p>
	<p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
		Bringing a group, or want a clinic hosted at your school, workplace, or venue?
		<a
			href="/contact?topic=Community%20clinic%20or%20event"
			class="font-semibold text-dci-teal underline underline-offset-4">Talk to us about hosting one.</a
		>
	</p>
</Section>

<Section>
	<div
		use:reveal={{ delay: 0, y: 22 }}
		class="grid gap-8 rounded-[2rem] border border-dci-teal/12 bg-dci-cream p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
	>
		<div>
			<h2 class="text-3xl font-semibold leading-tight tracking-tight text-slate-950">
				Take the conversation home.
			</h2>
			<p class="mt-3 max-w-xl text-base leading-relaxed text-slate-700">
				The card game on the table at every clinic is the same one you can take home. Most people
				meet it here first, then keep using it with the people they live with.
			</p>
		</div>
		<Button href="/toolkit#toolkit-products" size="lg" class="shrink-0 rounded-full px-7">
			See the toolkit
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	</div>
</Section>
