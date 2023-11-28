import { getRect, readRect } from "$lib/getRect"
import type { ElkNode } from "elkjs"
import type { StateNode } from "xstate"
import type { RelativeNodeEdgeMap, StateElkNode } from "./types"
import type { DirectedGraphEdge, DirectedGraphNode } from "./directedGraph"

export function getAllEdges(digraph: DirectedGraphNode): DirectedGraphEdge[] {
  const edges: DirectedGraphEdge[] = []
  const getEdgesRecursive = (dnode: DirectedGraphNode) => {
    edges.push(...dnode.edges)
    dnode.children.forEach(getEdgesRecursive)
  }
  getEdgesRecursive(digraph)
  return edges
}

export function getRelativeNodeEdgeMap(digraph: DirectedGraphNode): RelativeNodeEdgeMap {
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

export function getElkEdge(edge: DirectedGraphEdge) {
  const edgeRect = readRect(edge.id)
  return {
    id: edge.id,
    sources: [edge.source.id],
    targets: [edge.target.id],
    labels: [
      {
        id: edge.id + "--label",
        width: edgeRect?.width ?? 0,
        height: edgeRect?.height ?? 100,
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

export const getElkChildren = (node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): ElkNode[] => node.children.map((childNode) => getElkChild(childNode, rMap))

export function getElkChild(node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): StateElkNode {
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
