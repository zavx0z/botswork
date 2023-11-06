import { assign, createMachine } from "xstate"
type types = {
  context: {
    input: {}
    output: {
      version: string | null
    }
    error?: {}
  }
}
export default createMachine(
  {
    context: {
      input: {},
      output: {
        version: null,
      },
    },
    initial: "db-worker-load",
    states: {
      "db-worker-load": {
        invoke: {
          id: "worker-import",
          src: "worker-import",
          onDone: { target: "db-worker-active" },
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
      version_ctx: assign(({ event }) => ({ output: { version: event.output.version } })),
      error_ctx: assign(({ event }) => ({ error: event.data as object })),
    },
  },
)
