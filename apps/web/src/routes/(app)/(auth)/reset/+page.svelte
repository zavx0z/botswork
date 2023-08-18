<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { PageData } from './$types'
	import InputEmail from '../InputEmail.svelte'

	export let data: PageData
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''

	const resetPassword: SubmitFunction = async () => {
		const { error } = await supabase.auth.resetPasswordForEmail(email)
		console.log(error)
	}
</script>

<svelte:head>
	<title>BotsWork | Сброс пароля</title>
</svelte:head>
<form action="?/reset" method="POST" use:enhance={resetPassword} class="flex h-full flex-col justify-between">
	<div class="flex h-full w-full flex-col justify-center">
		<InputEmail bind:email />
	</div>
	<button
		use:ripple
		title="сброс пароля"
		type="submit"
		class="rounded bg-primary-500 px-4 py-2 text-sm uppercase text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 focus-visible:outline-offset-4"
	>
		Сбросить пароль
	</button>
</form>
