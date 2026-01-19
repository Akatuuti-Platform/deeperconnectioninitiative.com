<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';

	const products = [
		{
			name: 'DCI Card Game',
            image: 'https://res.cloudinary.com/dywd7jbbl/image/upload/v1716585371/Other/it_othe9w.jpg',
			description:
				'Conversation cards that gently open discussions around emotions, relationships, stress, identity, and personal experiences.',
			price: '69,000 UGX',
			paymentLink: paymentLinks.cardGame
		},
		{
			name: 'DCI Reflection Journal',
            image: 'https://res.cloudinary.com/dywd7jbbl/image/upload/v1716584375/Other/csps_dgkayq.png',
			description:
				'A guided journal that supports self-reflection, emotional processing, and personal growth without requiring advanced literacy.',
			price: '120,000 UGX',
			paymentLink: paymentLinks.journal
		},
		{
			name: 'DCI Mood Tracker',
            image: 'https://res.cloudinary.com/dywd7jbbl/image/upload/v1716585253/Other/awf_ne3sdj.jpg',
			description:
				'A simple tool that helps users recognise emotional patterns over time — especially useful where mental health language is limited.',
			price: '31,000 UGX',
			paymentLink: paymentLinks.moodTracker
		}
	];
</script>

<section id="toolkit" class="  text-slate-900 max-w-6xl mx-auto px-6 py-20 space-y-16">
	<!-- Header -->
	<header class="max-w-3xl space-y-4">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-[#2A6268]/20 bg-[#2A6268]/5 px-3 py-1"
		>
			<span class="text-xs font-semibold tracking-wide text-[#2A6268] uppercase"
				>The Deeper Connection Toolkit</span
			>
		</div>
		<h2 class="text-3xl font-semibold">Physical, low‑tech mental health tools</h2>
		<p class="text-lg text-slate-600">
			Designed to spark reflection, emotional awareness, and healthy conversation — no internet
			required.
		</p>
	</header>

	<!-- Product Layout (Editorial / Product‑forward) -->
	<div class="space-y-20">
		<!-- Product Row -->
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div
				class="h-72 rounded-3xl bg-linear-to-br from-[#6F231E]/15 to-[#6F231E]/5 flex items-center justify-center"
			>
				<span class="text-sm uppercase tracking-widest text-[#6F231E]/70">Conversation Cards</span>
			</div>
			<div class="space-y-5">
				<h3 class="text-2xl font-semibold">DCI Card Game</h3>
				<p class="text-base leading-relaxed text-slate-600 max-w-md">
					A gentle way to open conversations around emotions, relationships, identity, and lived
					experience — without pressure or judgment.
				</p>
				<div class="flex items-center gap-6">
					<p class="text-xl font-semibold text-[#6F231E]">69,000 UGX</p>
					<Button
						href={paymentLinks.cardGame}
						class="  px-6 py-3 text-sm font-medium text-white hover:bg-accent">Get this tool</Button
					>
				</div>
			</div>
		</div>

		<!-- Product Row (reversed) -->
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div
				class="md:order-2 h-72 rounded-3xl bg-linear-to-br from-[#2A6268]/15 to-[#2A6268]/5 flex items-center justify-center"
			>
				<span class="text-sm uppercase tracking-widest text-[#2A6268]/70">Guided Reflection</span>
			</div>
			<div class="md:order-1 space-y-5">
				<h3 class="text-2xl font-semibold">DCI Reflection Journal</h3>
				<p class="text-base leading-relaxed text-slate-600 max-w-md">
					A guided journal designed to support reflection, emotional processing, and clarity — even
					for people who don’t usually write.
				</p>
				<div class="flex items-center gap-6">
					<p class="text-xl font-semibold text-[#6F231E]">120,000 UGX</p>
					<Button
						href={paymentLinks.journal}
						class="  px-6 py-3 text-sm font-medium text-white hover:bg-accent">Get this tool</Button
					>
				</div>
			</div>
		</div>

		<!-- Product Row -->
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div
				class="h-72 rounded-3xl bg-linear-to-br from-slate-400/20 to-slate-300/10 flex items-center justify-center"
			>
				<span class="text-sm uppercase tracking-widest text-slate-500">Daily Awareness</span>
			</div>
			<div class="space-y-5">
				<h3 class="text-2xl font-semibold">DCI Mood Tracker</h3>
				<p class="text-base leading-relaxed text-slate-600 max-w-md">
					A simple daily tool that helps people notice emotional patterns over time, especially
					where mental health language is limited.
				</p>
				<div class="flex items-center gap-6">
					<p class="text-xl font-semibold text-[#6F231E]">31,000 UGX</p>
					<Button
						href={paymentLinks.moodTracker}
						class="  px-6 py-3 text-sm font-medium text-white hover:bg-accent">Get this tool</Button
					>
				</div>
			</div>
		</div>
	</div>
	<div class="lg:sticky lg:top-24 gsap-reveal">
		<div
			class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
		>
			<div class="absolute top-0 right-0 w-32 h-32 bg-[#6F231E]/5 rounded-full -mr-16 -mt-16"></div>
			<div class="relative z-10">
				<span class="text-xs font-bold text-[#6F231E] uppercase tracking-wide">Recommended</span>
				<h3 class="text-2xl font-bold text-slate-900 mt-2 mb-1">The Full Toolkit</h3>
				<p class="text-sm text-slate-500 mb-6">Card Game + Journal + Tracker + QR Access.</p>

				<div class="flex items-end gap-3 mb-6">
					<span class="text-4xl font-bold text-[#2A6268]">200k</span>
					<span class="text-xs text-slate-500 mb-2">UGX</span>
				</div>
				<div class="space-y-4 mb-8 text-foreground/70 text-base leading-relaxed">
					<p>
						<strong class="font-semibold text-foreground">DCI Card Game</strong> - A powerful tool for
						self-awareness and shared learning, helping people uncover the 'why' behind their choices
					</p>
					<p>
						<strong class="font-semibold text-foreground">DCI Journal</strong> - Structured self-reflection
						exercises designed for mindfulness and personal growth
					</p>
					<p>
						<strong class="font-semibold text-foreground">DCI Mood Tracker</strong> - Simple daily tool
						that builds emotional awareness and helps recognise mental health patterns
					</p>
					<p>
						<strong class="font-semibold text-foreground">Integrated QR Code System</strong> - Each toolkit
						component features embedded QR codes providing instant access to our digital resource library
					</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-3 items-center justify-center">
					<a href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer">
						<Button
							size="lg"
							class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
						>
							Buy Complete Kit
						</Button>
					</a>
					<a href={paymentLinks.donation} target="_blank" rel="noopener noreferrer">
						<Button
							size="lg"
							variant="outline"
							class="border-accent text-accent hover:bg-accent/10 rounded-full px-6 bg-transparent"
						>
							Sponsor a Kit
						</Button>
					</a>
				</div>
				<!-- <div class="flex ">
	<button class="w-full rounded-full bg-[#6F231E] py-4 text-sm font-bold text-white hover:bg-[#5a1b17] transition-colors mb-3">
                   Sponsor a Toolkit
                 </button>
                 <button class="w-full rounded-full border border-slate-300 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                   Buy a Toolkit
                 </button>
</div> -->

				<p class="text-[0.65rem] text-center text-slate-400 mt-4">
					10% funds community champion training.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- <svg
								class="w-10 h-10 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={1.5}
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg> -->
<!-- <div
								class="BookContainer w-[150px] h-[195px] m-[30px] flex items-center justify-center perspective-900"
							>
								<div
									class="Book w-[150px] h-[195px] relative preserve-3d rotate-y-30 transition-transform-075s"
								>
									<img
										src={product.image}
										alt="Book Cover"
										class="FrontCover w-full h-full absolute rounded-r rounded-l-[3px] shadow-sm"
									/>
									<div
										class="Pages bg-[#fff] h-[calc(195px-2*6px)] w-[37.5px] top-[3px] absolute page-transform"
									/>
									<div
										class="BackCover rounded-r bg-[#01060f] h-[195px] w-[150px] left-0 absolute back-cover-transform shadow-lg"
									/>
								</div>
							</div> -->

<style>

/* Background colors */
:global(.bg-cream) {
  background-color: #fefaf5;
}

:global(.bg-off-white) {
  background-color: #fafafa;
}

/* 3D Books */

.image-shadow {
  box-shadow: 5px 5px 20px #2e2e2e;
}

.back-cover-shadow {
  box-shadow: -10px 0 50px 10px #2e2e2e;
}

.perspective-900 {
  perspective: 900px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.transition-transform-075s {
  transition: transform 0.75s ease;
}

.rotate-y-30 {
  transform: rotateY(-30deg);
}

.Book:hover {
  transform: rotateY(0deg);
}

.content-empty {
  content: " ";
}

.page-transform {
  transform: translateX(calc(150px - 37.5px / 2 - 3px)) rotateY(90deg)
    translateX(18.75px);
}

.back-cover-transform {
  transform: translateZ(-37.5px);
}

.rotate-y-0 {
  transform: rotateY(0deg);
}

</style>
