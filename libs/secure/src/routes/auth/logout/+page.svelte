<script lang="ts">
    import {enhance} from '$app/forms'
    import {goto} from '$app/navigation'

    export let data
    const {auth} = data

    $: {
        if ($auth.hasTag('unauthorized')) goto(redirect)
    }

    export let redirect = '/auth/login'
</script>

<svelte:head>
    <title>BotsWork | Выход</title>
</svelte:head>
<form
        action="?/logout"
        method="POST"
        use:enhance={({ cancel }) => {
		auth.send('LOGOUT')
		cancel()
	}}
>
    <button
            type="submit"
            class="bg-surface-700 text-primary-200 inline-flex h-8 items-center justify-center rounded-[4px] px-4 font-medium leading-none"
    >
        Выйти из профиля
    </button>
</form>
