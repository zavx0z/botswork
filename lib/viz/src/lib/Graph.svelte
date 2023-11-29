<script lang="ts">
  import type { AnyStateNode } from "xstate"
  import { getAllEdges } from "./graph/utils"
  import type { DirectedGraphNode } from "./graph/directedGraph"
  import StateNodeViz from "./StateNodeViz.svelte"
  import { onMount } from "svelte"
  import { getElkGraph } from "./graph/elk"

  let { digraph } = $props<{ digraph: DirectedGraphNode }>()
  const edges = getAllEdges(digraph)
  let node = $state<AnyStateNode>()

  onMount(async () => {
    const res = await getElkGraph(digraph)
    //@ts-ignore
    node = res.node.stateNode
  })
</script>

{#if node}
  <StateNodeViz stateNode={node} {edges} />
  <!-- <svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
    {#each edges as edge, order (edge.id)}
      <EdgeViz {edge} {order} />
    {/each}
  </svg> -->
{:else}
  <div class="opacity-0">
    <!-- расчет -->
    <StateNodeViz stateNode={digraph.stateNode} {edges} />
  </div>
{/if}
