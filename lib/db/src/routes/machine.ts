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
    initial: "import",
    states: {
      import: {
        invoke: {
          src: "import",
          onDone: { target: "init" },
          onError: { target: "error", actions: "error_ctx" },
        },
      },
      init: {
        invoke: {
          src: "loadWorker",
          onDone: { target: "idle", actions: ["version_ctx"] },
          onError: { target: "error", actions: "error_ctx" },
        },
      },
      idle: {
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
