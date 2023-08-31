<script lang="ts">
	import Editor from '../editor/Editor.svelte'
	import UAParser from 'ua-parser-js'
	let parser = new UAParser(navigator.userAgent)
</script>

<div class="flex h-screen flex-col gap-2 pl-4 pt-4">
	<div class="flex w-full">
		<a href="/" class="text-primary-500 text-lg underline">{`<`} Home</a>
		<h1 class="text-primary-500 flex-1 text-center text-xl font-bold">UAParser</h1>
	</div>
	<div class="h-full overflow-auto">
		<Editor code={JSON.stringify(parser.getResult(), (k, v) => (v === undefined ? 'undefined' : v), '\t')} lang="json" />
	</div>
</div>
