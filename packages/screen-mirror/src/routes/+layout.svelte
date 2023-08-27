<script lang="ts">
	import 'config/styles'
	import type { LayoutData } from './$types'
	import { AuthStateChange } from 'auth'
	export let data: LayoutData
</script>

<svelte:head>
	<title>screen-mirror</title>
</svelte:head>
<AuthStateChange {data} redirect="/auth/login">
	<slot />
</AuthStateChange>
