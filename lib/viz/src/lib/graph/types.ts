import type { Point } from "$lib/edge/pathUtils"

import type { ElkExtendedEdge, ElkNode } from "elkjs"
import type { StateNode } from "xstate"
import type { DirectedGraphEdge, DirectedGraphNode } from "./directedGraph"

export type RelativeNodeEdgeMap = [Map<StateNode | undefined, DirectedGraphEdge[]>, Map<string, StateNode | undefined>]

export interface StateElkEdge extends ElkExtendedEdge {
  edge: DirectedGraphEdge
}
export interface StateElkNode extends ElkNode {
  node: DirectedGraphNode
  absolutePosition: Point
  edges: StateElkEdge[]
}
