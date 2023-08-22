<script lang="ts">
	import 'config/styles/tailwindCSS'
	import 'config/styles/componentCSS'
	import 'svelte-ripple-action/ripple.css'
	import AuthStateChange from './AuthStateChange.svelte'
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<svelte:head>
	<title>авторизация</title>
</svelte:head>
<AuthStateChange {data}>
	<slot />
</AuthStateChange>
