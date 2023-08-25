<script lang="ts">
	import type { LayoutData } from './$types'
	export let data: LayoutData
	let { webRTCReceiver } = data
	console.log('webRTCReceiver', $webRTCReceiver.value)
</script>

<slot />
