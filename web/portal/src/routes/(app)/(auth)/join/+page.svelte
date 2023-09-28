<script lang='ts'>
	import { Join } from '@lib/secure'

	export let data
	const { auth } = data
</script>
<svelte:head>
	<title>BotsWork | Регистрация</title>
</svelte:head>
<Join {auth} redirectTo='/profile' />