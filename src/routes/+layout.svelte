<script context="module">
	import '../app.css'
	import '../component.css'
	import stateMachine from '../xstate/stateMachine'
	import '../xstate/inspector'

	import Scene from '$lib/3d/Scene.svelte'
	import { Canvas } from '@threlte/core'
	import { debounce } from '$lib/utils'

	import Avatar from '$lib/ui/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/material-symbols/circle-outline'
	import BotsIcon from '~icons/material-symbols/square-outline-rounded'
	import GroupsIcon from '~icons/tabler/circle-square'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'
	import LoginIcon from '~icons/ri/login-circle-line'

	const routeRoot = stateMachine.children.get('route-root')
	const display = stateMachine.children.get('display')
	const layoutCanvas = stateMachine.children.get('canvas')
</script>

<script lang="ts">
	const sideBarLeft = $routeRoot.children['sideBar-left']
	const sideBarRight = $routeRoot.children['sideBar-right']
	const auth = $routeRoot.children['auth']

	sideBarLeft?.send('OPEN')
	sideBarRight?.send('OPEN')

	$: console.log($auth.value)
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
	<div class="fixed inset-y-0 left-0 flex-row z-{$sideBarLeft.context.zIndex}">
		<nav class="flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900">
			<div>
				<a
					href={'/'}
					data-active={$routeRoot.matches({ page: 'root' })}
					class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
				>
					<BotikIcon />
				</a>
				<a
					href={'humans'}
					data-active={$routeRoot.matches({ page: 'humans' })}
					class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
				>
					<HumansIcon />
				</a>
				<a
					href={'bots'}
					data-active={$routeRoot.matches({ page: 'bots' })}
					class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
				>
					<BotsIcon />
				</a>
				<a
					href={'groups'}
					data-active={$routeRoot.matches({ page: 'groups' })}
					class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
				>
					<GroupsIcon />
				</a>
			</div>
			<div>
				{#if $auth.matches('authorized')}
					<a
						href={'profile'}
						data-active={$routeRoot.matches({ page: 'profile' })}
						class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
					>
						<Avatar src={zavx0z} alt="zavx0z" />
					</a>
				{:else if $auth.matches('unauthorized')}
					<a
						href={'auth/login'}
						data-active={$routeRoot.matches({ page: 'auth' })}
						class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
					>
						<LoginIcon />
					</a>
				{/if}
				<span>
					<a
						href={'settings'}
						data-active={$routeRoot.matches({ page: 'settings' })}
						class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
					>
						<SettingsIcon />
					</a>
				</span>
				<button
					data-active={$routeRoot.matches({ page: '' })}
					class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
					on:click={console.log}
				>
					<SidebarCloseIcon />
				</button>
			</div>
		</nav>
	</div>
	<div
		class="fixed inset-y-0 left-12 w-80 flex-row z-{$sideBarLeft.context.zIndex} bg-surface-800/90 backdrop-blur-sm"
	/>
{/if}
<slot />
{#if $sideBarRight.matches('opened')}
	{@const activity = $sideBarRight.children['sideBar-left-activity']}
	<div class="fixed right-0 top-0 flex h-full flex-row z-{$sideBarRight.context.zIndex}" />
	<div
		class="fixed inset-y-0 right-12 w-80 flex-row z-{$sideBarRight.context.zIndex} bg-surface-800/90 backdrop-blur-sm"
	/>
{/if}
