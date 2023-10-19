<script lang="ts">
  import type { StateNode } from "xstate"
  import StateNodeViz from "../StateNodeViz.svelte"
  import type { DirectedGraphEdge, AnyStateNode } from "@xstate/graph"
  export let edges: DirectedGraphEdge[]
  export let stateNode: AnyStateNode
  const stateNodeFixedType = stateNode as unknown as StateNode<any, any>
</script>

{#if stateNode}
  <StateNodeViz stateNode={stateNodeFixedType} />
{/if}
{#each edges as edge, idx (idx)}
  <!-- <TransitionViz {edge} /> -->
{/each}
