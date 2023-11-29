import type { AnyStateNode, TransitionDefinition, StateNode } from "xstate"

export type DirectedGraphLabel = { text: string; x: number; y: number }
export type DirectedGraphEdge = {
  id: string
  source: AnyStateNode
  target: AnyStateNode
  label: DirectedGraphLabel
  transition: TransitionDefinition<any, any>
}
export type DirectedGraphNode = {
  id: string
  stateNode: StateNode
  children: DirectedGraphNode[]
  edges: DirectedGraphEdge[]
}
