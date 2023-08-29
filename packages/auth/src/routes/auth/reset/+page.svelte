<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import { UserName } from 'ui/input'

	export let data: any
	const { auth } = data

	let username = ''
</script>

<svelte:head>
	<title>BotsWork | Сброс пароля</title>
</svelte:head>
<form
	action="?/reset"
	method="POST"
	use:enhance={({ cancel }) => {
		cancel()
	}}
	class="flex h-full flex-col justify-between"
>
	<div class="flex h-full w-full flex-col justify-center">
		<UserName bind:username />
	</div>
	<button
		use:ripple
		title="сброс пароля"
		type="submit"
		class="bg-primary-500 text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 rounded px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
	>
		Сбросить пароль
	</button>
</form>
