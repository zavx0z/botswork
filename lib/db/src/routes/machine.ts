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
      },
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
