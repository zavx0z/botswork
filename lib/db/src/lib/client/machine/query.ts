import { createMachine, sendTo } from "xstate"

export const machine = createMachine({
  id: "query",
  types: {} as {
    context: {
      error?: ErrorMachine
    }
  },
  context: {},
  on: {
    put: ".put",
  },
  invoke: {
    systemId: "message-listener",
    id: "message-listener",
    src: "message-listener",
  },
  initial: "idle",
  states: {
    idle: {},
    put: {
      entry: sendTo("message-listener", { type: "put" }),
    },
    update: {},
    delete: {},
    error: {},
  },
})
