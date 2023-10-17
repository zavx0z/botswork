<script lang="ts">
  import type { AnyStateNodeDefinition, AnyActor, AnyState } from "xstate"
  import TransitionViz from "./TransitionViz.svelte"
  import { mockActorContext } from "./utils"
  import { useSelector } from "@xstate/svelte"
  import { setRect } from "./getRect"

  export let definition: AnyStateNodeDefinition
  export let service: AnyActor
  export let parent: StateNodeDef | undefined = undefined
  let entry: ActionsWithType
  let exit: ActionsWithType

  $: {
    entry = definition.entry as ActionsWithType
    exit = definition.exit as ActionsWithType
  }

  let active: Boolean
  const machineState = useSelector(service, (state) => state.context.state)
  $: active = Boolean($machineState.configuration.find(({ id }: { id: string }) => id === definition.id))

  let preview = useSelector(service, (state) => {
    const { previewEvent, machine, state: machineState } = state.context
    if (!previewEvent) return false
    const previewState: AnyState = machine.transition(machineState, { type: previewEvent }, mockActorContext)
    return Boolean(previewState.configuration.find(({ id }) => id === definition.id))
  })
</script>

<!-- Группа stateNodeGroup -->
<div class="grid grid-cols-[auto_auto] gap-x-4">
  <!-- Нода stateNode-->
  <div
    use:setRect={definition.id}
    data-viz-parent-type={parent?.type}
    data-active={active}
    data-previewed={$preview}
    title={`#${definition.id}`}
    class="delay-400 inline-grid self-start rounded border-2 border-solid border-surface-700 text-primary-50 transition-colors data-[active=true]:border-primary-500 data-[previewed=true]:border-primary-500 data-[active=false]:opacity-60"
  >
    <!-- Заголовок ноды stateNode-header -->
    <div class="grid grid-cols-[auto_1fr] items-center bg-surface-700">
      {#if ["history", "final"].includes(definition.type)}
        <div
          data-node-type={definition.type}
          class="flex h-8 w-8 items-center justify-center rounded-md bg-tertiary-700 before:block before:font-bold data-[node-type=final]:before:content-['F'] data-[node-type=history]:before:content-['H']"
        />
      {/if}
      <!-- Имя ноды stateNode-key -->
      <div class="p-2 font-bold">{definition.key}</div>
    </div>
    <!-- Контент stateNode-content-->
    <div class="bg-surface-700 p-2">
      <div data-type="invoke" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each definition.invoke as invocation}
          <div>{invocation.id}</div>
        {/each}
      </div>
      <div data-type="entry" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each entry as action}
          <div>{action.type}</div>
        {/each}
      </div>
      <div data-type="exit" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each exit as action}
          <div>{action.type}</div>
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
  <div class="flex flex-col items-start justify-start gap-2">
    {#each definition.transitions as transition, idx (idx)}
      <TransitionViz definition={transition} {service} {idx} {active} />
    {/each}
  </div>
</div>
