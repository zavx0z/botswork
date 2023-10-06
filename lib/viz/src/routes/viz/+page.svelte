<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { writable } from "svelte/store"
  import type { PageData } from "./$types"
  import StateNodeViz from "$lib/StateNodeViz.svelte"

  export let data: PageData
  let { simService, testMachine, canvas } = data
  let content = writable("// some comment")
</script>

<main class="h-screen w-screen grid grid-cols-2 grid-rows-1">
  <div style="transform: scale({$canvas.context.zoom})">
    <div class="flex gap-2">
      <button
        class="rounded-sm text-surface-900 bg-primary-500 p-2 min-w-[50px]"
        on:click={() => canvas.send("ZOOM.OUT")}>-</button
      >
      <button
        class="rounded-sm text-surface-900 bg-primary-500 p-2 min-w-[50px]"
        on:click={() => canvas.send("ZOOM.IN")}>+</button
      >
      <button
        class="rounded-sm text-surface-900 bg-primary-500 p-2 min-w-[50px]"
        on:click={() => simService.send({ type: "EVENT", event: { type: "NEXT" } })}
      >
        NEXT
      </button>
      <button
        class="rounded-sm text-surface-900 bg-primary-500 p-2 min-w-[50px]"
        on:click={() => simService.send("MACHINE.UPDATE")}
      >
        MACHINE
      </button>
    </div>
    <StateNodeViz definition={$simService.context.machine.definition} service={simService} />
  </div>
  <Editor {content} language="typescript" />
</main>
