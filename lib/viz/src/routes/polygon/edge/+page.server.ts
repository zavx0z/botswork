import { createMachine } from "xstate"
import type { PageServerLoad } from "./$types"
import { Window } from "happy-dom"
import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"
import { stringify } from "javascript-stringify"
import { img } from "./img"
import { renderCode } from "@lib/code"
const machine = createMachine(
  {
    context: {
      count: 0,
    },
    id: "machine",
    entry: {
      type: "inc",
    },
    initial: "started",
    states: {
      started: {
        on: {
          finish: {
            target: "final",
          },
          increment: {
            actions: "inc",
          },
        },
      },
      final: {
        type: "final",
      },
    },
  },
  {
    actions: { inc: ({ context, event }) => {} },
    actors: {},
    guards: {},
    delays: {},
  },
)
const directedGraph: DirectedGraphNode = toDirectedGraph(machine.definition as any)
export const load = (async ({ locals }) => {
  const { CodeRenderer } = locals
  const DirectedGraphEdge = renderCode(
    CodeRenderer,
    `
  type DirectedGraphEdge = {
    id: string
    source: AnyStateNode
    target: AnyStateNode
    label: DirectedGraphLabel
    transition: TransitionDefinition<any, any>
}`,
    {lineno: true},
  )
  const TransitionDefinition = renderCode(
    CodeRenderer,
    `
  export interface TransitionDefinition<TContext, TEvent extends EventObject> extends Omit<TransitionConfig<TContext, TEvent, any>, 'actions'> {
    target: Array<StateNode<TContext, any, TEvent>> | undefined;
    source: StateNode<TContext, any, TEvent>;
    actions: Array<ActionObject<TContext, TEvent>>;
    cond?: Guard<TContext, TEvent>;
    eventType: TEvent['type'] | NullEvent['type'] | '*';
    toJSON: () => {};
}`,
    {lineno: true,},
  )
  return {
    streamed: {
      Edge: renderCode(CodeRenderer, `const childrenFirstEdgeFirst = ${stringify(directedGraph.children[0].edges[0], null, 2)}`, { lang: "javascript", lineno: true }),
      DirectedGraphEdge,
      TransitionDefinition,
      img: new Promise<string>((resolve) => setTimeout(() => resolve(img), 0)),
    },
  }
}) satisfies PageServerLoad
