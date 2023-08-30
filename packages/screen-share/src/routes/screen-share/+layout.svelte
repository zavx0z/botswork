<script lang="ts">
	import type { LayoutData } from './$types'
	import callSound from './callSound.mp3'
	import { ButtonCall, ButtonCallEnd } from 'ui/call'
	export let data: LayoutData
	let { mediaDeviceMachine, useMediaDeviceMachine } = data

	let realtime: { [key: string]: any } = {}
	let called = false
	// called = true
	let audioElement: HTMLAudioElement

	$: called && audioElement?.play().catch((error) => console.log(error))
</script>

{#if called}
	<div class="bg-surface-900/40 fixed inset-0 z-50 flex flex-col items-center justify-around gap-4 backdrop-blur-3xl">
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-primary-500 text-4xl">Хто-то звонит!</h1>
			<h1 class="text-primary-500 text-4xl">Возьми ска трубку!</h1>
			<h1 class="text-primary-500 text-4xl">
				Катя уже <strong class="text-error-500 animate-ping text-8xl">бесится</strong>!!!
			</h1>
		</div>
		<div class="flex gap-6">
			<ButtonCallEnd
				on:click={() => {
					audioElement.pause()
					audioElement.currentTime = 0
					called = false
				}}
			/>
			<ButtonCall
				on:click={() => {
					called = false
					audioElement.pause()
					audioElement.currentTime = 0
					mediaDeviceMachine?.send('SELECT_SOURCE')
				}}
			/>
		</div>
	</div>
{/if}

<div class="flex flex-col">
	{#each Object.keys(realtime) as i}
		{@const item = realtime[i][0]}
		<p class="text-secondary-400">{item.screen}: {item.email}</p>
	{/each}
</div>
<audio bind:this={audioElement} loop src={callSound} />
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
<slot />
