import type { DirectedGraphNode } from "@xstate/graph"
import { assign, createMachine, fromPromise } from "xstate"
import { getElkGraph } from "./elk"
import type { ElkNode } from "elkjs"

export default createMachine(
  {
    context: ({ input }) => ({
      elkGraph: undefined,
      digraph: input.digraph,
    }),
    types: {} as {
      context: {
        elkGraph: ElkNode | undefined
        digraph: DirectedGraphNode
      }
      input: {
        digraph: DirectedGraphNode
      }
    },
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "getElk",
          input: ({ context }) => context.digraph,
          onDone: {
            target: "success",
            actions: assign({ elkGraph: ({ event: { output } }: { event: { output: ElkNode } }) => output }),
          },
        },
      },
      success: {},
    },
  },
  {
    actors: {
      getElk: fromPromise(({ input }) => getElkGraph(input as DirectedGraphNode)),
    },
  },
)
