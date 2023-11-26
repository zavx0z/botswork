import type { Complete, Progress } from "$lib/types"
import { assign, createMachine, raise } from "xstate"

type Input = {
  dir: string
  url: string
  corsProxy: string
}
export interface Context {
  input: Input
  output?: object
  progress?: Progress
  complete?: Complete
}

export default createMachine(
  {
    id: "git-clone",
    types: {} as {
      context: Context
      input: Input
      output: Complete
    },
    context: ({ input }) => ({ input }),
    invoke: {
      src: "git-clone",
      input: ({ context }) => context.input,
    },
    on: {
      "complete.success": { target: ".complete", actions: ["complete_success_ctx"] },
      "complete.error": { target: ".complete", actions: ["complete_error_ctx"] },
    },
    initial: "process",
    states: {
      process: {},

      complete: {
        type: "final",
      },
    },
    output: ({ context }) => context.complete,
  },
  {
    actions: {
      complete_error_ctx: assign(({ event }) => ({ complete: { status: "error" as Complete["status"], message: event.params.message } })),
      complete_success_ctx: assign(({ event }) => ({ complete: { status: "success" as Complete["status"], message: event.params.message } })),
    },
  },
)
