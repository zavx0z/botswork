<script lang="ts">
	import Avatar from '$lib/ui/components/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/material-symbols/circle-outline'
	import BotsIcon from '~icons/material-symbols/square-outline-rounded'
	import GroupsIcon from '~icons/tabler/circle-square'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'

	import '../xstate/inspector'
	import '../app.css'
	import '../component.css'
	import Scene from '$lib/3d/Scene.svelte'
	import { Canvas } from '@threlte/core'
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import type { PageData } from './$types'
	import Activity from '$lib/sideBar/panel/Activity.svelte'
	import Right from '$lib/sideBar/panel/Right.svelte'
	import { debounce } from '$lib/utils'
	import stateMachine from '../xstate/stateMachine'
	import linkMachine from '../xstate/linkMachine'
	import buttonMachine from '$lib/sideBar/components/buttonMachine'
	export let data: PageData
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	onMount(() => {
		const supabaseAuth = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
	// ========================================================
	const display = stateMachine.children.get('display')
	const layoutCanvas = stateMachine.children.get('canvas')
	const sideBarLeft = stateMachine.children.get('sideBar-left')
	sideBarLeft?.send({
		type: 'INIT',
		top: [
			linkMachine('navHome').withContext({ component: BotikIcon, path: '/' }),
			linkMachine('navHuman').withContext({ component: HumansIcon, path: 'humans' }),
			linkMachine('navBots').withContext({ component: BotsIcon, path: 'bots' }),
			linkMachine('navGroup').withContext({ component: GroupsIcon, path: 'groups' })
		],
		bottom: [
			linkMachine('navProfile').withContext({ component: Avatar, path: 'auth', props: { src: zavx0z } }),
			linkMachine('navSettings').withContext({ component: SettingsIcon, path: '/settings' }),
			buttonMachine('btnActivityFold')
				.withContext({ component: SidebarCloseIcon })
				.withConfig({ actions: { onClick: () => console.log() } })
		]
	})
	sideBarLeft?.send('OPEN')
	// $: console.log($sideBarLeft.children)
</script>

<svelte:window
	on:orientationchange={() => display?.send('rotate')}
	on:resize={debounce(() => display?.send({ type: 'resize' }), 200)}
/>
<div class="fixed inset-0 h-[calc(100dvh)] w-screen z-{0} overscroll-none">
	<Canvas>
		<Scene />
	</Canvas>
</div>
{#if $sideBarLeft.matches('opened')}
	{@const activity = $sideBarLeft.children['sideBar-left-activity']}
	{@const machine = (node) => activity.send({ type: 'UPDATE', node: node })}
	<div class="fixed inset-y-0 left-0 flex-row z-{$sideBarLeft.context.zIndex}">
		<nav class="flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900">
			<div>
				<a use:machine href={'/'} class="activity-link"> <BotikIcon /> </a>
				<a use:machine href={'humans'} class="activity-link"> <HumansIcon /> </a>
				<a use:machine href={'bots'} class="activity-link"> <BotsIcon /> </a>
				<a use:machine href={'groups'} class="activity-link"> <GroupsIcon /> </a>
			</div>
			<div>
				<a use:machine href={'bots'} class="activity-link"> <SettingsIcon /> </a>
			</div>
		</nav>
	</div>
	<div
		class="fixed inset-y-0 left-12 w-80 flex-row z-{$sideBarLeft.context.zIndex} bg-surface-800/90 backdrop-blur-sm"
	/>
{/if}
<slot />
<div class="fixed right-0 top-0 flex h-full flex-row z-{20} ">
	<Right />
</div>
<div class="fixed inset-y-0 right-12 w-80 flex-row z-{20} bg-surface-800/90 backdrop-blur-sm" />

<style lang="postcss">
	.activity-link {
		@apply grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700;
		&:hover {
			@apply text-primary-500;
		}
		&[data-state='active'] {
			@apply bg-surface-500 text-primary-500;
		}
	}
</style>
