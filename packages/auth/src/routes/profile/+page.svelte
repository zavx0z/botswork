<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	const { auth } = data
</script>

<h2 class="text-secondary-500 mt-4 text-center">Авторизован: {$auth.context.username}</h2>
<h2 class="text-secondary-500 text-center">ID пользователя: {$auth.context.id}</h2>
