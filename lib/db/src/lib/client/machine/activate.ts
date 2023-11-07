import { assign, createMachine, sendTo } from "xstate"

type contextType = {
  input?: {}
  output: {
    path: string | undefined
    version: string | undefined
    fs: string | undefined
    size: number | undefined
  }
  error?: ErrorMachine
}

export const machine = createMachine(
  {
    id: "db",
    types: {} as { context: contextType },
    context: {
      output: {
        path: undefined,
        version: undefined,
        fs: undefined,
        size: undefined,
      },
    },
    initial: "load",
    states: {
      load: {
        invoke: {
          id: "worker-import",
          src: "worker-import",
          onDone: { target: "active", actions: "ctx_output" },
          onError: { target: "error", actions: "ctx_error" },
        },
      },
      active: {
        type: "final",
      },
      error: {
        type: "final",
      },
    },
    output: ({ context }) => context.output,
  },
  {
    actions: {
      ctx_output: assign(({ event }) => ({ output: event.output })),
      ctx_error: assign(({ event }) => ({ error: event.data as ErrorMachine })),
    },
  },
)
