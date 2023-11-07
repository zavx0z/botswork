import { createMachine, sendTo } from "xstate"

export const machine = createMachine({
  id: "query",
  types: {} as {
    context: {
      input: {
        table: string | undefined
        column: string | undefined
        row: string | undefined
      }
      error?: ErrorMachine
    }
  },
  context: {
    input: {
      table: undefined,
      column: undefined,
      row: undefined,
    },
  },
  on: {
    create: ".create",
    update: ".update",
    delete: ".delete",
  },
  invoke: {
    systemId: "message-listener",
    id: "message-listener",
    src: "message-listener",
  },
  initial: "idle",
  states: {
    idle: {},
    create: {
      entry: sendTo("message-listener", { type: "create" }),
      after: { 0: "idle" },
    },
    update: {
      entry: sendTo("message-listener", { type: "update" }),
      after: { 0: "idle" },
    },
    delete: {
      entry: sendTo("message-listener", { type: "delete" }),
      after: { 0: "idle" },
    },
  },
})
