<script lang="ts">
	import { debounce } from '$lib/utils'
	import '../xstate/inspector'
	import stateMachine from '../xstate/stateMachine'
	const display = stateMachine.children.get('display')
	import { AuthStateChange } from 'auth'
	import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<svelte:head>
	<title>BotsWork</title>
</svelte:head>
<svelte:window
	on:orientationchange={() => display?.send('rotate')}
	on:resize={debounce(() => display?.send({ type: 'resize' }), 200)}
/>
<AuthStateChange {data}>
	<slot />
</AuthStateChange>
