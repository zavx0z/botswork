<script>
	import Avatar from '$lib/ui/components/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/botswork/humans'
	import BotsIcon from '~icons/botswork/bots'
	import GroupsIcon from '~icons/botswork/groups'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'
	import stateMachine from '../../xstate/stateMachine'
	import buttonMachine from '../../xstate/buttonMachine'
	import linkMachine from '../../xstate/linkMachine'
	import ActivityButtons from './ActivityButtons.svelte'

	const sideBarLeft = stateMachine.children.get('sideBarLeft')
	sideBarLeft?.send({
		type: 'INIT',
		top: [
			linkMachine('navHome').withContext({ component: BotikIcon, path: '/' }),
			linkMachine('navHuman').withContext({ component: HumansIcon, path: 'humans' }),
			linkMachine('navBots').withContext({ component: BotsIcon, path: 'bots' }),
			linkMachine('navGroup').withContext({ component: GroupsIcon, path: 'groups' })
		],
		bottom: [
			linkMachine('linkProfile').withContext({ component: Avatar, path: 'auth', props: { src: zavx0z } }),
			linkMachine('linkSettings').withContext({ component: SettingsIcon, path: '/settings' }),
			buttonMachine('buttonActivityFold').withContext({ component: SidebarCloseIcon, onClick: () => console.log() })
		]
	})
	const { top, bottom } = $sideBarLeft.context
</script>

<nav class="flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900">
	<div>
		{#each top as button (button.id)}
			<ActivityButtons {button} />
		{/each}
	</div>
	<div>
		{#each bottom as button (button.id)}
			<ActivityButtons {button} />
		{/each}
	</div>
</nav>
