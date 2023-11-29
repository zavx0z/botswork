<script lang="ts">
  import EventTypeViz from "./EventTypeViz.svelte"
  import { getContext } from "svelte"
  import type { DirectedGraphEdge } from "$lib/types"
  import type { SimulationActor } from "$lib/machine/sumulation/types"

  let { edges, activeIds } = $props<{
    edges: { [key: string]: DirectedGraphEdge }
    activeIds: string[]
  }>()
  
  const service: SimulationActor = getContext("service")
  const setSize = (element: HTMLElement, edge: DirectedGraphEdge) => {
    const { width, height } = element.getBoundingClientRect()
    edge.label.width = width
    edge.label.height = height
    return {
      update(edge: DirectedGraphEdge) {
        element.style.opacity = "1"
        element.style.left = `${edge.label.x}px`
        element.style.top = `${edge.label.y}px`
      },
    }
  }
</script>

{#each Object.entries(edges) as [id, edge] (id)}
  {@const guard = edge.transition.guard}
  {@const eventType = edge.transition.eventType}
  {@render transition_({ edge, guard, eventType })}
{/each}

{#snippet transition_({ edge, guard, eventType })}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    use:setSize={edge}
    data-active={activeIds.includes(edge.source.id)}
    class="fixed z-40 flex cursor-pointer items-center rounded-2xl border-2 border-solid border-tertiary-900 bg-surface-800 text-xs font-bold text-primary-100 opacity-0 transition-colors data-[active=true]:border-primary-500 data-[active=true]:text-surface-500"
    onmouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType })}
    onmouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
    onclick={() => service.send({ type: "EVENT", event: { type: eventType } })}
  >
    <div data-active={activeIds.includes(edge.source.id)} class:rounded-l-2xl={guard} class:rounded-2xl={!guard} class="bg-tertiary-900 px-2 py-1 data-[active=true]:bg-primary-500">
      <EventTypeViz {eventType} />
    </div>
    {#if guard}
      <div class="px-2 text-primary-100 before:content-['['] after:content-[']']">
        {guard.name}
      </div>
    {/if}
  </div>
{/snippet}
