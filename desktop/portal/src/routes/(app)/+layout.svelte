<script lang='ts'>
	import { Activity, Button } from '@lib/ui/activity'
	import { BotikIcon } from '@lib/icons'
</script>

<Activity position='left'>
	<div>
		<Button active={true} href='/'>
			<BotikIcon />
		</Button>
	</div>
	<div>
		<!--		<ProfileButton-->
		<!--			session={Boolean(session)}-->
		<!--			profileHref='profile'-->
		<!--			profileActive={$page.url.pathname.includes('profile')}-->
		<!--			loginHref='login'-->
		<!--			src={session?.user.user_metadata.avatar_url}-->
		<!--			alt={session?.user.user_metadata.name}-->
		<!--		/>-->
	</div>
</Activity>
<slot />
