<script lang="ts">
  import type { StateNode } from "xstate"
  import StateNodeViz from "../StateNodeViz.svelte"
  import type { DirectedGraphEdge, AnyStateNode } from "@xstate/graph"
  import TransitionViz from "$lib/TransitionViz.svelte"

  let { edges, stateNode } = $props<{ edges: DirectedGraphEdge[]; stateNode: AnyStateNode }>()
  const stateNodeFixedType = stateNode as unknown as StateNode<any, any>
</script>

{#if stateNode}
  <StateNodeViz stateNode={stateNodeFixedType} />
{/if}
{#each edges as edge (edge.id)}
  <TransitionViz {edge} />
{/each}
