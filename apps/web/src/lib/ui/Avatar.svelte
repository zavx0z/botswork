<script lang="ts">
	import { createAvatar } from '@melt-ui/svelte'
	export let src = ''
	export let alt = 'avatar'
	const { image, fallback } = createAvatar({ src: src })
</script>

<div class="flex h-8 w-8 items-center justify-center rounded-3xl bg-surface-800">
	{#if src}
		<img melt={$image} {alt} class="h-full w-full rounded-[inherit]" />
	{/if}
	<span melt={$fallback} class="text-sm font-medium uppercase text-primary-500">
		{alt.slice(0, 2)}
	</span>
</div>
