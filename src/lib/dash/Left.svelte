<script>
	import { page } from '$app/stores'
	import Avatar from '$lib/ui/components/Avatar.svelte'
	import zavx0z from '$lib/assets/img/zavx0z.jpg'
	import BotikIcon from '~icons/botswork/botik'
	import HumansIcon from '~icons/botswork/humans'
	import BotsIcon from '~icons/botswork/bots'
	import GroupsIcon from '~icons/botswork/groups'
	import SidebarCloseIcon from '~icons/lucide/sidebar-close'
	import SettingsIcon from '~icons/fluent/settings-32-regular'
	import stateMachine from '../../xstate/stateMachine'

	const sideBarLeft = stateMachine.children.get('sideBarLeft')
	// console.log(sideBarLeft)

	const topLinks = [
		{ icon: BotikIcon, path: '/' },
		{ icon: HumansIcon, path: 'humans' },
		{ icon: BotsIcon, path: 'bots' },
		{ icon: GroupsIcon, path: 'groups' }
	]
	const bottomLinks = [
		{ icon: Avatar, path: '/auth', props: { alt: 'zavx0z', src: zavx0z } },
		{ icon: SettingsIcon, path: '/settings', props: { class: 'h-6 w-6' } },
		{ icon: SidebarCloseIcon, path: ' ', props: { class: 'h-6 w-6' } }
	]
</script>
<nav class='flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900'>
	<div>
		{#each topLinks as link (link.path)}
			<a
				href={link.path}
				data-active={link.path === '/' ? $page.route.id === '/' : $page.route.id?.includes(link.path)}
				class='grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500'
			>
				<svelte:component this={link.icon} />
			</a>
		{/each}
	</div>
	<div>
		{#each bottomLinks as link (link.path)}
			<a
				href={link.path}
				data-active={link.path === '/' ? $page.route.id === '/' : $page.route.id?.includes(link.path)}
				class='grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500'
			>
				<svelte:component this={link.icon} {...link.props} />
			</a>
		{/each}
	</div>
</nav>