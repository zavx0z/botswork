<script lang="ts">
  import type { StateNodeDefinition } from "xstate"
  import EventViz from "./EventViz.svelte"

  export let definition: StateNodeDefinition<any, any, any>
  export let parent: StateNodeDef | undefined = undefined
  export let service: any

  let active: boolean
  $: active = $service.context.state.configuration.find((n: any) => n.id === definition.id) || undefined
</script>

<div class="grid grid-cols-2 gap-x-4">
  <div
    class="stateNode"
    data-viz="stateNode"
    data-viz-type={definition.type}
    data-viz-parent-type={parent?.type}
    data-viz-active={active}
    title={`#${definition.id}`}
  >
    <div class="stateNode-header">
      {#if ["history", "final"].includes(definition.type)}
        <div class="stateNode" data-viz="stateNode-type" data-viz-type={definition.type} />
      {/if}
      <div class="stateNode stateNode-key">{definition.key}</div>
    </div>
    <div data-viz="stateNode-content">
      <div data-viz="stateNode-invocations">
        {#each definition.invoke as invocation}
          <div data-viz="invoke">
            <div data-viz="invoke-id">{invocation.id}</div>
          </div>
        {/each}
      </div>
    </div>
    <div data-viz="stateNode-actions" data-viz-actions="entry">
      {#each definition.entry as action}
        <div data-viz="action" data-viz-action="entry">
          <div data-viz="action-type">{action.type}</div>
        </div>
      {/each}
    </div>
    <div data-viz="stateNode-actions" data-viz-actions="exit">
      {#each definition.exit as action}
        <div data-viz="action" data-viz-action="exit">
          <div data-viz="action-type">{action.type}</div>
        </div>
      {/each}
    </div>
    {#if "states" in definition}
      <div data-viz="stateNode-states">
        {#each Object.values(definition.states) as value}
          <svelte:self definition={value} {service} parent={definition} />
        {/each}
      </div>
    {/if}
  </div>
  <div data-viz="transitions">
    {#each definition.transitions as transition}
      <EventViz definition={transition} />
    {/each}
  </div>
</div>

<style>
  /* Локальные стили для переопределения глобальных стилей */
  :global(*) {
    @apply text-primary-200;
  }
  .stateNodeGroup {
    @apply grid;
    @apply grid-cols-2;
    @apply gap-4; /* grid-column-gap: 1rem; заменено на Tailwind CSS класс */
  }

  .stateNode {
    @apply border;
    @apply border-solid; /* border-style: var(--viz-node-border-style); заменено на Tailwind CSS класс */
    @apply rounded; /* border-radius: var(--viz-radius); заменено на Tailwind CSS класс */
    @apply inline-grid;
    @apply self-start;
    @apply opacity-50;
    @apply text-[var(--viz-color-fg)]; /* color: var(--viz-color-fg); заменено на Tailwind CSS класс */
  }

  .stateNode[data-viz-active] {
    @apply opacity-100;
  }

  .stateNode[data-viz-active] {
    @apply border-[var(--viz-color-event)]; /* --viz-node-border-color: var(--viz-color-event); заменено на Tailwind CSS класс */
  }

  .stateNode[data-viz-type="history"] {
    /* --viz-stateNode-type: 'H'; заменено на Tailwind CSS класс */
  }

  .stateNode[data-viz-type="final"] {
    /* --viz-stateNode-type: 'F'; заменено на Tailwind CSS класс */
  }

  .stateNode[data-viz-parent-type="parallel"] {
    @apply border-dashed; /* border-style: var(--viz-node-parallel-border-style); заменено на Tailwind CSS класс */
  }

  .stateNode-header {
    @apply grid;
    @apply grid-cols-[auto,1fr];
    @apply items-center;
    @apply bg-[var(--viz-node-color-bg)]; /* background: var(--viz-node-color-bg); заменено на Tailwind CSS класс */
  }

  .stateNode-content {
    @apply p-2; /* padding: 0.5rem; заменено на Tailwind CSS класс */
    @apply bg-[var(--viz-node-color-bg)]; /* background: var(--viz-node-color-bg); заменено на Tailwind CSS класс */

    &:empty {
      @apply hidden; /* display: none; заменено на Tailwind CSS класс */
    }
  }

  .stateNode-states {
    @apply p-4; /* padding: 1rem; заменено на Tailwind CSS класс */
    @apply flex;
    @apply flex-wrap;
    @apply gap-4; /* gap: 1rem; заменено на Tailwind CSS класс */

    &:empty {
      @apply hidden; /* display: none; заменено на Tailwind CSS класс */
    }
  }

  .stateNode-type {
    @apply h-8 w-8; /* height: 2rem; width: 2rem; заменено на Tailwind CSS класс */
    @apply rounded; /* border-radius: var(--viz-radius); заменено на Tailwind CSS класс */
    @apply bg-transparent; /* background: var(--viz-color-transparent); заменено на Tailwind CSS класс */

    &::before {
      @apply font-bold;
    }
  }

  .stateNode-key {
    @apply p-2; /* padding: 0.5rem; заменено на Tailwind CSS класс */
    @apply font-bold;
  }

  .stateNode-actions {
    @apply mb-2; /* margin-bottom: 0.5rem; заменено на Tailwind CSS класс */

    &:empty {
      @apply hidden; /* display: none; заменено на Tailwind CSS класс */
    }

    &:before {
      @apply font-bold;
      @apply opacity-50; /* opacity: 0.5; заменено на Tailwind CSS класс */
    }
  }
</style>
