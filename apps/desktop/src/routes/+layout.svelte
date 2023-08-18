<script lang="ts">
	import { onMount } from 'svelte'

	import { goto, invalidate } from '$app/navigation'
	import type { LayoutData } from './$types'

	import "svelte-ripple-action/ripple.css"

	export let data: LayoutData
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const supabaseAuth = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
				goto('/')
			}
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
</script>

<slot />
