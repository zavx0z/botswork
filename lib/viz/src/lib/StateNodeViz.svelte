<script lang="ts">
  import type { StateNodeDefinition } from "xstate"
  import EventViz from "./EventViz.svelte"

  export let definition: StateNodeDefinition<any, any, any>
  export let parent: StateNodeDef | undefined = undefined
  export let service: any

  let active: boolean
  $: active = Boolean($service.context.state.configuration.find((n: any) => n.id === definition.id))
</script>

<!-- Группа stateNodeGroup -->
<div class="grid grid-cols-[auto_auto] gap-x-4">
  <!-- Нода stateNode-->
  <div
    data-viz-parent-type={parent?.type}
    data-viz-active={active}
    title={`#${definition.id}`}
    class="inline-grid self-start rounded border-2 border-solid border-surface-700 text-primary-50 data-[viz-active=true]:border-primary-500 data-[viz-active=false]:opacity-60"
  >
    <!-- Заголовок ноды stateNode-header -->
    <div class="grid grid-cols-[auto_1fr] items-center bg-surface-700">
      {#if ["history", "final"].includes(definition.type)}
        <!-- Тип ноды stateNode-type -->
        <div
          data-viz-type={definition.type}
          class="flex h-8 w-8 items-center justify-center rounded-md bg-tertiary-700 before:block before:font-bold data-[viz-type=final]:before:content-['F'] data-[viz-type=history]:before:content-['H']"
        />
      {/if}
      <!-- Имя ноды stateNode-key -->
      <div class="p-2 font-bold">{definition.key}</div>
    </div>
    <!-- Контент stateNode-content-->
    <div class="bg-surface-700 p-2">
      <!-- Вызываемые сервисы stateNode-invocations-->
      <div class="">
        {#each definition.invoke as invocation}
          <div data-viz="invoke">
            <div data-viz="invoke-id">{invocation.id}</div>
          </div>
        {/each}
      </div>
      <!-- Действия входа stateNode-actions -->
      <div class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-viz-actions)'\a0/'] empty:hidden" data-viz-actions="entry">
        {#each definition.entry as action}
          <div data-viz="action" data-viz-action="entry">
            <div data-viz="action-type">{action.type}</div>
          </div>
        {/each}
      </div>
      <!-- Действия выхода stateNode-actions -->
      <div class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-viz-actions)'\a0/'] empty:hidden" data-viz-actions="exit">
        {#each definition.exit as action}
          <div data-viz="action" data-viz-action="exit">
            <div data-viz="action-type">{action.type}</div>
          </div>
        {/each}
      </div>
    </div>
    {#if "states" in definition && Object.keys(definition.states).length}
      <div class="flex flex-wrap gap-4 p-4">
        {#each Object.values(definition.states) as value}
          <svelte:self definition={value} {service} parent={definition} />
        {/each}
      </div>
    {/if}
  </div>
  <!-- transitions -->
  <div class="transitions">
    {#each definition.transitions as transition}
      <EventViz definition={transition} />
    {/each}
  </div>
</div>