<script lang="ts">
  import { StateMachine, type AnyActor, type AnyStateNode, type AnyStateMachine } from "xstate"
  import type { DirectedGraphNode, DirectedGraphEdge } from "./graph/directedGraph"
  import StateNodeViz from "./StateNodeViz.svelte"
  import { getContext, onMount } from "svelte"
  import { getElkGraph } from "./graph/elk"
  import { getChildren } from "./utils"

  const service: AnyActor = getContext("service")
  let digraph = toDirectedGraph(service.getSnapshot().context.machine.root)
  export function flatten<T>(array: Array<T | T[]>): T[] {
    return ([] as T[]).concat(...array)
  }
  export function toDirectedGraph(stateMachine: AnyStateNode | AnyStateMachine): DirectedGraphNode {
    const stateNode = stateMachine instanceof StateMachine ? stateMachine.root : stateMachine
    const edges: DirectedGraphEdge[] = flatten(
      [...stateNode.transitions.values(), stateNode.always ? stateNode.always : []].flat().map((t, transitionIndex) => {
        const targets = t.target ? t.target : [stateNode]

        return targets.map((target, targetIndex) => {
          const edge: DirectedGraphEdge = {
            id: `${stateNode.id}:${transitionIndex}:${targetIndex}`,
            source: stateNode as AnyStateNode,
            target: target as AnyStateNode,
            transition: t,
            label: { text: t.eventType, x: 0, y: 0 },
          }
          return edge
        })
      }),
    )
    const graph: DirectedGraphNode = {
      id: stateNode.id,
      stateNode: stateNode as AnyStateNode,
      children: getChildren(stateNode as AnyStateNode).map(toDirectedGraph),
      edges,
    }
    return graph
  }

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
