<script lang="ts">
  import ELK from "elkjs"
  import { StateMachine } from "xstate"
  import StateNodeViz from "./StateNodeViz.svelte"
  import { getContext, onMount, tick } from "svelte"
  import type { ElkEdgeSection, ElkNode } from "elkjs"
  import type { StateNode, AnyActor, AnyStateNode, AnyStateMachine } from "xstate"
  import type { StateElkNode, StateElkEdge, DirectedGraphNode, DirectedGraphEdge, RelativeNodeEdgeMap } from "./types"
  import TransitionViz from "./event/TransitionViz.svelte"
  import EdgeViz from "./edge/EdgeViz.svelte"

  const service: AnyActor = getContext("service")
  const machine = service.getSnapshot().context.machine.root
  let edges = $state<{ [key: string]: DirectedGraphEdge }>({})
  let nodes = $state<{ [key: string]: AnyStateNode }>({})

  const elk = new ELK({ defaultLayoutOptions: {} })
  const getElkChildren = (node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): ElkNode[] => node.children.map((childNode) => getElkChild(childNode, rMap))
  function getElkChild(node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): StateElkNode {
    const layout = nodes[node.id].meta.layout
    const edges = rMap[0].get(node.stateNode) || []
    return {
      id: node.id,
      ...(!node.children.length ? { width: layout.width, height: layout.height } : undefined),
      node,
      ...(node.children.length ? { children: getElkChildren(node, rMap) } : undefined),
      absolutePosition: { x: 0, y: 0 },
      edges: edges.map(getElkEdge),
      layoutOptions: {
        "elk.padding": `[top=${(layout.height || 0) + 30}, left=30, right=30, bottom=30]`,
        hierarchyHandling: "INCLUDE_CHILDREN",
      },
    }
  }
  const getElkEdge = (edge: DirectedGraphEdge) => ({
    id: edge.id,
    sources: [edge.source.id],
    targets: [edge.target.id],
    labels: [
      {
        id: edge.id + "--label",
        width: edges[edge.id].label.width,
        height: edges[edge.id].label.height,
        text: edge.label.text || "always",
        layoutOptions: {
          "edgeLabels.inline": "true",
          "edgeLabels.placement": "CENTER",
        },
      },
    ],
    edge,
    sections: [],
  })
  function getRelativeNodeEdgeMap(digraph: DirectedGraphNode): RelativeNodeEdgeMap {
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
    Object.values(edges).forEach((edge) => {
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
      nodes[elkNode.id].meta = {
        layout: {
          width: elkNode.width!,
          height: elkNode.height!,
          x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
          y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
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
    function toDirectedGraph(stateMachine: AnyStateNode | AnyStateMachine): DirectedGraphNode {
      const stateNode = stateMachine instanceof StateMachine ? stateMachine.root : stateMachine
      const egs: DirectedGraphEdge[] = flatten(
        [...stateNode.transitions.values(), stateNode.always ? stateNode.always : []].flat().map((t, transitionIndex) => {
          const targets = t.target ? t.target : [stateNode]

          return targets.map((target, targetIndex) => {
            const edge: DirectedGraphEdge = {
              id: `${stateNode.id}:${transitionIndex}:${targetIndex}`,
              source: stateNode as AnyStateNode,
              target: target as AnyStateNode,
              transition: t,
              sections: [],
              label: { text: t.eventType, x: 0, y: 0, width: 0, height: 0 },
            }
            edges[edge.id] = edge
            return edge
          })
        }),
      )
      const graph: DirectedGraphNode = {
        id: stateNode.id,
        stateNode: stateNode as AnyStateNode,
        children: getChildren(stateNode as AnyStateNode).map(toDirectedGraph),
        edges: egs,
      }
      nodes[graph.id] = graph.stateNode
      return graph
    }
    let digraph = toDirectedGraph(machine)
    await tick()
    getElkGraph(digraph)
  })

  let activeIds = $state(service.getSnapshot().context.state._nodes.map((i: AnyStateNode) => i.id))
  let previewIds: string[] = $state([])
  onMount(() => {
    const { unsubscribe } = service.subscribe((state) => {
      previewIds = state.context.previewEvent ? state.context.machine.transition(state.context.state, { type: state.context.previewEvent })._nodes.map((i: AnyStateNode) => i.id) : []
      activeIds = state.context.state._nodes.map((i: AnyStateNode) => i.id)
    })
    return () => {
      unsubscribe()
    }
  })
</script>

<StateNodeViz {nodes} {activeIds} {previewIds} />
<EdgeViz {edges} {nodes} {activeIds} />
<TransitionViz {edges} {activeIds} />
