<script lang="ts">
	import type { PageData } from './$types'
	import type { Database } from 'db'
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import { ClientJS } from 'clientjs'
	import { ButtonCallScreenShare } from 'ui/call'

	export let data: PageData
	let { useMediaDeviceMachine, session } = data

	const supabase: SupabaseClient<Database> = data.supabase
	interface Client {
		uuid: string
		presence_ref: string
		screen: 'mirror' | 'share'
		os: string
		online_at: string
		email: string
		browser: string
	}
	let realtime: Client[] = []
	let screenChannel = supabase.channel('roomScreen', {
		config: {
			broadcast: {
				self: false
			}
		}
	})
	onMount(() => {
		const client = new ClientJS()
		screenChannel
			.on('presence', { event: 'sync' }, () => {
				const newState = screenChannel.presenceState()
				let newRealtime: Client[] = []
				Object.keys(newState).forEach((item) => {
					const client = newState[item][0] as Client
					if (client.uuid !== session.user.id) {
						newRealtime.push(client)
					}
				})
				realtime = newRealtime
			})
			.on('broadcast', { event: 'call' }, (payload) => console.log(payload))
			.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					await screenChannel.track({
						uuid: session.user.id,
						screen: 'mirror',
						email: session.user.email,
						online_at: new Date().toISOString(),
						os: client.getOS(),
						browser: client.getBrowser()
					})
				}
			})
		return () => supabase.removeChannel(screenChannel)
	})
</script>

<div class="flex flex-col gap-2 p-2">
	{#each realtime as item (item.presence_ref)}
		<div class="bg-surface-700 flex w-96 flex-col rounded-md p-2">
			<p class="text-secondary-400"><span class="text-primary-500">{item.uuid}</span></p>
			<p class="text-secondary-400"><span class="text-primary-500">{item.screen}:</span> {item.email}</p>
			<p class="text-secondary-400"><span class="text-primary-500">Операционная система:</span> {item.os}</p>
			<p class="text-secondary-400"><span class="text-primary-500">Браузер:</span> {item.browser}</p>
			<ButtonCallScreenShare
				title={'Запросить экран'}
				size={'sm'}
				on:click={() =>
					screenChannel.send({
						type: 'broadcast',
						event: 'call',
						constraints: {
							called: session.user.id,
							audio: true,
							video: {
								type: 'screen'
							}
						}
					})}
			/>
		</div>
	{/each}
</div>
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
