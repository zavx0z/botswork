<script>
	import ActivityButtons from "$lib/sideBar/components/ActivityButtons.svelte"
	import linkMachine from "../../../xstate/linkMachine"
	import buttonMachine from "../components/buttonMachine"

	import Avatar from '$lib/ui/components/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/material-symbols/circle-outline'
	import BotsIcon from '~icons/material-symbols/square-outline-rounded'
	import GroupsIcon from '~icons/tabler/circle-square'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'

	export let activity
	activity.send({
		type: 'UPDATE',
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
	const { top, bottom } = $activity.context
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
