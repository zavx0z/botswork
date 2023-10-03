<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
	const { auth } = data
</script>

<h1 class="text-primary-400 m-4 text-center text-4xl">screen-mirror</h1>
{#if $auth.hasTag('authorized')}
	<p class="text-secondary-400 text-center font-bold">Авторизован: {$auth.context.username}</p>
	<p class="text-secondary-400 text-center">id: {$auth.context.id}</p>
	<div class="flex h-screen w-full flex-col items-center justify-center gap-2 text-2xl">
		<a class="text-primary-500 underline" href="/screen-mirror">Пакетное приложение</a>
	</div>
{:else}
	<a class=" text-primary-500 block text-center underline" href="/auth/login">Авторизация</a>
{/if}
