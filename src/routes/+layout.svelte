<script lang="ts">
	import { map } from 'rxjs/operators'
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
	import machine from '../xstate/machine'
	import { useMachine } from '@xstate/svelte'
	import { fromEvent, debounceTime, merge } from 'rxjs'

	export let data: PageData
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	const { state, send } = useMachine(machine, { devTools: true })
	state.subscribe((e) => {
		if (e.changed) console.log(e.event.payload, e.value)
	})
	onMount(() => {
		send({ type: 'detect', payload: { width: window.innerWidth, height: window.innerHeight } })

		// Функция для обработки событий изменения размера окна и изменения ориентации дисплея
		function handleWindowResizeOrOrientationChange() {
			const payload = {
				width: window.innerWidth,
				height: window.innerHeight,
				orientation: window.screen.orientation.type
			}
			send({ type: 'detect', payload })
		}

		// Отслеживание событий изменения размера окна
		const windowResize$ = fromEvent(window, 'resize').pipe(debounceTime(200))

		// Отслеживание событий изменения ориентации дисплея
		const orientationChange$ = fromEvent(window, 'orientationchange').pipe(debounceTime(200))

		// Объединение потоков событий
		const merged$ = merge(windowResize$, orientationChange$)

		// Подписываемся на объединенный поток событий и вызываем обработчик
		const observer = merged$.subscribe(handleWindowResizeOrOrientationChange)

		// const observer = fromEvent(window, 'resize')
		// 	.pipe(debounceTime(200))
		// 	.subscribe(() => send({ type: 'detect', payload: { width: window.innerWidth, height: window.innerHeight } }))

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return () => {
			// observer.unsubscribe()
			subscription.unsubscribe()
		}
	})
	let z3d = 20
	const zSidebar = 30
</script>

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
