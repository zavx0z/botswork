<script lang="ts">
  import type { Actor, ActorLogic, AnyTransitionDefinition } from "xstate"
  import type { SimulationEvents } from "./machine/sumulation/types/Events"

  export let definition: AnyTransitionDefinition
  let guard = (definition.guard || null) as { name: string } | null

  export let service: Actor<ActorLogic<any, SimulationEvents, any, any, any>>
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  data-viz="transition-label"
  class="flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-solid border-primary-500 text-xs font-bold text-surface-500"
  on:mouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType: definition.eventType })}
  on:mouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
  on:click={() => service.send({ type: "EVENT", event: { type: definition.eventType } })}
>
  <div data-viz="transition-event" class="bg-primary-500 px-2 py-1">{definition.eventType}</div>
  {#if guard}
    <div data-viz="transition-guard" class="bg-transparent px-2 text-primary-100 before:content-['['] after:content-[']']">
      {guard.name}
    </div>
  {/if}
</div>
