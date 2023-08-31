<script lang="ts">
    import Editor from '../editor/Editor.svelte'
	const code = `export interface Device {
	type: 'mobile' | 'tablet' | 'desktop'
	model?: string
	OS?: string
	versionOS?: string
	tz?: string
	width?: number
	height?: number
	resolution?: number
}

export interface Client {
	type: 'browser' | 'desktop'
	user_agent?: string
	vendor?: string
}`
</script>

<div class="container mx-auto">
	<h1 class="text-primary-500 m-4 text-center text-lg">Device</h1>
	<Editor {code} lang={'typescript'} width={444} />
</div>
<slot />
