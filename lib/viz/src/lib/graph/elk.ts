import { onRect } from "$lib/getRect"
import type { ElkEdgeSection, ElkNode, LayoutOptions } from "elkjs"
import ELK from "elkjs"
import type { StateNode } from "xstate"
import type { StateElkEdge, StateElkNode } from "./types"
import { getElkChild, getElkEdge, getRelativeNodeEdgeMap } from "./utils"
import type { DirectedGraphNode } from "./directedGraph"

const elk = new ELK({ defaultLayoutOptions: {} })
const rootLayoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.algorithm": "layered",
  "elk.layered.crossingMinimization.semiInteractive": "true",
}

export async function getElkGraph(digraph: DirectedGraphNode): Promise<ElkNode> {
  await new Promise((res) => {
    onRect(digraph.id, (data) => {
      res(void 0)
    })
  })

  const rMap = getRelativeNodeEdgeMap(digraph)
  const rootEdges = rMap[0].get(undefined) || []

  const elkNode: ElkNode = {
    id: "root",
    edges: rootEdges.map(getElkEdge),
    children: [getElkChild(digraph, rMap)],
    layoutOptions: rootLayoutOptions,
  }

  const layoutElkNode = await elk.layout(elkNode)

  const stateNodeToElkNodeMap = new Map<StateNode, StateElkNode>()

  const setEdgeLayout = (edge: StateElkEdge) => {
    const lca = rMap[1].get(edge.id)
    const elkLca = lca && stateNodeToElkNodeMap.get(lca)!

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
