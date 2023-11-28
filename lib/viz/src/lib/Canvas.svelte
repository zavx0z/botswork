<script lang="ts">
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import Graph from "./Graph.svelte"
  import CanvasContainer from "./canvas/CanvasContainer.svelte"
  import { getContext } from "svelte"
  import { toDirectedGraph } from "./graph/directedGraph"

  const service: AnyActor = getContext("service")
  let digraph = useSelector(service, (state) => {
    console.log("GENERATE digraph")
    return toDirectedGraph(state.context.machine.root)
  })
</script>

<CanvasContainer>
  <Graph digraph={$digraph} />
</CanvasContainer>
