<script lang="ts">
  import type { AnyActor, AnyStateNode } from "xstate"
  import { deleteRect, setRect } from "./getRect"
  import { getContext } from "svelte"
  import type { DirectedGraphEdge } from "./types"

  const { stateNode, edges } = $props<{ stateNode: AnyStateNode; edges: DirectedGraphEdge[] }>()
  const service: AnyActor = getContext("service")

  let activeIds = $state(service.getSnapshot().context.state._nodes.map((i: AnyStateNode) => i.id))
  let previewIds: string[] = $state([])

  service.subscribe((state) => {
    activeIds = state.context.state._nodes.map((i: AnyStateNode) => i.id)
    previewIds = state.context.previewEvent ? state.context.machine.transition(state.context.state, { type: state.context.previewEvent })._nodes.map((i: AnyStateNode) => i.id) : []
  })

  const size = (element: HTMLElement, node: AnyStateNode) => {
    if (node.meta) {
      element.style.left = `${node.meta.layout.x}px`
      element.style.top = `${node.meta.layout.y}px`
      element.style.width = `${node.meta.layout.width}px`
      element.style.height = `${node.meta.layout.height}px`
    } else setRect(element, node.id)
    return {
      destroy() {
        deleteRect(node.id)
      },
    }
  }
</script>

{#snippet state_(node)}
  <div class="absolute text-primary-50" use:size={node}>
    <div
      title="#{node.id}"
      data-active={activeIds.includes(node.id)}
      data-preview={previewIds.includes(node.id)}
      class="delay-400 h-full w-full self-start overflow-hidden rounded-lg border-2 border-solid border-surface-700 transition-colors data-[active=true]:border-primary-500 data-[preview=true]:border-primary-500 data-[active=false]:opacity-60"
    >
      <div data-rect={`${node.id}:content`} class="bg-surface-700 p-2 empty:hidden">
        <div class="bg-surface-700">
          {#if ["history", "final"].includes(node.type)}
            <div
              data-node-type={node.type}
              class="flex h-8 w-8 items-center justify-center rounded-md bg-tertiary-700 before:block before:font-bold data-[node-type=final]:before:content-['F'] data-[node-type=history]:before:content-['H']"
            />
          {/if}
          <div class="py-2 font-bold">{node.key}</div>
        </div>
        <div data-type="invoke" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
          {#each node.invoke as invoke}
            <div>{invoke.id}</div>
          {/each}
        </div>
        <div data-type="entry" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
          {#each node.entry as entry}
            <div>{entry}</div>
          {/each}
        </div>
        <div data-type="exit" class="mb-2 before:text-xs before:font-bold before:uppercase before:opacity-50 before:content-[attr(data-type)'\a0/'] empty:hidden">
          {#each node.exit as exit}
            <div>{exit}</div>
          {/each}
        </div>
      </div>
      {#each Object.entries(node.states) as [key, value] (key)}
        {@render state_(value)}
      {/each}
    </div>
  </div>
{/snippet}
{@render state_(stateNode)}
