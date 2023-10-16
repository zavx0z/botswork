<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { writable } from "svelte/store"
  import type { PageData } from "./$types"
  import StateNodeViz from "$lib/StateNodeViz.svelte"
  import { useSelector } from "@xstate/svelte"
  import Edges from "$lib/Edges.svelte"

  export let data: PageData
  let { simService, canvasActor } = data

  let definition = useSelector(simService, (state) => state.context.machine.definition)
  let zoom = useSelector(canvasActor, (state) => state.context.zoom)
  let content = writable("// some comment")
</script>

<main class="grid h-screen w-screen grid-cols-2 grid-rows-1">
  <div>
    <div class="flex gap-2">
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.OUT" })}>-</button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.IN" })}>+</button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => simService.send({ type: "EVENT", event: { type: "NEXT" } })}> NEXT </button>
      <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => simService.send({ type: "MACHINE.UPDATE" })}> MACHINE </button>
    </div>
    <div style="transform: scale({$zoom})" class="transition-transform duration-200 ease-in-out">
      <StateNodeViz definition={$definition} service={simService} />
    </div>
    <Edges service={simService} />
  </div>
  <Editor {content} language="typescript" />
</main>
