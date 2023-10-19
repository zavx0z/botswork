import type { DirectedGraphNode } from "@xstate/graph"
import { assign, createMachine, fromPromise } from "xstate"
import { getElkGraph } from "./elk"
import type { StateElkNode } from "./types"

export default createMachine(
  {
    context: ({ input }) => ({
      elkGraph: undefined,
      digraph: input.digraph,
    }),
    types: {} as {
      context: {
        elkGraph: StateElkNode | undefined
        digraph: DirectedGraphNode
      }
      input: {
        digraph: DirectedGraphNode
      }
      events: { type: "GRAPH_UPDATED"; digraph: DirectedGraphNode }
    },
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "getElk",
          input: ({ context }) => context.digraph,
          onDone: {
            target: "success",
            actions: assign({ elkGraph: ({ event: { output } }: { event: { output: StateElkNode } }) => output }),
          },
        },
      },
      success: {
        on: {
          GRAPH_UPDATED: {
            target: "loading",
            actions: assign({
              digraph: ({ event }) => {
                console.log(event)
                return event.digraph
              },
            }),
          },
        },
      },
    },
  },
  {
    actors: {
      getElk: fromPromise(async ({ input }) => {
        const data = await getElkGraph(input as DirectedGraphNode)
        return data
      }),
    },
  },
)
