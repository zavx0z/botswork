<script lang='ts'>
	import Logout from '$lib/Logout.svelte'

	export let data
	const { auth } = data
</script>

<svelte:head>
	<title>BotsWork | Выход</title>
</svelte:head>
<Logout {auth} redirectTo='/auth/login' />