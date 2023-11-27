<script lang="ts">
  import type { AnyActor, AnyStateNode } from "xstate"
  // import TransitionViz from "../TransitionViz.svelte"
  import { useSelector } from "@xstate/svelte"
  import StateNodeViz from "../StateNodeViz.svelte"
  import type { DirectedGraphEdge } from "@xstate/graph"

  export let elkActor: AnyActor
  export let edges: DirectedGraphEdge[]
  const stateNode = useSelector<any, AnyStateNode, any>(elkActor, (state) => state.context.elkGraph?.node?.stateNode)
</script>

{#if $stateNode}
  <StateNodeViz stateNode={$stateNode} />
{/if}
<!-- {#each edges as edge, idx (idx)}
  <TransitionViz {edge} />
{/each} -->
