<script lang="ts">
  import type { AnyStateNode, StateNode } from "xstate"
  import StateNodeViz from "../StateNodeViz.svelte"
  import TransitionViz from "$lib/TransitionViz.svelte"
  import type { DirectedGraphEdge } from "./directedGraph"

  let { edges, stateNode } = $props<{ edges: DirectedGraphEdge[]; stateNode: AnyStateNode }>()
  const stateNodeFixedType = stateNode as unknown as StateNode<any, any>
</script>

{#if stateNode}
  <StateNodeViz stateNode={stateNodeFixedType} />
{/if}
{#each edges as edge (edge.id)}
  <TransitionViz {edge} />
{/each}
