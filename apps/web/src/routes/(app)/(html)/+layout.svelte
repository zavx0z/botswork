<script lang="ts">
	import { page } from '$app/stores'
	import { Button, ProfileButton } from 'ui/activity'
	import { BotsIcon, BotikIcon, GroupsIcon, HumansIcon, SettingsIcon, SidebarCloseIcon } from 'icons'

	import stateMachine from '../../../xstate/stateMachine'
	import { Activity } from 'ui/activity'

	const routeRoot = stateMachine.children.get('route-root')
	const layoutCanvas = stateMachine.children.get('canvas')

	export let data

	let { session } = data
	$: ({ session } = data)

	const sideBarLeft = $routeRoot.children['sideBar-left']
	const sideBarRight = $routeRoot.children['sideBar-right']

	sideBarLeft?.send('OPEN')
	sideBarRight?.send('OPEN')
</script>

{#if $sideBarLeft.matches('opened')}
	<Activity>
		<div>
			<Button href="/" active={$page.url.pathname === '/'}>
				<BotikIcon />
			</Button>
			<Button href="humans" active={$page.url.pathname.includes('humans')}>
				<HumansIcon />
			</Button>
			<Button href="bots" active={$page.url.pathname.includes('bots')}>
				<BotsIcon />
			</Button>
			<Button href="groups" active={$page.url.pathname.includes('groups')}>
				<GroupsIcon />
			</Button>
		</div>
		<div>
			<ProfileButton
				session={Boolean(session)}
				profileHref="profile"
				profileActive={$page.url.pathname.includes('profile')}
				loginHref="login"
				src={session?.user.user_metadata.avatar_url}
				alt={session?.user.user_metadata.name}
			/>
			<Button href="settings" active={$page.url.pathname.includes('settings')}>
				<SettingsIcon />
			</Button>
			<Button on:click={console.log}>
				<SidebarCloseIcon />
			</Button>
		</div>
	</Activity>
{/if}
<slot />
