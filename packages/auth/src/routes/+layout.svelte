<script lang="ts">
	import 'config/styles/tailwindCSS'
	import 'config/styles/componentCSS'
	import 'svelte-ripple-action/ripple.css'
	import { Toaster } from 'svelte-french-toast'
	import toast from 'svelte-french-toast'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	const { auth } = data
	auth.subscribe((state) => {
		if (state.changed) {
			if (state.context.error) {
				toast.error(state.context.error)
			}
		}
	})
</script>

<svelte:head>
	<title>авторизация</title>
</svelte:head>
<slot />
<Toaster />
