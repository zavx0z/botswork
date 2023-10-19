<script lang="ts">
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import Graph from "./Graph.svelte"
  import { toDirectedGraph } from "@xstate/graph"
  import CanvasContainer from "./canvas/CanvasContainer.svelte"
  import { getContext } from "svelte"

  const service: AnyActor = getContext("service")
  let digraph = useSelector(service, (state) => {
    console.log("GENERATE digraph")
    return toDirectedGraph(state.context.machine.definition)
  })
</script>

<CanvasContainer>
  <Graph digraph={$digraph} />
</CanvasContainer>
