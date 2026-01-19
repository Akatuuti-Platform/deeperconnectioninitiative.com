<script lang="ts">
	import { Button, buttonVariants } from '@/lib/components/ui/button';
    import type { PageProps } from './$types';
	import { cn } from '@/lib/utils';

    let { data }: PageProps = $props();
</script>

<section>
	<div class=" max-w-7xl mx-auto px-8 w-full 2xl:max-w-[100rem] py-24 lg:min-h-[calc(100dvh-4rem)]">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div class="rounded-3xl bg-primary p-8 lg:p-12">
				<span class="text-xs uppercase font-medium text-accent-200"> Contact Us </span>
				<h1
					class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-12 tracking-tigt font-display"
				>
					Get in touch
				</h1>
				<p class="text-base sm:text-lg md:text-xl text-accent-200 mt-4 text-balance">
					Have questions or need assistance? Fill out the form or reach out to us directly.
				</p>
				<div class="mt-8 space-y-4">
					<div>
						<h3 class="text-base font-medium text-white">Management Office</h3>
						<p class="text-sm text-accent-300 mt-2">
							123 Community Drive<br />
							Newport, CA 92660
						</p>
					</div>
					<div>
						<h3 class="text-base font-medium text-white">Contact Details</h3>
						<div class="mt-2 space-y-1">
							<p class="text-xs text-accent-300">
								<span class="font-medium text-white">Phone:</span> (555) 123-4567
							</p>
							<p class="text-xs text-accent-300">
								<span class="font-medium text-white">Email:</span> office@newport-hoa.com
							</p>
						</div>
					</div>
					<div>
						<h3 class="text-xs font-medium text-white">Office Hours</h3>
						<div class="mt-2 space-y-1">
							<p class="text-sm text-accent-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
							<p class="text-xs text-accent-300">Saturday - Sunday: Closed</p>
						</div>
					</div>
				</div>
			</div>
			<div class="rounded-3xl bg-accent-50 p-8 lg:p-12">
				<form class="mt-6">
					<input
						autocomplete="off"
						name="hidden"
						type="text"
						style="display: none"
						aria-hidden="true"
						tabindex="-1"
					/>
					<input type="hidden" name="_redirect" value="#" />

					<div class="space-y-6">
						<div
							class="overflow-hidden border-2 border-accent-900 shadow-lg divide-y-4 divide-accent-900 rounded-xl"
						>
							<div>
								<label for="name" class="sr-only">Your name</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="Your name"
									required
									class="block w-full px-3 py-4 text-xl text-accent-900 placeholder-black border-2 border-transparent border-accent-900 appearance-none focus:border-accent-900 focus:bg-accent-300 focus:outline-none focus:ring-black sm:text-sm"
								/>
							</div>

							<div>
								<label for="company" class="sr-only">Company name</label>
								<input
									id="company"
									name="company"
									type="text"
									placeholder="Company name"
									class="block w-full px-3 py-4 text-xl text-accent-900 placeholder-black border-2 border-transparent border-accent-900 appearance-none focus:border-accent-900 focus:bg-accent-300 focus:outline-none focus:ring-black sm:text-sm"
								/>
							</div>

							<div>
								<label for="email" class="sr-only">Email</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Email"
									required
									class="block w-full px-3 py-4 text-xl text-accent-900 placeholder-black border-2 border-transparent border-accent-900 appearance-none focus:border-accent-900 focus:bg-accent-300 focus:outline-none focus:ring-black sm:text-sm"
								/>
							</div>

							<div>
								<label for="details" class="sr-only">Project details</label>
								<textarea
									id="details"
									name="details"
									placeholder="What are you working on?"
									rows="4"
									class="block w-full px-3 py-4 text-xl text-accent-900 placeholder-black border-2 border-transparent border-accent-900 appearance-none focus:border-accent-900 focus:bg-accent-300 focus:outline-none focus:ring-black sm:text-sm"
								></textarea>
							</div>
						</div>

						<Button type="submit" class={cn('w-full mt-8', buttonVariants({ size: 'lg' }))}>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
