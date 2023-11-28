<script lang="ts">
  import type { AnyActor, AnyMachineSnapshot, AnyStateNode } from "xstate"
  import { mockActorContext } from "./utils"
  import { useSelector } from "@xstate/svelte"
  import { rect } from "./getRect"
  import { getContext } from "svelte"

  const { stateNode, parent } = $props<{ stateNode: AnyStateNode; parent?: StateNodeDef }>()
  const service: AnyActor = getContext("service")

  let active: Boolean = $state(false)
  const machineState = useSelector(service, (state) => state.context.state)
  $effect(() => {
    active = Boolean($machineState._nodes.find(({ id }: { id: string }) => id === stateNode.id))
  })

  let preview = useSelector(service, (state) => {
    const { previewEvent, machine, state: machineState } = state.context
    if (!previewEvent) return false
    const previewState: AnyMachineSnapshot = machine.transition(machineState, { type: previewEvent }, mockActorContext)
    return Boolean(previewState._nodes.find(({ id }) => id === stateNode.id))
  })

  const groupPosition = (node: HTMLElement) => {
    if (stateNode.meta) {
      node.style.left = `${stateNode.meta.layout.x}px`
      node.style.top = `${stateNode.meta.layout.y}px`
    }
  }
  const nodeSize = (node: HTMLElement) => {
    if (stateNode.meta) {
      node.style.width = `${stateNode.meta.layout.width}px`
      node.style.height = `${stateNode.meta.layout.height}px`
    }
  }
</script>

<!-- Группа stateNodeGroup -->
<div class="absolute" use:groupPosition>
  <!-- Нода stateNode-->
  <div
    use:rect={stateNode.id}
    use:nodeSize
    data-viz-parent-type={parent?.type}
    data-active={active}
    data-previewed={$preview}
    title={`#${stateNode.id}`}
    class="delay-400 self-start overflow-hidden rounded border-2 border-solid border-surface-700 text-primary-50 transition-colors data-[active=true]:border-primary-500 data-[previewed=true]:border-primary-500 data-[active=false]:opacity-60"
  >
    <!-- Контент stateNode-content-->
    <div data-rect={`${stateNode.id}:content`} class="bg-surface-700 p-2 empty:hidden">
      <!-- Заголовок ноды stateNode-header -->
      <div class="bg-surface-700">
        {#if ["history", "final"].includes(stateNode.type)}
          <div
            data-node-type={stateNode.type}
            class="flex h-8 w-8 items-center justify-center rounded-md bg-tertiary-700 before:block before:font-bold data-[node-type=final]:before:content-['F'] data-[node-type=history]:before:content-['H']"
          />
        {/if}
        <!-- Имя ноды stateNode-key -->
        <div class="py-2 font-bold">{stateNode.key}</div>
      </div>
      <div data-type="invoke" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each stateNode.invoke as invocation}
          <div>{invocation.id}</div>
        {/each}
      </div>
      <div data-type="entry" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each stateNode.entry as entry}
          <div>{entry}</div>
        {/each}
      </div>
      <div data-type="exit" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
        {#each stateNode.exit as exit}
          <div>{exit}</div>
        {/each}
      </div>
    </div>
    {#if "states" in stateNode}
      <div class="absolute left-0 top-0 flex flex-wrap gap-4 p-4 empty:hidden">
        {#each Object.entries(stateNode.states) as [key, value] (key)}
          <svelte:self parent={stateNode} stateNode={value} />
        {/each}
      </div>
    {/if}
  </div>
</div>
