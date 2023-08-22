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
	export let redirect = 'profile'

	const handleSignIn: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) errorMessage = error.message
		console.log(error?.name, error?.status, error?.message, error?.cause)
		cancel()
		goto(redirect)
	}

	const handleSignInOAuth: SubmitFunction = async ({ cancel, submitter }) => {
		const attr = submitter?.getAttribute('formaction')
		if (attr) {
			const params = new URLSearchParams(attr)
			const provider: string | null = params.get('provider')
			if (provider) {
				const { data, error: err } = await supabase.auth.signInWithOAuth({ provider: provider as Provider })
				console.log(data, err)
			}
		}
		cancel()
		goto(redirect)
	}
</script>

<Login {handleSignIn} {handleSignInOAuth} bind:email bind:password />
