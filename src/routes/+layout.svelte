<script lang='ts'>
	import '../app.css'
	import '../component.css'
	import Scene from '$lib/3d/Scene.svelte'
	import { Canvas } from '@threlte/core'
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import type { PageData } from './$types'
	import Left from '$lib/dash/Left.svelte'
	import Right from '$lib/dash/Right.svelte'

	export let data: PageData
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return () => subscription.unsubscribe()
	})

	let z3d = 20
	const zSidebar = 30


</script>
<slot />
<div class='fixed h-[calc(100dvh)] w-screen inset-0 z-{z3d} overscroll-none'>
	<Canvas>
		<Scene />
	</Canvas>
</div>
<div class='fixed inset-y-0 left-0 flex-row z-{zSidebar}'>
	<Left />
</div>
<div class='fixed inset-y-0 w-80 left-12 flex-row z-{zSidebar} bg-surface-800/90 backdrop-blur-sm' />

<div class='fixed inset-y-0 w-80 right-12 flex-row z-{zSidebar} bg-surface-800/90 backdrop-blur-sm' />

<div class='fixed right-0 top-0 flex h-full flex-row z-{zSidebar} '>
	<Right />
</div>