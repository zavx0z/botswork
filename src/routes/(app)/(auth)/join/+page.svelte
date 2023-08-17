<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'
	import type { SubmitFunction } from '@sveltejs/kit'
	import InputPassword from '../InputPassword.svelte'
	import InputEmail from '../InputEmail.svelte'
	import { ripple } from 'svelte-ripple-action'

	export let data: PageData
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''
	let doublePassword = ''
	let visible = false

	const handleSignUp: SubmitFunction = async () => {
		if (password === doublePassword)
			await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`
				}
			})
	}
</script>

<form action="?/join" method="POST" use:enhance={handleSignUp} class="flex h-full flex-col justify-between">
	<div class="flex h-full w-full flex-col justify-center">
		<InputEmail bind:email />
		<InputPassword bind:password bind:visible />
		<input
			placeholder="повтор пароля"
			{...{ type: visible ? 'text' : 'password' }}
			name="password-double"
			bind:value={doublePassword}
			required
			class="mb-4"
		/>
	</div>
	<button
		use:ripple
		title="зарегистрироваться"
		type="submit"
		class="rounded bg-primary-500 px-4 py-2 text-sm uppercase text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 focus-visible:outline-offset-4"
	>
		Зарегистрироваться
	</button>
</form>
