import { createMachine } from "xstate"

export default createMachine({
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "loadWorker",
        onDone: { target: "idle" },
        onError: { target: "error" },
      },
    },
    idle: {},
    error: {},
  },
})
