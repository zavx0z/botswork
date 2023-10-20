<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
  import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
  // import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
  // import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  import CodeFold from "./CodeFold.svelte"
  import { debounce } from "@lib/ui/utils"
  import type { editor, MonacoEditor } from "monaco-types"

  export let content: string
  export let hFull = true
  export let readOnly = false
  export let language: "typescript" | "javascript" | "json" | "html" | "css" = "typescript"
  export let minimapEnabled = false
  export let foldPanel = false

  let editor: editor.IStandaloneCodeEditor

  let divEl: HTMLDivElement
  let Monaco: MonacoEditor

  let ignoreEvent = false

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function (_moduleId, label) {
        switch (label) {
          case "json":
            return new jsonWorker()
          case "javascript":
          case "typescript":
            return new tsWorker()
          default:
            return new editorWorker()
        }
      },
    }

    Monaco = await import("monaco-editor")
    // const indexFile = await fetch(`/xstate.d.ts.txt`).then((res) => res.text())
    // Monaco.languages.typescript.typescriptDefaults.addExtraLib(`${indexFile}`)
    editor = Monaco.editor.create(divEl, {
      value: content,
      language: language,
      theme: "vs-dark",
      readOnly: readOnly,
      minimap: {
        enabled: minimapEnabled,
      },
      folding: true,
      scrollBeyondLastLine: false,
      wordWrap: "on",
      wrappingStrategy: "advanced",
      overviewRulerLanes: 0,
    })
    editor.onDidChangeModelContent(() => {
      const text = editor.getValue()
      content = text
    })

    if (!hFull) {
      editor.onDidContentSizeChange(updateHeight)
      updateHeight()
    }
  })
  onDestroy(() => {
    editor?.dispose()
  })
  $: {
    if (content !== editor?.getValue()) editor?.setValue(content)
  }

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
  const onResize = () => {
    console.log("resize")
    editor.layout({ width: 0, height: 0 })
    if (hFull) {
      const rect = divEl.parentElement?.getBoundingClientRect()
      rect && editor.layout({ width: rect.width, height: rect.height })
    } else updateHeight()
  }
</script>

<div class="flex h-full w-full flex-col">
  {#if foldPanel}
    <CodeFold {editor} />
  {/if}
  <div bind:this={divEl} class="w-full flex-1" />
</div>

<svelte:window on:resize={debounce(onResize, 200)} />
