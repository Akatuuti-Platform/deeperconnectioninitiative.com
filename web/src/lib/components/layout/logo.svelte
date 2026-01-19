<script lang="ts" module>
    import logo from '$lib/assets/logo/horizontal.svg';
	import { cn } from '@/lib/utils';
	import type { HTMLImgAttributes } from 'svelte/elements';
    	export type LogoProps = {
       class?:HTMLImgAttributes["class"],
       isLink?: boolean
        }

</script>

<script  lang="ts">
    let {
        class:className,
        isLink = false
    }:LogoProps = $props();
</script>

{#if isLink}
	<a href="/">
		<img src={logo} alt="Deeper Connection Initiative" class={cn('w-32', className)} />
	</a>
{:else}
	<img src={logo} alt="Deeper Connection Initiative" class={cn('w-32', className)} />
{/if}
