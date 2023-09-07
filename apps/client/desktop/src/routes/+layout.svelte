<script lang="ts">
	import 'config/styles'
	import type { LayoutData } from './$types'
	import { AuthStateChange } from 'auth'
	export let data: LayoutData
</script>

<AuthStateChange {data} redirect='login'>
	<slot />
</AuthStateChange>
