import { assign, createMachine, sendTo } from "xstate"

export default createMachine({
  id: "sqlite3",
  initial: "activate",
  states: {
    activate: {
      invoke: {
        id: "activate",
        systemId: "activate",
        src: "activate",
        onDone: { target: "query", actions: ({ event }) => console.log(event.output) },
        onError: { actions: ({ event }) => console.log("!!onError!!", event) },
      },
      onDone: { actions: ({ event }) => console.log("done", event) },
    },
    query: {
      invoke: {
        id: "query",
        systemId: "query",
        src: "query",
      },
    },
    error: {
      type: "final",
    },
  },
})
