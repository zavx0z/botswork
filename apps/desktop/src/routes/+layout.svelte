<script lang="ts">
	import 'config/styles/tailwindCSS'
	import 'config/styles/componentCSS'
	import 'svelte-ripple-action/ripple.css'
	import type { LayoutData } from './$types'
	import { AuthStateChange } from 'auth'
	export let data: LayoutData
</script>

<AuthStateChange {data}>
	<slot />
</AuthStateChange>
