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
export default createMachine({
  context: {
    input: {},
    output: {
      version: null,
    },
  },
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "loadWorker",
        onDone: { target: "idle", actions: assign(({ event }) => ({ output: { version: event.output.version } })) },
        onError: { target: "error" },
      },
    },
    idle: {},
    error: {},
  },
  types: {} as types,
})
