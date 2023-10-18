<script lang="ts">
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import StateNodeViz from "./StateNodeViz.svelte"
  import Graph from "./Graph.svelte"
  import Edges from "./Edges.svelte"
  import { toDirectedGraph } from "@xstate/graph"
  import CanvasContainer from "./canvas/CanvasContainer.svelte"

  export let service: AnyActor
  let definition = useSelector(service, (state) => state.context.machine.definition)
  const digraph = toDirectedGraph($definition)
  console.log({digraph})
</script>

<CanvasContainer>
  <Graph {digraph} />
  <StateNodeViz definition={$definition} {service} />
</CanvasContainer>
<Edges {service} />
