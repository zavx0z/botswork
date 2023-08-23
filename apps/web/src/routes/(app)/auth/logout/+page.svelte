<script lang="ts">
	import { LogOut } from 'auth/logout'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<LogOut {data} />
