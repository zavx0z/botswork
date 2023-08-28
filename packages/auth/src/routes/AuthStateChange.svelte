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
		const supabaseAuth = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				console.log('[auth]', 'change state', event)
				invalidate('supabase:auth')
			}
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
</script>

<slot />
