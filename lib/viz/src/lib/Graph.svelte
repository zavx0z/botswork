<script lang="ts">
  import { createActor, type StateNode } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import GraphNode from "./graph/GraphNode.svelte"
  import elkMachine from "./graph/elkMachine"
  import { getAllEdges } from "./graph/utils"
  import type { DirectedGraphNode } from "./graph/directedGraph"

  import StateNodeViz from "./StateNodeViz.svelte"
  import TransitionViz from "$lib/event/TransitionViz.svelte"
  import EdgeViz from "./edge/EdgeViz.svelte"
  import { getElkGraph } from "./graph/elk"
  import { onMount } from "svelte"

  let { digraph } = $props<{ digraph: DirectedGraphNode }>()
  const edges = getAllEdges(digraph)

  onMount(async () => {
    const elkGraph = await getElkGraph(digraph)
    console.log(elkGraph)
  })

  const elkActor = createActor(elkMachine, { input: { digraph } }).start()
  const elk = useSelector(elkActor, (state) => state)
  
</script>

{#if $elk.matches("success")}
  <!-- визуализация -->
  <GraphNode {elkActor} {edges} />
  <svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
    {#each edges as edge, order (edge.id)}
      <EdgeViz {edge} {order} />
    {/each}
  </svg>
{:else}
  <div class="opacity-0">
    <!-- расчет -->
    <StateNodeViz stateNode={digraph.stateNode} />
    {#each edges as edge}
      <TransitionViz {edge} />
    {/each}
  </div>
{/if}
