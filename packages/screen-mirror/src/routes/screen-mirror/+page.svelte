<script lang="ts">
	import type { PageData } from './$types'
	// import { ClientJS } from 'clientjs'
	import { ButtonCallScreenShare } from 'ui/call'

	export let data: PageData
	let { useMediaDeviceMachine } = data

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
</script>

<div class="flex flex-col gap-2 p-2">
	{#each realtime as item (item.presence_ref)}
		<div class="bg-surface-700 flex w-96 flex-col rounded-md p-2">
			<p class="text-secondary-400"><span class="text-primary-500">{item.uuid}</span></p>
			<p class="text-secondary-400"><span class="text-primary-500">{item.screen}:</span> {item.email}</p>
			<p class="text-secondary-400"><span class="text-primary-500">Операционная система:</span> {item.os}</p>
			<p class="text-secondary-400"><span class="text-primary-500">Браузер:</span> {item.browser}</p>
			<ButtonCallScreenShare title={'Запросить экран'} size={'sm'} />
		</div>
	{/each}
</div>
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
	<track kind="captions" src="" />
</video>
