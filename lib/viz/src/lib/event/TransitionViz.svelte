<script lang="ts">
  import EventTypeViz from "./EventTypeViz.svelte"
  import { getContext } from "svelte"
  import type { DirectedGraphEdge } from "$lib/types"
  import type { SimulationActor } from "$lib/machine/sumulation/types"

  let { edge } = $props<{ edge: DirectedGraphEdge }>()
  const service: SimulationActor = getContext("service")

  let definition = edge.transition
  let active = false
  let guard = (definition.guard || null) as { name: string } | null

  const setSize = (element: HTMLElement, edge: DirectedGraphEdge) => {
    const { width, height } = element.getBoundingClientRect()
    edge.label.width = width
    edge.label.height = height
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  style:left="{edge.label.x}px"
  style:top="{edge.label.y}px"
  use:setSize={edge}
  data-active={active}
  class="fixed z-40 flex cursor-pointer items-center rounded-2xl border-2 border-solid border-tertiary-900 text-xs font-bold text-primary-100 data-[active=true]:border-primary-500 data-[active=true]:text-surface-500"
  onmouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType: definition.eventType })}
  onmouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
  onclick={() => {
    //@ts-ignore
    service.send({ type: "EVENT", event: { type: definition.eventType } })
  }}
>
  <div data-active={active} class:rounded-l-2xl={guard} class:rounded-2xl={!guard} class="bg-tertiary-900 px-2 py-1 data-[active=true]:bg-primary-500">
    <EventTypeViz eventType={definition.eventType} />
  </div>
  {#if guard}
    <div class="bg-transparent px-2 text-primary-100 before:content-['['] after:content-[']']">
      {guard.name}
    </div>
  {/if}
</div>
