<script lang="ts">
  import type { TransitionDefinition } from "xstate"

  export let definition: TransitionDefinition<any, any>
  export let service: any
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  data-viz="transition-label"
  class="cursor-pointer flex items-center justify-center overflow-hidden rounded-2xl border-2 border-solid border-primary-500 text-xs font-bold text-surface-500"
  on:mouseenter={() => service.send({ type: "EVENT.PREVIEW", eventType: definition.eventType })}
  on:mouseleave={() => service.send({ type: "PREVIEW.CLEAR" })}
  on:click={() => service.send({ type: "EVENT", event: { type: definition.eventType } })}
>
  <div data-viz="transition-event" class="bg-primary-500 px-2 py-1">{definition.eventType}</div>
  <!-- {#if definition.guard?.name}
    <div data-viz="transition-guard" class="px-2 bg-transparent before:content-['['] after:content-[']'] text-primary-100">
      {definition.guard?.name}
    </div>
  {/if} -->
</div>
