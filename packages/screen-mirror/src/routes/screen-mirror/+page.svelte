<script lang="ts">
	import type { PageData } from './$types'
	import type { Database } from 'db'
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { onMount } from 'svelte'

	export let data: PageData
	let { mediaDeviceMachine, useMediaDeviceMachine, session } = data

	const supabase: SupabaseClient<Database> = data.supabase
	let realtime: { [key: string]: any } = {}

	onMount(() => {
		const screenChannel = supabase.channel('screen')
		screenChannel
			.on('presence', { event: 'sync' }, () => {
				const newState = screenChannel.presenceState()
				realtime = newState
				console.log('sync', newState)
			})
			// .on('presence', { event: 'join' }, ({ key, newPresences }) => {
			// 	console.log('join', key, newPresences)
			// })
			// .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
			// 	// console.log('leave', key, leftPresences)
			// })
			.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					const presenceTrackStatus = await screenChannel.track({
						screen: 'share',
						email: session.user.email,
						online_at: new Date().toISOString()
					})
					// console.log(presenceTrackStatus)
				}
			})
		return () => screenChannel.unsubscribe()
	})
</script>

<div class="flex flex-col">
	{#each Object.keys(realtime) as i}
		{@const item = realtime[i][0]}
		<p class="text-secondary-400">{item.screen}: {item.email}</p>
	{/each}
	<button
		class={'bg-primary-500 text-surface-900 hover:bg-primary-200 m-2 w-48 rounded-sm p-2'}
		on:click={() => mediaDeviceMachine?.send('SELECT_SOURCE')}
	>
		Соединение
	</button>
</div>
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
