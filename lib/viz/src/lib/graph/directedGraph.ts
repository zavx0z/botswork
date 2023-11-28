import { flatten, getChildren } from "$lib/utils"
import { StateMachine, type AnyStateMachine, type AnyStateNode, type TransitionDefinition, StateNode } from "xstate"

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
    edges
  }
  return graph
}
