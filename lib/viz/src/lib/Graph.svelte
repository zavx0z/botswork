<script lang="ts">
  import ELK from "elkjs"
  import { StateMachine } from "xstate"
  import StateNodeViz from "./StateNodeViz.svelte"
  import { getContext, onMount, tick } from "svelte"
  import type { ElkEdgeSection, ElkNode } from "elkjs"
  import type { StateNode, AnyActor, AnyStateNode, AnyStateMachine } from "xstate"
  import type { StateElkNode, StateElkEdge, DirectedGraphNode, DirectedGraphEdge, RelativeNodeEdgeMap } from "./types"
  import { getRect, readRect } from "./getRect"
  import TransitionViz from "./event/TransitionViz.svelte"

  let edges = $state<{ [key: string]: DirectedGraphEdge }>({})

  const elk = new ELK({ defaultLayoutOptions: {} })

  const getElkChildren = (node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): ElkNode[] => {
    return node.children.map((childNode) => {
      return getElkChild(childNode, rMap)
    })
  }

  function getElkChild(node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): StateElkNode {
    const nodeRect = getRect(node.id)
    const contentRect = readRect(`${node.id}:content`)
    const edges = rMap[0].get(node.stateNode) || []
    return {
      id: node.id,
      ...(!node.children.length ? { width: nodeRect?.width, height: nodeRect?.height } : undefined),
      node,
      ...(node.children.length ? { children: getElkChildren(node, rMap) } : undefined),
      absolutePosition: { x: 0, y: 0 },
      edges: edges.map(getElkEdge),
      layoutOptions: {
        "elk.padding": `[top=${(contentRect?.height || 0) + 30}, left=30, right=30, bottom=30]`,
        hierarchyHandling: "INCLUDE_CHILDREN",
      },
    }
  }

  function getElkEdge(edge: DirectedGraphEdge) {
    // const edgeRect = readRect(edge.id)
    return {
      id: edge.id,
      sources: [edge.source.id],
      targets: [edge.target.id],
      labels: [
        {
          id: edge.id + "--label",
          width: edge.label.width,
          height: edge.label.height,
          text: edge.label.text || "always",
          layoutOptions: {
            "edgeLabels.inline": "true",
            "edgeLabels.placement": "CENTER",
          },
        },
      ],
      edge,
      sections: [],
    }
  }
  function getAllEdges(digraph: DirectedGraphNode): DirectedGraphEdge[] {
    const edges: DirectedGraphEdge[] = []
    const getEdgesRecursive = (dnode: DirectedGraphNode) => {
      // dnode.edges.forEach((i) => console.log(i.label))
      edges.push(...dnode.edges)
      dnode.children.forEach(getEdgesRecursive)
    }
    getEdgesRecursive(digraph)
    return edges
  }
  function getRelativeNodeEdgeMap(digraph: DirectedGraphNode): RelativeNodeEdgeMap {
    const edges = getAllEdges(digraph)
    const map: RelativeNodeEdgeMap[0] = new Map()
    const edgeMap: RelativeNodeEdgeMap[1] = new Map()
    const getLCA = (a: StateNode, b: StateNode): StateNode | undefined => {
      if (a === b) return a.parent
      const set = new Set()
      let m = a.parent
      while (m) {
        set.add(m)
        m = m.parent
      }
      m = b
      while (m) {
        if (set.has(m)) return m
        m = m.parent
      }
      //@ts-ignore
      return a.machine // root
    }
    edges.forEach((edge) => {
      //@ts-ignore
      const lca = getLCA(edge.source, edge.target)
      if (!map.has(lca)) map.set(lca, [])
      map.get(lca)!.push(edge)
      edgeMap.set(edge.id, lca)
    })
    return [map, edgeMap]
  }
  async function getElkGraph(digraph: DirectedGraphNode): Promise<ElkNode> {
    const rMap = getRelativeNodeEdgeMap(digraph)
    const rootEdges = rMap[0].get(undefined) || []
    const elkNode: ElkNode = {
      id: "root",
      edges: rootEdges.map(getElkEdge),
      children: [getElkChild(digraph, rMap)],
      layoutOptions: {
        "elk.hierarchyHandling": "INCLUDE_CHILDREN",
        "elk.algorithm": "layered",
        "elk.layered.crossingMinimization.semiInteractive": "true",
      },
    }
    const layoutElkNode = await elk.layout(elkNode)
    const stateNodeToElkNodeMap = new Map<StateNode, StateElkNode>()
    const setEdgeLayout = (edge: StateElkEdge) => {
      const lca = rMap[1].get(edge.id)

      const elkLca = lca && stateNodeToElkNodeMap.get(lca)!
      edges[edge.id].label.x = elkLca?.x || 0
      edges[edge.id].label.y = elkLca?.y || 0

      //@ts-ignore
      const translatedSections: ElkEdgeSection[] = elkLca
        ? //@ts-ignore
          edge.sections.map((section) => ({
            ...section,
            startPoint: {
              x: section.startPoint.x + elkLca.absolutePosition.x,
              y: section.startPoint.y + elkLca.absolutePosition.y,
            },
            endPoint: {
              x: section.endPoint.x + elkLca.absolutePosition.x,
              y: section.endPoint.y + elkLca.absolutePosition.y,
            },
            bendPoints: section.bendPoints?.map((bendPoint) => {
              return {
                x: bendPoint.x + elkLca.absolutePosition.x,
                y: bendPoint.y + elkLca.absolutePosition.y,
              }
            }),
          }))
        : edge.sections
      //@ts-ignore
      edge.edge.sections = translatedSections
      edge.edge.label.x = (edge.labels?.[0].x || 0) + (elkLca?.absolutePosition.x || 0)
      edge.edge.label.y = (edge.labels?.[0].y || 0) + (elkLca?.absolutePosition.y || 0)
    }
    const setLayout = (elkNode: StateElkNode, parent: StateElkNode | undefined) => {
      stateNodeToElkNodeMap.set(elkNode.node.stateNode, elkNode)
      elkNode.absolutePosition = {
        x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
        y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
      }
      elkNode.node.stateNode.meta = {
        layout: {
          width: elkNode.width!,
          height: elkNode.height!,
          x: elkNode.x!,
          y: elkNode.y!,
        },
      }
      elkNode.edges?.forEach((edge) => {
        setEdgeLayout(edge)
      })
      elkNode.children?.forEach((cn) => {
        setLayout(cn as StateElkNode, elkNode)
      })
    }
    ;(layoutElkNode.edges as StateElkEdge[])?.forEach(setEdgeLayout)
    setLayout(layoutElkNode.children![0] as StateElkNode, undefined)
    return layoutElkNode.children![0]
  }

  const service: AnyActor = getContext("service")
  const machine = service.getSnapshot().context.machine.root
  let node = $state<AnyStateNode>()

  export function flatten<T>(array: Array<T | T[]>): T[] {
    return ([] as T[]).concat(...array)
  }

  function getChildren(stateNode: StateNode): StateNode[] {
    if (!stateNode.states) return []
    const children = Object.keys(stateNode.states).map((key) => stateNode.states[key])
    children.sort((a, b) => b.order - a.order)
    return children
  }
  onMount(async () => {
    let egs: { [key: string]: DirectedGraphEdge } = {}
    function toDirectedGraph(stateMachine: AnyStateNode | AnyStateMachine): DirectedGraphNode {
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
              label: { text: t.eventType, x: 0, y: 0, width: 0, height: 0 },
            }
            egs[edge.id] = edge
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
    let digraph = toDirectedGraph(machine)
    edges = egs
    await tick()
    //@ts-ignore
    getElkGraph(digraph)
      //@ts-ignore
      .then((result) => (node = result.node.stateNode))
  })
</script>

<StateNodeViz stateNode={node ? node : machine} />
{#each Object.entries(edges) as [id, edge] (id)}
  <TransitionViz {edge} />
{/each}
<!-- <svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
    {#each edges as edge, order (edge.id)}
      <EdgeViz {edge} {order} />
    {/each}
  </svg> -->
