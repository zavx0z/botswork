<script lang="ts">
	import '../xstate/inspector'
	import '../app.css'
	import '../component.css'
	import Scene from '$lib/3d/Scene.svelte'
	import { Canvas } from '@threlte/core'
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import type { PageData } from './$types'
	import Left from '$lib/dash/Left.svelte'
	import Right from '$lib/dash/Right.svelte'
	import { debounce } from '$lib/utils'
	import stateMachine from '../xstate/stateMachine/stateMachine'
	export let data: PageData
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	onMount(() => {
		const supabaseAuth = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
	const display = stateMachine.children.get('display')
	const layoutCanvas = stateMachine.children.get('canvas')
	const layoutHtml = stateMachine.children.get('html')
</script>

<svelte:window
	on:orientationchange={() => display?.send('rotate')}
	on:resize={debounce(() => display?.send({ type: 'resize' }), 200)}
/>
<div class="fixed inset-0 h-[calc(100dvh)] w-screen z-{$layoutCanvas.value.zIndex} overscroll-none">
	<Canvas>
		<Scene />
	</Canvas>
</div>
<div class="fixed inset-y-0 left-0 flex-row z-{$layoutHtml.value.zIndex}">
	<Left />
</div>
<div class="fixed inset-y-0 left-12 w-80 flex-row z-{$layoutHtml.value.zIndex} bg-surface-800/90 backdrop-blur-sm" />
<slot />
<div class="fixed inset-y-0 right-12 w-80 flex-row z-{$layoutHtml.value.zIndex} bg-surface-800/90 backdrop-blur-sm" />
<div class="fixed right-0 top-0 flex h-full flex-row z-{$layoutHtml.value.zIndex} ">
	<Right />
</div>
