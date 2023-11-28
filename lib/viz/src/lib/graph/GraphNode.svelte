<script lang="ts">
  import type { AnyActor, AnyStateNode } from "xstate"
  import TransitionViz from "../event/TransitionViz.svelte"
  import { useSelector } from "@xstate/svelte"
  import StateNodeViz from "../StateNodeViz.svelte"
  import type { DirectedGraphEdge } from "./directedGraph"

  let { elkActor, edges } = $props<{ elkActor: AnyActor; edges: DirectedGraphEdge[] }>()
  const stateNode = useSelector<any, AnyStateNode, any>(elkActor, (state) => state.context.elkGraph?.node?.stateNode)
</script>

{#if $stateNode}
  <StateNodeViz stateNode={$stateNode} />
{/if}
{#each edges as edge (edge.id)}
  <TransitionViz {edge} />
{/each}
