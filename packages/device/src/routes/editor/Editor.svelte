<script lang="ts">
	import loader from '@monaco-editor/loader'
	import { onDestroy, onMount } from 'svelte'
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'

	export let code: string = "console.log('Катюлечька! Я люблю тебя!')"
	export let lang: 'javascript' | 'json' = 'json'

	let editor: Monaco.editor.IStandaloneCodeEditor
	let monaco: typeof Monaco
	let editorContainer: HTMLElement

	const width = 800

	onMount(async () => {
		const monacoEditor = await import('monaco-editor')
		loader.config({ monaco: monacoEditor.default })
		monaco = await loader.init()
		// Your monaco instance is ready, let's display some code!
		monaco.editor.defineTheme('default', {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{
					token: 'identifier',
					foreground: '9CDCFE'
				},
				{
					token: 'identifier.function',
					foreground: 'DCDCAA'
				},
				{
					token: 'type',
					foreground: '1AAFB0'
				}
			],
			colors: {}
		})
		monaco.editor.setTheme('default')

		const editor = monaco.editor.create(editorContainer, {
			value: code,
			language: lang,
			minimap: {
				enabled: false
			},
			scrollBeyondLastLine: false,
			wordWrap: 'on',
			wrappingStrategy: 'advanced',
			overviewRulerLanes: 0
		})
		// const model = monaco.editor.createModel(
		// 	"console.log('Hello from Monaco! (the editor, not the city...)')",
		// 	'javascript'
		// 	// Give monaco a hint which syntax highlighting to use
		// 	// monaco.Uri.file('sample.js')
		// )
		// editor.setModel(model)
		let ignoreEvent = false
		const updateHeight = () => {
			const contentHeight = Math.min(1000, editor.getContentHeight())
			editorContainer.style.width = `${width}px`
			editorContainer.style.height = `${contentHeight}px`
			try {
				ignoreEvent = true
				editor.layout({ width, height: contentHeight })
			} finally {
				ignoreEvent = false
			}
		}

		editor.onDidContentSizeChange(updateHeight)
		updateHeight()
	})
	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose())
	})
</script>

<div bind:this={editorContainer} />
