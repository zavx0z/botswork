<script lang='ts'>
	export let position: 'left' | 'right' = 'left'
</script>

<nav
	class='fixed inset-y-0 {position}-0 z-40 flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900'
>
	<slot />
</nav>
