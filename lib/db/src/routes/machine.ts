import { assign, createMachine } from "xstate"
export type types = {
  context: {
    input: {}
    output: {
      path: string | undefined
      version: string | undefined
      fs: string | undefined
      size: number | undefined
    }
    error?: {}
  }
}
export default createMachine(
  {
    context: {
      input: {},
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
          onError: { target: "error", actions: "error_ctx" },
        },
      },
      "db-worker-active": {
        invoke: { src: "msg" },
      },
      error: {},
    },
    types: {} as types,
  },
  {
    actions: {
      ctx_output: assign(({ event }) => ({ output: event.output })),
      error_ctx: assign(({ event }) => ({ error: event.data as object })),
    },
  },
)
