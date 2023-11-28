import { createEmptyActor, type AnyActorScope } from "xstate"
import type { AnyEventObject, MachineContext, StateNode, TransitionDefinition } from "xstate"

export const createMockActorContext = (): AnyActorScope => {
  const emptyActor = createEmptyActor()
  return {
    self: emptyActor,
    logger: console.log,
    id: "",
    sessionId: Math.random().toString(32).slice(2),
    defer: () => {},
    system: emptyActor.system!, // TODO: mock system?
    stopChild: () => {},
  }
}
export const mockActorContext: AnyActorScope = createMockActorContext()
export function flatten<T>(array: Array<T | T[]>): T[] {
  return ([] as T[]).concat(...array)
}
export interface Edge<TContext extends MachineContext, TEvent extends AnyEventObject, TEventType extends TEvent["type"] = string> {
  event: TEventType
  source: StateNode<TContext, TEvent>
  target: StateNode<TContext, TEvent>
  transition: TransitionDefinition<TContext, TEvent>
  order: number
}

export function getChildren(stateNode: StateNode): StateNode[] {
  if (!stateNode.states) return []
  const children = Object.keys(stateNode.states).map((key) => stateNode.states[key])
  // children.sort((a, b) => b.order - a.order)
  return children
}

export function getEdges(stateNode: StateNode): Array<Edge<any, any, any>> {
  const edges: Array<Edge<any, any, any>> = []
  if (stateNode.on)
    Object.keys(stateNode.on).forEach((eventType, order) => {
      const transitions = stateNode.on[eventType]
      transitions.forEach((t) => {
        const targets = t.target && t.target.length > 0 ? t.target : [stateNode]
        targets.forEach((target) => {
          edges.push({
            event: eventType,
            source: stateNode,
            target,
            transition: t,
            order,
          })
        })
      })
    })
  return edges
}

export function getAllEdges(stateNode: StateNode): Array<Edge<any, any, any>> {
  const children = getChildren(stateNode)
  return flatten([...getEdges(stateNode), ...children.map((child) => getAllEdges(child))])
}
