<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
  import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
  import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  import type { editor } from "monaco-editor"
  import type { Readable, Writable } from "svelte/store"

  export let content: Readable<string> | Writable<string>
  export let hFull = true
  export let readOnly = false
  export let language: "typescript" | "javascript" | "html" | "css" = "typescript"
  let subscriptions: Array<(text: string) => void> = []
  let divEl: HTMLDivElement
  let editor: editor.IStandaloneCodeEditor
  let Monaco: typeof import("monaco-editor")

  let ignoreEvent = false
  const updateHeight = () => {
    const contentHeight = Math.min(
      divEl.parentElement?.getBoundingClientRect().height ?? 0,
      window.innerHeight,
      editor.getContentHeight()
    )
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
        if (label === "json") {
          return new jsonWorker()
        }
        if (label === "css" || label === "scss" || label === "less") {
          return new cssWorker()
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
          return new htmlWorker()
        }
        if (label === "typescript" || label === "javascript") {
          return new tsWorker()
        }
        return new editorWorker()
      },
    }

    Monaco = await import("monaco-editor")
    editor = Monaco.editor.create(divEl, {
      value: $content,
      language: language,
      theme: "vs-dark",
      readOnly: readOnly,

      scrollBeyondLastLine: false,
      wordWrap: "on",
      wrappingStrategy: "advanced",
      overviewRulerLanes: 0,
    })
    editor.onDidChangeModelContent(() => {
      const text = editor.getValue()
      subscriptions.forEach((sub) => sub(text))
    })
    content = {
      subscribe(func) {
        subscriptions.push(func)
        return () => {
          subscriptions = subscriptions.filter((sub) => sub != func)
        }
      },
      set(val) {
        editor.setValue(val)
      },
    }

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
