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
	import { useSelector } from '@xstate/svelte'
	import { debounce } from '$lib/utils'
	import stateMachine from '../xstate/stateMachine'
	export let data: PageData
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const supabaseAuth = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return supabaseAuth.data.subscription.unsubscribe
	})

	let z3d = 20
	const zSidebar = 30

	const display = useSelector(stateMachine, (state) => state.children.display)

	const width = useSelector($display, (state) => state.context.width)
	$:console.log($width)
	const height = useSelector($display, (state) => state.context.height)
	$:console.log($height)
	const size = useSelector($display, (state) => state.value.size)
	$:console.log($size)
	const orientation = useSelector($display, (state) => state.value.orientation)
	$:console.log($orientation)

</script>

<svelte:window
	on:resize={debounce(() => $display.send('resize'), 100)}
	on:orientationchange={() => $display.send('rotate')}
/>
<div class="fixed inset-0 h-[calc(100dvh)] w-screen z-{z3d} overscroll-none">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<div class="fixed inset-y-0 left-0 flex-row z-{zSidebar}">
	<Left />
</div>
<div class="fixed inset-y-0 left-12 w-80 flex-row z-{zSidebar} bg-surface-800/90 backdrop-blur-sm" />

<slot />

<div class="fixed inset-y-0 right-12 w-80 flex-row z-{zSidebar} bg-surface-800/90 backdrop-blur-sm" />
<div class="fixed right-0 top-0 flex h-full flex-row z-{zSidebar} ">
	<Right />
</div>
