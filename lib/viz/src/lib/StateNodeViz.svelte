<script lang="ts">
  import type { AnyStateNodeDefinition, AnyActor, AnyState } from "xstate"
  import TransitionViz from "./TransitionViz.svelte"
  import { mockActorContext } from "./utils"
  import { onDestroy, onMount } from "svelte"

  const isActive = (state: AnyState, currentId: string) => Boolean(state.configuration.find(({ id }) => id === currentId))

  export let definition: AnyStateNodeDefinition
  export let service: AnyActor

  let entry = definition.entry as ActionsWithType
  let exit = definition.exit as ActionsWithType

  let active: boolean = isActive(service.getSnapshot().context.state, definition.id)

  export let parent: StateNodeDef | undefined = undefined

  let preview: boolean = false

  $: {
    console.log(definition.id)
    // isActive(service.getSnapshot().context.state, definition.id)
    entry = definition.entry as ActionsWithType
    exit = definition.exit as ActionsWithType
  }

  onMount(() => {
    const subscribe = service.subscribe((state) => {
      const { state: machineState, machine, previewEvent } = state.context
      console.log(definition.id)
      active = isActive(state.context.state, definition.id)
      if (previewEvent) {
        const previewState: AnyState = machine.transition(machineState, { type: previewEvent }, mockActorContext)
        preview = Boolean(previewState.configuration.find(({ id }) => id === definition.id))
      } else preview = false
    })
    return () => {
      subscribe.unsubscribe()
    }
  })
</script>

<!-- Группа stateNodeGroup -->
<div class="grid grid-cols-[auto_auto] gap-x-4">
  <!-- Нода stateNode-->
  <div
    data-viz-parent-type={parent?.type}
    data-viz-active={active}
    data-viz-previewed={preview}
    title={`#${definition.id}`}
    class="delay-400 inline-grid self-start rounded border-2 border-solid border-surface-700 text-primary-50 transition-colors data-[viz-active=true]:border-primary-500 data-[viz-previewed=true]:border-primary-500 data-[viz-active=false]:opacity-60"
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
      <div data-viz-actions="entry" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-viz-actions)'\a0/'] empty:hidden">
        {#each entry as action}
          <div data-viz="action" data-viz-action="entry">
            <div data-viz="action-type">{action.type}</div>
          </div>
        {/each}
      </div>
      <!-- Действия выхода stateNode-actions -->
      <div data-viz-actions="exit" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-viz-actions)'\a0/'] empty:hidden">
        {#each exit as action}
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
  <div class="flex flex-col items-start justify-start gap-2">
    {#each definition.transitions as transition}
      <TransitionViz definition={transition} {service} />
    {/each}
  </div>
</div>
