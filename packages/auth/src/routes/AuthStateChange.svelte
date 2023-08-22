<script lang="ts">
	import { onMount } from 'svelte'
	import { goto, invalidate } from '$app/navigation'
	import type { LayoutData } from './$types'

	export let redirect: string | undefined = undefined
	export let data: LayoutData
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		if (!session && redirect) goto(redirect)
		const supabaseAuth = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
				if (redirect) goto(redirect)
			}
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
</script>

<slot />
