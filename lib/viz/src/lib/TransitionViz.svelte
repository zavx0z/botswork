<script lang="ts">
  import type { AnyTransitionDefinition } from "xstate"
  import type { SimulationActor } from "./machine/sumulation/types/Events"
  import { setRect } from "./getRect"
  import EventTypeViz from "./EventTypeViz.svelte"

  export let definition: AnyTransitionDefinition
  export let idx: number
  export let service: SimulationActor
  export let active: Boolean
  // console.log(definition)
  let guard = (definition.guard || null) as { name: string } | null
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  data-active={active}
  use:setRect={`${definition.source.id}:${idx}`}
  class="flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-solid border-tertiary-900 text-xs font-bold text-primary-100 data-[active=true]:border-primary-500 data-[active=true]:text-surface-500"
  on:mouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType: definition.eventType })}
  on:mouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
  on:click={() => service.send({ type: "EVENT", event: { type: definition.eventType } })}
>
  <div data-active={active} class="bg-tertiary-900 px-2 py-1 data-[active=true]:bg-primary-500">
    <EventTypeViz eventType={definition.eventType} />
  </div>
  {#if guard}
    <div class="bg-transparent px-2 text-primary-100 before:content-['['] after:content-[']']">
      {guard.name}
    </div>
  {/if}
</div>
