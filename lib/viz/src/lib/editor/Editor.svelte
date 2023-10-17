<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  import type { editor } from "monaco-editor"
  import type { Writable } from "svelte/store"

  export let content: Writable<string>
  export let hFull = true
  export let readOnly = false
  export let language: "typescript" | "javascript" | "html" | "css" = "typescript"
  let divEl: HTMLDivElement
  let editor: editor.IStandaloneCodeEditor
  let Monaco: typeof import("monaco-editor")

  let ignoreEvent = false
  const updateHeight = () => {
    const contentHeight = Math.min(divEl.parentElement?.getBoundingClientRect().height ?? 0, window.innerHeight, editor.getContentHeight())
    const rect = divEl.getBoundingClientRect()
    divEl.style.height = `${contentHeight}px`
    try {
      ignoreEvent = true
      editor.layout({ width: rect.width, height: contentHeight })
    } finally {
      ignoreEvent = false
    }
  }
  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function (_moduleId, label) {
        return new tsWorker()
      },
    }

    Monaco = await import("monaco-editor")
    editor = Monaco.editor.create(divEl, {
      value: $content,
      language: language,
      theme: "vs-dark",
      readOnly: readOnly,
      minimap: {
        enabled: false,
      },

      scrollBeyondLastLine: false,
      wordWrap: "on",
      wrappingStrategy: "advanced",
      overviewRulerLanes: 0,
    })
    editor.onDidChangeModelContent(() => {
      const text = editor.getValue()
      $content = text
    })

    if (!hFull) {
      editor.onDidContentSizeChange(updateHeight)
      updateHeight()
    }
  })
  onDestroy(() => {
    editor?.dispose()
  })
</script>

<div bind:this={divEl} class="h-full w-full" />
<svelte:window
  on:resize={() => {
    if (hFull) {
      editor.layout({ width: 0, height: 0 })
      window.requestAnimationFrame(() => {
        const rect = divEl.parentElement?.getBoundingClientRect()
        rect && editor.layout({ width: rect.width, height: rect.height })
      })
    } else updateHeight()
  }}
/>
