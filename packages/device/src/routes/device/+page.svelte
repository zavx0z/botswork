<script lang="ts">
	import { ClientJS } from 'clientjs'
	import type { Device } from '../../..'
	const client = new ClientJS()
    
	const device: Device = {
		type: 'desktop'
	}
	console.log(JSON.stringify(device))
</script>
