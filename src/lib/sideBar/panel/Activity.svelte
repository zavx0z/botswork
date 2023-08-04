<script>
	import ActivityButton from '$lib/sideBar/components/ActivityButton.svelte'
	import Avatar from '$lib/ui/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/material-symbols/circle-outline'
	import BotsIcon from '~icons/material-symbols/square-outline-rounded'
	import GroupsIcon from '~icons/tabler/circle-square'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'
	import { sendParent } from 'xstate'

	export let activity

	const topMap = new Map([
		['btn-home', { component: BotikIcon, path: '/' }],
		['btn-humans', { component: HumansIcon, path: 'humans' }],
		['btn-bots', { component: BotsIcon, path: 'bots' }],
		['btn-groups', { component: GroupsIcon, path: 'groups' }]
	])
	const bottomMap = new Map([
		['btn-profile', { component: Avatar, path: '/auth', props: { alt: 'zavx0z', src: zavx0z } }],
		['btn-settings', { component: SettingsIcon, path: '/settings' }],
		['btn-fold', { component: SidebarCloseIcon, onClick: ()=> sendParent('CLOSE') }]
	])
	activity.send({ type: 'UPDATE', buttons: [...topMap, ...bottomMap] })
	setTimeout(()=>{
	})
</script>

<nav class="flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900">
	<div>
		{#each topMap.keys() as key (key)}
			{@const item = { machine: $activity.context.buttons[key], item: topMap.get(key) }}
			<ActivityButton {item} />
		{/each}
	</div>
	<div>
		{#each bottomMap.keys() as key (key)}
			{@const item = { machine: $activity.context.buttons[key], item: bottomMap.get(key) }}
			<ActivityButton {item} />
		{/each}
	</div>
</nav>
