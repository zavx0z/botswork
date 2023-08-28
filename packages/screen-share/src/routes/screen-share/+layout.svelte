<script lang="ts">
	import type { LayoutData } from './$types'
	import type { Database } from 'db'
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import { ClientJS } from 'clientjs'
	import callSound from './callSound.mp3'
	import { ButtonCall, ButtonCallEnd } from 'ui/call'
	export let data: LayoutData
	let { mediaDeviceMachine, useMediaDeviceMachine, session } = data
	const supabase: SupabaseClient<Database> = data.supabase

	let realtime: { [key: string]: any } = {}
	let called = false
	// called = true
	let audioElement: HTMLAudioElement

	onMount(() => {
		const screenChannel = supabase.channel('roomScreen')
		const client = new ClientJS()
		screenChannel
			.on('presence', { event: 'sync' }, () => {
				const newState = screenChannel.presenceState()
				realtime = newState
			})
			.on('broadcast', { event: 'call' }, (payload) => {
				called = true
				console.log(payload)
			})
			.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					const presenceTrackStatus = await screenChannel.track({
						uuid: session.user.id,
						screen: 'share',
						email: session.user.email,
						online_at: new Date().toISOString(),
						os: client.getOS(),
						browser: client.getBrowser()
					})
					// console.log(presenceTrackStatus)
				}
			})
		return () => supabase.removeChannel(screenChannel)
	})
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
