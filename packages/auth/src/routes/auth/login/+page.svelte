<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit'
	import Login from './Login.svelte'
	import type { Provider } from '@supabase/supabase-js'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData
	let { supabase } = data
	$: ({ supabase } = data)

	let email = ''
	let password = ''
	let errorMessage = ''
	export let redirect = '/profile'

	const handleSignIn: SubmitFunction = async ({ cancel }) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) errorMessage = error.message
		console.log('[auth]', 'login/+page.svelte(Login)', data, error)
		cancel()
		// goto(redirect)
	}

	const handleSignInOAuth: SubmitFunction = async ({ cancel, submitter }) => {
		const attr = submitter?.getAttribute('formaction')
		cancel()
		if (attr) {
			const params = new URLSearchParams(attr)
			const provider: string | null = params.get('provider')
			if (provider) {
				const { data, error: err } = await supabase.auth.signInWithOAuth({
					provider: provider as Provider,
					options: {
						redirectTo: redirect
					}
				})
				console.log('[auth]', 'login/+page.svelte(OAuth)', data, err)
			}
		}
	}
</script>

<Login {handleSignIn} {handleSignInOAuth} bind:email bind:password />
