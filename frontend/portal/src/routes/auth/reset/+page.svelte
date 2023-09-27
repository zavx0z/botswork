<script lang='ts'>
	import Reset from '$lib/Reset.svelte'

	export let data
	const { auth } = data
</script>

<svelte:head>
	<title>BotsWork | Сброс пароля</title>
</svelte:head>
<Reset {auth} />
