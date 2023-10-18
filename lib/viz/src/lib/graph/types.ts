import type { Point } from "$lib/pathUtils"
import type { DirectedGraphEdge, DirectedGraphNode } from "@xstate/graph"
import type { ElkExtendedEdge, ElkNode } from "elkjs"
import type { StateNode } from "xstate"

export type RelativeNodeEdgeMap = [Map<StateNode | undefined, DirectedGraphEdge[]>, Map<string, StateNode | undefined>]

export interface StateElkEdge extends ElkExtendedEdge {
  edge: DirectedGraphEdge
}
export interface StateElkNode extends ElkNode {
  node: DirectedGraphNode
  absolutePosition: Point
  edges: StateElkEdge[]
}
