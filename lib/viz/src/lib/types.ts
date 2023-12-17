import type { ElkEdgeSection, ElkExtendedEdge, ElkNode } from "elkjs"
import type { TransitionDefinition, AnyStateNode, StateNode } from "@lib/machine"
import type { StateNodeDefinition } from "@lib/machine"

export type MachineJSON = StateNodeDefinition<any, any, any>

export type RelativeNodeEdgeMap = [Map<string | undefined, string[]>, Map<string, string | undefined>]
export type NodeState = {
  id: string
  activates: []
  entry: string[]
  exit: string[]
  invoke: string[]
  history: boolean
  initial: string
  key: string
  type: string
  meta: {
    layout: {
      width: number
      height: number
      x: number
      y: number
    }
  }
  on: {
    [key: string]: {
      actions: []
      event: string
      eventType: string
      internal: boolean
      source: string
      target: string[]
    }[]
  }
  order: number
  parent: string
  predictableActionArguments?: boolean
  tags: string[]
  transitions: {
    actions: []
    event: string
    eventType: string
    internal: boolean
    source: string
    target: string[]
  }[]
  states: { [key: string]: NodeState }
}

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
