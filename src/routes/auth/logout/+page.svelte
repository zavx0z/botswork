<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { PageData } from './$types'

	export let data: PageData

	const handleSignOut: SubmitFunction = async ({ cancel }) => {
		const { error } = await data.supabase.auth.signOut()
		if (error) console.log(error)
		cancel()
	}
</script>

<form action="?/logout" method="POST" use:enhance={handleSignOut}>
	<button
		type="submit"
		class="inline-flex h-8 items-center justify-center rounded-[4px] bg-surface-700 px-4 font-medium leading-none text-primary-200"
	>
		Выйти из профиля
	</button>
</form>
