<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData
	export let redirect = '/auth/login'
	const handleSignOut: SubmitFunction = async ({ cancel }) => {
		console.log('[auth]', 'logout')
		const { error } = await data.supabase.auth.signOut()
		if (error) console.log(error)
		cancel()
		goto(redirect)
	}
</script>

<svelte:head>
	<title>BotsWork | Выход</title>
</svelte:head>
<form action="?/logout" method="POST" use:enhance={handleSignOut}>
	<button
		use:ripple
		type="submit"
		class="bg-surface-700 text-primary-200 inline-flex h-8 items-center justify-center rounded-[4px] px-4 font-medium leading-none"
	>
		Выйти из профиля
	</button>
</form>
