<script lang="ts">
	import displayMedia from '$lib/displayMedia'
	import stateMachine from '$lib/stateMachine'
	import { onMount } from 'svelte'

	const mouseEventPosition = (event: MouseEvent) => {
		console.log(event.x, event.y)
	}
	const keyboardEvent = (event: KeyboardEvent) => {
		console.log(event.type, event.key, event.code)
	}
	console.log($stateMachine.value)

	let video: HTMLVideoElement
	onMount(() => {
		stateMachine.send({ type: 'МОНТАЖ', videoElement: video })
	})
</script>

<svelte:window
	on:keyup|preventDefault={keyboardEvent}
	on:keydown|preventDefault={keyboardEvent}
	on:keypress|preventDefault={keyboardEvent}
	on:mousemove|preventDefault={mouseEventPosition}
/>
<video bind:this={video} autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
