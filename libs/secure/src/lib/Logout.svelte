<script lang='ts'>
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { InterpreterFrom } from 'xstate'
	// @ts-ignore
	import { AuthMachine } from '$lib/index'

	export let auth: InterpreterFrom<typeof AuthMachine>
	$: {
		if ($auth.hasTag('unauthorized')) goto(redirectTo)
	}
	export let redirectTo = ''
</script>
<form
	action='?/logout'
	method='POST'
	use:enhance={({ cancel }) => {
		auth.send('LOGOUT')
		cancel()
	}}
>
	<button
		type='submit'
		class='bg-surface-700 text-primary-200 inline-flex h-8 items-center justify-center rounded-[4px] px-4 font-medium leading-none'
	>
		Выйти из профиля
	</button>
</form>
