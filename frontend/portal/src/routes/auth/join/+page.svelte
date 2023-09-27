<script lang='ts'>
	import Join from '@lib/secure/Join.svelte'

	export let data
	const { auth } = data
</script>
<svelte:head>
	<title>BotsWork | Регистрация</title>
</svelte:head>
<Join {auth} redirectTo='/profile' />