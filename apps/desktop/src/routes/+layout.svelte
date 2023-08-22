<script lang="ts">
	import 'config/styles/tailwindCSS'
	import 'config/styles/componentCSS'
	import 'svelte-ripple-action/ripple.css'

	import { onMount } from 'svelte'
	import { goto, invalidate } from '$app/navigation'
	import type { LayoutData } from './$types'

	import 'svelte-ripple-action/ripple.css'

	export let data: LayoutData
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		if (!session) goto('login')
		const supabaseAuth = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
				goto('login')
			}
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
</script>

<div class="h-1/2" />
<slot />
