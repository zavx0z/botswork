<script lang="ts">
  import type { StateNode } from "xstate"
  import StateNodeViz from "../StateNodeViz.svelte"
  import type { DirectedGraphEdge, AnyStateNode } from "@xstate/graph"

  type Props = { edges: DirectedGraphEdge[]; stateNode: AnyStateNode }
  let { edges, stateNode } = $props<Props>()
  const stateNodeFixedType = stateNode as unknown as StateNode<any, any>
</script>

{#if stateNode}
  <StateNodeViz stateNode={stateNodeFixedType} />
{/if}
<!-- {#each edges as edge, idx (idx)}
  <TransitionViz {edge} />
{/each} -->
