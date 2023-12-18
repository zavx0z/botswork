import type { ElkEdgeSection, ElkExtendedEdge, ElkNode } from "elkjs"
import type { TransitionDefinition, AnyStateNode, StateNode } from "@metafor/machine"
import type { StateNodeDefinition } from "@metafor/machine"

// export type NodeState = {
//   id: string
//   entry: string[]
//   exit: string[]
//   invoke: string[]
//   history: string | boolean | undefined
//   initial: string | number | symbol | undefined
//   key: string
//   type: string
//   meta: {
//     layout: GraphLayout
//   }
//   order: number
//   parent: string | undefined
//   tags: string[]
//   children: string[]
// }
// export type EdgeTransition = {
//   id: string
//   source: string
//   target: string
//   label: GraphLayout & { text: string }
//   transition: import("@metafor/machine").TransitionDefinition<any, any>
//   sections: import("elkjs").ElkEdgeSection[]
// }
export type MachineJSON = StateNodeDefinition<any, any, any> & { transition: string[] }

export type RelativeNodeEdgeMap = [Map<string | undefined, string[]>, Map<string, string | undefined>]
export type GraphEdge = {
  id: string
  source: string
  target: string
  label: DirectedGraphLabel
  transition: TransitionDefinition<any, any>
  sections: ElkEdgeSection[]
}

export type DirectedGraphLabel = {
  text: string
  x: number
  y: number
  width: number
  height: number
}
export type DirectedGraphEdge = {
  id: string
  source: AnyStateNode
  target: AnyStateNode
  label: DirectedGraphLabel
  transition: TransitionDefinition<any, any>
  sections: ElkEdgeSection[]
}
export type DirectedGraphNode = {
  id: string
  stateNode: StateNode
  children: DirectedGraphNode[]
  edges: DirectedGraphEdge[]
}

export interface StateElkEdge extends ElkExtendedEdge {
  edge: GraphEdge
}
export interface StateElkNode extends ElkNode {
  absolutePosition: Point
  edges: ElkExtendedEdge[]
}
export interface Point {
  x: number
  y: number
}
