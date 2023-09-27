<script lang='ts'>
	import { enhance } from '$app/forms'
	import UserName from '$lib/ui/input/UserName.svelte'
	import type { InterpreterFrom } from 'xstate'
	// @ts-ignore
	import { AuthMachine } from '$lib/index'

	export let auth: InterpreterFrom<typeof AuthMachine>
	let username = ''
</script>
<form
	action='?/reset'
	method='POST'
	use:enhance={({ cancel }) => {
            auth.send('RESET')
            cancel()
    	}}
	class='flex h-full flex-col justify-between'
>
	<div class='flex h-full w-full flex-col justify-center'>
		<UserName bind:username />
	</div>
	<button
		title='сброс пароля'
		type='submit'
		class='bg-primary-500 text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 rounded px-4 py-2 text-sm uppercase focus-visible:outline-offset-4'
	>
		Сбросить пароль
	</button>
</form>
