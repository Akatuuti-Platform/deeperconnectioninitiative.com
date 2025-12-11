<script>
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

<section id="toolkit" class="w-full py-16 sm:py-20 lg:py-24 bg-cream border-t border-border/30">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
		<div class="max-w-3xl space-y-3">
			<p class="text-xs font-medium uppercase tracking-tight text-primary">
				THE DEEPER CONNECTION TOOLKIT
			</p>
			<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-balance">
				Physical, low-tech mental health tools
			</h2>
			<p class="text-base sm:text-lg font-normal leading-relaxed text-foreground/80 text-pretty">
				Designed to spark reflection, emotional awareness, and healthy conversation — no internet
				required.
			</p>
		</div>

		<!-- Individual products -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each products as product, index}
				<figure
					class="border border-border/40 rounded-2xl p-6 bg-off-white space-y-4 hover:shadow-md transition-shadow"
				>
					<div class="w-full h-40 bg-primary/5 rounded-lg flex items-center justify-center">
						<div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
							<svg
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
							</svg>
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
						</div>
					</div>
					<div class="flex flex-col gap-3">
						<div>
							<h3 class="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
							<p class="text-sm leading-relaxed text-foreground/70 mb-3">{product.description}</p>
							<p class="text-lg font-semibold text-primary mb-3">{product.price}</p>
						</div>
						<a
							href={product.paymentLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium transition-colors"
						>
							Buy Now
						</a>
					</div>
				</figure>
			{/each}
		</div>

		<!-- Complete kit -->
		<div class="bg-primary/5 rounded-2xl p-8 md:p-10 border border-primary/20">
			<h3 class="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">
				THE DCI MENTAL HEALTH TOOLKIT (3-IN-1)
			</h3>
			<div class="space-y-4 mb-8 text-foreground/70 text-base leading-relaxed">
				<p>
					<strong class="font-semibold text-foreground">DCI Card Game</strong> - A powerful tool for self-awareness
					and shared learning, helping people uncover the 'why' behind their choices
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

			<div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
				<div class="text-3xl font-bold text-foreground">200,000 UGX</div>
				<div class="flex flex-col sm:flex-row gap-3">
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
			</div>
		</div>
	</div>
</section>

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
