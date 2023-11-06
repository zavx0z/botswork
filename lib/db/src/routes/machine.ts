import { assign, createMachine } from "xstate"

export type types = {
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
}
export default createMachine(
  {
    id: "db",
    context: {
      output: {
        path: undefined,
        version: undefined,
        fs: undefined,
        size: undefined,
      },
    },
    initial: "db-worker-load",
    states: {
      "db-worker-load": {
        invoke: {
          id: "worker-import",
          src: "worker-import",
          onDone: { target: "db-worker-active", actions: "ctx_output" },
          onError: { target: "error", actions: "ctx_error" },
        },
      },
      "db-worker-active": {
        invoke: { src: "msg" },
        type: "final"
      },
      error: {
        type: "final",
      },
    },
    types: {} as types,
  },
  {
    actions: {
      ctx_output: assign(({ event }) => ({ output: event.output })),
      ctx_error: assign(({ event }) => ({ error: event.data as ErrorMachine })),
    },
  },
)
