<script lang="ts">
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<slot />
</div>
