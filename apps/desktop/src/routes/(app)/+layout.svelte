<script lang="ts">
	import { page } from '$app/stores'
	import { Activity, Button, ProfileButton } from 'ui/activity'
	import { BotikIcon } from 'icons'
	import type { LayoutData } from '../$types'

	export let data: LayoutData
	let { session } = data
	$: ({ supabase, session } = data)
</script>

<Activity position="left">
	<div>
		<Button active={true} href="/">
			<BotikIcon />
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
	</div>
</Activity>
<slot />
