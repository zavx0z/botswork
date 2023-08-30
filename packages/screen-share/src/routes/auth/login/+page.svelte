<script lang="ts">
	import { Login } from 'auth'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<Login {data} redirectTo='/' />
