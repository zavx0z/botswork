<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
	const { mediaDeviceMachine, useMediaDeviceMachine } = data
</script>

<button
	class={'bg-primary-500 text-surface-900 hover:bg-primary-200 m-2 rounded-sm p-2'}
	on:click={() => mediaDeviceMachine?.send('SELECT_SOURCE')}
>
	Выбрать источник
</button>
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
