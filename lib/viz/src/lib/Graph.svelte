<script lang="ts">
  import { createActor, type StateNode } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import GraphNode from "./graph/GraphNode.svelte"
  import elkMachine from "./graph/elkMachine"
  import { getAllEdges } from "./graph/utils"
  import type { DirectedGraphEdge, DirectedGraphNode } from "./graph/directedGraph"

  import StateNodeViz from "./StateNodeViz.svelte"
  import TransitionViz from "$lib/event/TransitionViz.svelte"
  import EdgeViz from "./edge/EdgeViz.svelte"

  let { digraph } = $props<{ digraph: DirectedGraphNode }>()

  const elkActor = createActor(elkMachine, { input: { digraph } }).start()
  const stateActor = useSelector(elkActor, (state) => state)

  const edges = useSelector<any, DirectedGraphEdge[], any>(elkActor, (state) => getAllEdges(state.context.digraph))
</script>

{#if $stateActor.matches("success")}
  <!-- визуализация -->
  <GraphNode {elkActor} edges={$edges} />
  <svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
    {#each $edges as edge, order (edge.id)}
      <EdgeViz {edge} {order} />
    {/each}
  </svg>
{:else}
  <div class="opacity-0">
    <!-- расчет -->
    <StateNodeViz stateNode={digraph.stateNode} />
    {#each $edges as edge (edge.id)}
      <TransitionViz {edge} />
    {/each}
  </div>
{/if}
