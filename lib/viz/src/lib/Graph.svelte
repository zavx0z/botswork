<script lang="ts">
  import type { DirectedGraphNode } from "@xstate/graph"
  import { createActor, type StateNode } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import GraphNode from "./graph/GraphNode.svelte"
  import elkMachine from "./graph/elkMachine"
  import MachineViz from "./graph/MachineViz.svelte"
  import { getAllEdges } from "./graph/utils"

  let { digraph } = $props<{ digraph: DirectedGraphNode }>()
  const elkActor = createActor(elkMachine, { input: { digraph } }).start()
  const stateActor = useSelector(elkActor, (state) => state)
  const edges = useSelector(elkActor, (state) => getAllEdges(state.context.digraph))
</script>

{#if $stateActor.matches("success")}
  <GraphNode {elkActor} edges={$edges} />
{:else}
  <MachineViz stateNode={digraph.stateNode} edges={$edges} />
{/if}
