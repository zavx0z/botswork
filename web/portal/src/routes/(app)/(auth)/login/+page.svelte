<script lang='ts'>

	import { Login } from '@lib/secure'

	export let data
	let { auth } = data
</script>

<svelte:head>
	<title>BotsWork | Вход</title>
</svelte:head>
<Login {auth} redirectTo='/' />