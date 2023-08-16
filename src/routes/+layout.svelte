<script lang="ts">
	import { debounce } from '$lib/utils'
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import '../xstate/inspector'
	import stateMachine from '../xstate/stateMachine'
	const display = stateMachine.children.get('display')

	export let data
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	onMount(() => {
		const supabaseAuth = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) invalidate('supabase:auth')
		})
		return supabaseAuth.data.subscription.unsubscribe
	})
</script>

<svelte:window
	on:orientationchange={() => display?.send('rotate')}
	on:resize={debounce(() => display?.send({ type: 'resize' }), 200)}
/>
<slot />
