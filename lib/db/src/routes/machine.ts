import { assign, createMachine } from "xstate"

export default createMachine(
  {
    id: "db",
    types: {} as {
      context: {
        input?: {}
        output: {
          path: string | undefined
          version: string | undefined
          fs: string | undefined
          size: number | undefined
        }
        error?: ErrorMachine
      }
    },
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
  },
  {
    actions: {
      ctx_output: assign(({ event }) => ({ output: event.output })),
      ctx_error: assign(({ event }) => ({ error: event.data as ErrorMachine })),
    },
  },
)
