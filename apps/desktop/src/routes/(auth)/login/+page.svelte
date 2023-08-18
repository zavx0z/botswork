<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { PageData } from './$types'
	import InputPassword from '../InputPassword.svelte'
	import InputEmail from '../InputEmail.svelte'

	export let data: PageData
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''
	let errorMessage = ''
	const handleSignIn: SubmitFunction = async () => {
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			errorMessage = error.message
		}
		console.log(error?.name, error?.status, error?.message, error?.cause)
	}
</script>

<svelte:head>
	<title>BotsWork | Вход</title>
</svelte:head>
<div class="flex h-full flex-col justify-between">
	<form action="?/login" method="POST" use:enhance={handleSignIn}>
		<InputEmail bind:email />
		<InputPassword bind:password />
		<button
			use:ripple
			title="войти"
			type="submit"
			class="w-full rounded bg-primary-500 px-4 py-2 text-sm uppercase text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 focus-visible:outline-offset-4"
		>
			Войти
		</button>
	</form>
	<form method="POST" class="flex justify-center gap-4">
		<button
			use:ripple
			type="submit"
			title="GitHub"
			formaction="?/login&provider=github"
			class="rounded border border-tertiary-500 px-4 py-2 text-sm uppercase text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 focus-visible:outline-offset-4"
		>
			github
		</button>
		<button
			use:ripple
			type="submit"
			title="Google"
			formaction="?/login&provider=google"
			class="rounded border border-tertiary-500 px-4 py-2 text-sm uppercase text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 focus-visible:outline-offset-4"
		>
			google
		</button>
	</form>
</div>
