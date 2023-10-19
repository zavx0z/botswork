<script lang="ts">
  import type { DirectedGraphNode } from "@xstate/graph"
  import { createActor, type StateNode } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import GraphNode from "./graph/GraphNode.svelte"
  import elkMachine from "./graph/elkMachine"
  import MachineViz from "./graph/MachineViz.svelte"
  import { getAllEdges } from "./graph/utils"

  export let digraph: DirectedGraphNode
  const elkActor = createActor(elkMachine, { input: { digraph } }).start()
  const state = useSelector(elkActor, (state) => state)
  const edges = useSelector(elkActor, (state) => getAllEdges(state.context.digraph))
</script>

{#if $state.matches("success")}
  <GraphNode {elkActor} edges={$edges} />
{:else}
  <MachineViz stateNode={digraph.stateNode} edges={$edges} />
{/if}
