<script lang="ts">
	import 'config/styles/tailwindCSS'
	import 'config/styles/componentCSS'
	import 'svelte-ripple-action/ripple.css'
	import type { LayoutData } from './$types'
	import { Toaster } from 'svelte-french-toast'
	import { goto } from '$app/navigation'

</script>

<svelte:head>
	<title>авторизация</title>
</svelte:head>
<slot />
<Toaster />
