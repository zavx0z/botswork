import { createMachine } from "xstate"
import type { LayoutLoad } from "./$types"
import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"

export const load: LayoutLoad = async () => {
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
  return { machine, directedGraph }
}
