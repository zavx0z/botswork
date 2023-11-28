import { flatten, getChildren } from "$lib/utils"
import { StateMachine, type AnyStateMachine, type AnyStateNode, type TransitionDefinition, StateNode } from "xstate"
export type JSONSerializable<T extends object, U> = T & {
  toJSON: () => U
}

export type DirectedGraphLabel = JSONSerializable<{ text: string }, { text: string }>
export type DirectedGraphEdge = JSONSerializable<
  {
    id: string
    source: AnyStateNode
    target: AnyStateNode
    label: DirectedGraphLabel
    transition: TransitionDefinition<any, any>
  },
  { source: string; target: string; label: ReturnType<DirectedGraphLabel["toJSON"]> }
>
export type DirectedGraphNode = JSONSerializable<
  {
    id: string
    stateNode: StateNode
    children: DirectedGraphNode[]
    edges: DirectedGraphEdge[]
  },
  { id: string; children: DirectedGraphNode[] }
>
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
          label: {
            text: t.eventType,
            toJSON: () => ({ text: t.eventType }),
          },
          toJSON: () => {
            const { label } = edge
            return { source: stateNode.id, target: target.id, label }
          },
        }
        return edge
      })
    }),
  )
  const graph = {
    id: stateNode.id,
    stateNode: stateNode as AnyStateNode,
    children: getChildren(stateNode as AnyStateNode).map(toDirectedGraph),
    edges,
    toJSON: () => {
      const { id, children, edges: graphEdges } = graph
      return { id, children, edges: graphEdges }
    },
  }
  return graph
}
