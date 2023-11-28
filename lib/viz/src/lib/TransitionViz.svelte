<script lang="ts">
  import type { SimulationActor } from "./machine/sumulation/types/Events"
  import { rect } from "./getRect"
  import EventTypeViz from "./EventTypeViz.svelte"
  import { getContext } from "svelte"
  import type { Point } from "./pathUtils"
  import type { DirectedGraphEdge } from "./graph/directedGraph"

  let { edge } = $props<{ edge: DirectedGraphEdge }>()
  const service: SimulationActor = getContext("service")

  let definition = edge.transition
  let position: Point | undefined = edge.label ? { x: edge.label.x, y: edge.label.y } : undefined
  let active = false
  let guard = (definition.guard || null) as { name: string } | null
  const setPosition = (node: HTMLElement, position: Point | undefined) => {
    if (position) {
      // console.log(position)
      node.style.left = `${position.x}px`
      node.style.top = `${position.y}px`
    }
  }
  // class="justify-center overflow-hidden "
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  use:rect={edge}
  use:setPosition={position}
  data-active={active}
  class="fixed flex cursor-pointer items-center rounded-2xl border-2 border-solid border-tertiary-900 text-xs font-bold text-primary-100 data-[active=true]:border-primary-500 data-[active=true]:text-surface-500"
  on:mouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType: definition.eventType })}
  on:mouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
  on:click={() => service.send({ type: "EVENT", event: { type: definition.eventType } })}
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
