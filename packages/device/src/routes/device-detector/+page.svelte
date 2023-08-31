<script lang="ts">
	import DeviceDetector from 'device-detector-js'
	import Editor from '../editor/Editor.svelte'

	const deviceDetector = new DeviceDetector()
	const device = deviceDetector.parse(navigator.userAgent)
	console.log(navigator.userAgent)
	console.log(device)
</script>

<div class="flex h-screen flex-col gap-2 pl-4 pt-4">
	<div class="flex w-full">
		<a href="/" class="text-primary-500 text-lg underline">{`<`} Home</a>
		<h1 class="text-primary-500 flex-1 text-center text-xl font-bold">UAParser</h1>
	</div>
	<div class="h-full overflow-auto">
		<Editor code={JSON.stringify(device, null, '\t')} lang="json" />
	</div>
</div>
