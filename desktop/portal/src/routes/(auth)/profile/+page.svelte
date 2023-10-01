<script lang='ts'>
	import { Logout } from '@module/secure'

	export let data
	const { auth } = data
</script>
<svelte:head>
	<title>BotsWork | Выход</title>
</svelte:head>
<div class='flex flex-col items-center'>
	<Logout {auth} redirectTo='/auth/login' />
</div>

