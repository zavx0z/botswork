<script lang="ts">
  import type { AnyActor, AnyStateNode } from "xstate"
  import { toDirectedGraph, type DirectedGraphNode, type DirectedGraphEdge } from "./graph/directedGraph"
  import StateNodeViz from "./StateNodeViz.svelte"
  import { getContext, onMount } from "svelte"
  import { getElkGraph } from "./graph/elk"

  const service: AnyActor = getContext("service")
  let digraph = toDirectedGraph(service.getSnapshot().context.machine.root)

  let edges = $state<DirectedGraphEdge[]>([])
  onMount(async () => {
    const egs: DirectedGraphEdge[] = []
    const getEdgesRecursive = (dnode: DirectedGraphNode) => {
      egs.push(...dnode.edges)
      dnode.children.forEach(getEdgesRecursive)
    }
    getEdgesRecursive(digraph)
    edges = egs
  })


  let node = $state<AnyStateNode>()
  $effect(() => {
    //@ts-ignore
    edges && getElkGraph(digraph).then((result) => (node = result.node.stateNode))
  })
</script>

{#if node}
  <StateNodeViz stateNode={node} {edges} />
{:else if edges.length > 0}
  <div class="opacity-0">
    <!-- расчет -->
    <StateNodeViz stateNode={digraph.stateNode} {edges} />
  </div>
{/if}
<!-- <svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
    {#each edges as edge, order (edge.id)}
      <EdgeViz {edge} {order} />
    {/each}
  </svg> -->
