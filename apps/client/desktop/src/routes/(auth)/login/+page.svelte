<script lang="ts">
	import { Login } from 'auth/login'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<Login {data} redirect='/' />
