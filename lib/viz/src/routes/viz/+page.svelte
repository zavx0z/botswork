<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { writable } from "svelte/store"
  import type { PageData } from "./$types"
  import StateNodeViz from "$lib/StateNodeViz.svelte"
  import { onMount } from "svelte"

  export let data: PageData
  let { simService, canvasActor } = data
  let { zoom } = canvasActor.getSnapshot().context
  canvasActor.subscribe((state) => {
    zoom = state.context.zoom
  })
  let definition = simService.getSnapshot().context.machine.definition
  simService.subscribe((state) => {
    definition = state.context.machine.definition
  })
  onMount(()=>{
    console.log(simService)
  })
  let content = writable("// some comment")
</script>

<main class="grid h-screen w-screen grid-cols-2 grid-rows-1">
  <div style="transform: scale({zoom})">
    <div class="flex gap-2">
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.OUT" })}>-</button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.IN" })}>+</button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => simService.send({ type: "EVENT", event: { type: "NEXT" } })}> NEXT </button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => simService.send({ type: "MACHINE.UPDATE" })}> MACHINE </button>
    </div>
    <StateNodeViz {definition} service={simService} />
  </div>
  <Editor {content} language="typescript" />
</main>
