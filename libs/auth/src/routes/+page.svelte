<script lang="ts">
    export let data
    const {auth} = data
</script>

<h1 class="text-primary-400 mt-4 text-center text-4xl">Авторизация</h1>
{#if $auth.hasTag('authorized')}
    <h2 class="text-secondary-500 mt-4 text-center">Авторизован: {$auth.context.username}</h2>
    <h2 class="text-secondary-500 text-center">ID пользователя: {$auth.context.id}</h2>
{:else}
    <h2 class="text-error-500 mt-4 text-center">Не авторизован</h2>
{/if}
<div class="flex h-full w-full flex-col items-center justify-center">
    <a class="text-primary-500 underline" href="auth/join">Регистрация</a>
    <a class="text-primary-500 underline" href="auth/login">Авторизация</a>
    <a class="text-primary-500 underline" href="auth/logout">Выход</a>
    <a class="text-primary-500 underline" href="profile">Профиль пользователя</a>
</div>
