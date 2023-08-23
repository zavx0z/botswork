<script lang="ts">
	import { LogOut } from 'auth/logout'
	import { Profile } from 'auth/profile'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div class="flex flex-col items-center">
	<Profile {data} />
	<LogOut {data} redirect="/" />
</div>
