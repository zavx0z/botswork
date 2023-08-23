<script lang="ts">
	import { ripple } from 'svelte-ripple-action'
	import { enhance } from '$app/forms'
	import { Email, Password } from 'ui/input'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let email = ''
	export let password = ''
	export let handleSignIn: SubmitFunction
	export let handleSignInOAuth: SubmitFunction
</script>

<svelte:head>
	<title>BotsWork | Вход</title>
</svelte:head>
<div class="flex h-full flex-col justify-between">
	<form action="?/login" method="POST" use:enhance={handleSignIn}>
		<Email bind:email />
		<Password bind:password />
		<button
			use:ripple
			title="войти"
			type="submit"
			class="bg-primary-500 text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 w-full rounded px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
		>
			Войти
		</button>
	</form>
	<form method="POST" class="flex justify-center gap-4" use:enhance={handleSignInOAuth}>
		<button
			use:ripple
			type="submit"
			title="GitHub"
			formaction="?/login&provider=github"
			class="border-tertiary-500 text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 rounded border px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
		>
			github
		</button>
		<button
			use:ripple
			type="submit"
			title="Google"
			formaction="?/login&provider=google"
			class="border-tertiary-500 text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 rounded border px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
		>
			google
		</button>
	</form>
</div>
