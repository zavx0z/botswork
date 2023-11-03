import { createMachine } from "xstate"

export default createMachine({
  initial: "worker-loading",
  states: {
    "worker-loading": {
      invoke: {
        src: "loadWorker",
        onDone: { target: "worker-loaded" },
        onError: { target: "worker-error" },
      },
    },
    "worker-loaded": {},
    "worker-error": {},
  },
})
