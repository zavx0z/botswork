<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import { hexThemeColor } from "@lib/theme"
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
  import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
  import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
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
  export let foldLevel: undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 = undefined

  let editor: editor.IStandaloneCodeEditor

  let divEl: HTMLDivElement
  let Monaco: MonacoEditor

  let ignoreEvent = false

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function (_moduleId, label) {
        switch (label) {
          case "html":
            return new htmlWorker()
          case "css":
            return new cssWorker()
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

    // fetch(`/xstate.d.ts.txt`)
    //   .then((res) => res.text())
    //   .then((indexFile) => Monaco.languages.typescript.typescriptDefaults.addExtraLib(`${indexFile}`))
    // все цвета тут
    // https://github.com/fabiospampinato/khroma/blob/fa81639c242fdcf6492c36e2fb85f04664e042da/src/color/keyword.ts#L13-L161
    Monaco.editor.defineTheme("BotsWork", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "identifier",
          foreground: "9CDCFE",
        },
        {
          token: "identifier.function",
          foreground: "DCDCAA",
        },
        {
          token: "type",
          foreground: "1AAFB0",
        },
      ],
      colors: {
        "editor.background": hexThemeColor("--color-surface-900"),
      },
    })
    Monaco.editor.setTheme("BotsWork")
    editor = Monaco.editor.create(divEl, {
      value: content,
      language: language,
      theme: "BotsWork",
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

    if (foldLevel) {
      editor.getAction(`editor.foldLevel${foldLevel}`)?.run()
    }

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
