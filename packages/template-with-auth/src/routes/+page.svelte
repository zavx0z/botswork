<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	let { session } = data
	$: ({ session } = data)
</script>

<h1 class="text-primary-400 m-4 text-center text-4xl">Шаблон с авторизацией</h1>
{#if Boolean(session)}
	<p class="text-secondary-400 text-center font-bold">Авторизован: {session.user.user_metadata.full_name}</p>
	<p class="text-secondary-400 text-center font-bold">{session.user.user_metadata.email}</p>
	<p class="text-secondary-400 text-center">аккаунт: {session.user.app_metadata.provider}</p>
{:else}
	<a class="text-primary-500 underline" href="/auth/login">Авторизация</a>
{/if}
<div class="flex h-screen w-full flex-col items-center justify-center gap-2 text-2xl">
	<a class="text-primary-500 underline" href=" ">Пакетное приложение</a>
</div>
