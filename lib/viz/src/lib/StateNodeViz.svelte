<script lang="ts">
  import type { AnyStateNode } from "xstate"

  const { nodes, activeIds, previewIds } = $props<{
    nodes: { [key: string]: AnyStateNode }
    activeIds: string[]
    previewIds: string[]
  }>()

  const size = (element: HTMLElement, node: AnyStateNode) => {
    const { width, height } = element.getBoundingClientRect()
    node.meta = { ...node.meta, layout: { width, height } }
    return {
      update(node: AnyStateNode) {
        element.style.opacity = "1"
        element.style.left = `${node.meta.layout.x}px`
        element.style.top = `${node.meta.layout.y}px`
        element.style.width = `${node.meta.layout.width}px`
        element.style.height = `${node.meta.layout.height}px`
      },
    }
  }
</script>

{#each Object.entries(nodes) as [id, node] (id)}
  {@render state_(node)}
{/each}

{#snippet state_(node)}
  <div class="absolute text-primary-50 opacity-0 transition-opacity" use:size={node}>
    <!-- title="#{node.id}" -->
    <div
      data-active={activeIds.includes(node.id)}
      data-preview={previewIds.includes(node.id)}
      class="h-full w-full self-start overflow-hidden rounded-lg border-2 border-solid border-surface-700 transition-colors data-[active=true]:border-primary-500 data-[preview=true]:border-primary-500 data-[active=false]:opacity-60"
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
    </div>
  </div>
{/snippet}
