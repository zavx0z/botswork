<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData
	const { auth } = data

	$: {
		if ($auth.hasTag('unauthorized')) goto(redirect)
	}

	export let redirect = '/auth/login'
</script>

<svelte:head>
	<title>BotsWork | Выход</title>
</svelte:head>
<form
	action="?/logout"
	method="POST"
	use:enhance={({ cancel }) => {
		auth.send('LOGOUT')
		cancel()
	}}
>
	<button
		use:ripple
		type="submit"
		class="bg-surface-700 text-primary-200 inline-flex h-8 items-center justify-center rounded-[4px] px-4 font-medium leading-none"
	>
		Выйти из профиля
	</button>
</form>
