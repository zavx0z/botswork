import { createMachine } from "xstate"
type machine = {
  context: {
    value: string
    error: string | null
  }
  events: { type: "update"; value: string }
  input: string
}
export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCWyA2YB0qJYGIBXABwgENkwBtABgF1FQSB7WdVFgOyZAA9EARgBswgDQgAnogDMATjnYArAHYATHJGjtomQF89EtJhykKaLlAIRuOVFwBuLANY5jWbGcr2oCe04Bjb246elDeVnY0bl4BBA0ZZQAOJTkZFSUJaXi07BVaGUE1JQMjdA8vCyswACcalhrsEgxKADMGgFtsd1Myb0s-RxYg6K5Q8KQQSI4YybiNABZsYpUkosypRDVaWjySwxAezz6qgj5YZEocclaqGoAKWgBKAiPKnwnmNhmeOcQFuRqZaCJIZLL-ETYQRKYTFUqHcq9cyQM4XK7YG53R4vN4nSCfKbfUaxf6A4GgjbZNbKAwHLgsCBwXg9CJEzi-UBxAC04k2CB58KOeCwrKi7JJCAWanBCCSwmwtCSMmVKtVysFiOO5h8op+ErUSV2tFW6xl8kE2GEMLhB1xyIguuJfwQwiKyxkC3SlMQSSSyTVAf0tKAA */
    id: "title",
    context: ({ input }) => ({
      value: input,
      error: null,
    }),
    initial: "updating",
    states: {
      idle: {
        on: {
          update: "updating",
        },
        after: {
          0: { target: "updating" },
        },
      },
      updating: {
        invoke: {
          src: "update_value",
          input: ({ context: { value } }) => ({ value }),
          onDone: { target: "updated", actions: "value_save" },
          onError: { target: "error", actions: "error_save" },
        },
      },
      error: {
        after: { 0: { target: "idle", actions: "error_clear" } },
      },
      updated: {
        after: { 0: { target: "idle" } },
      },
    },
    types: {} as machine,
  },
  {
    actions: {
      value_save: ({ context, event }) => ({ ...context, value: event }),
      //@ts-ignore
      error_save: ({ context, event }) => ({ ...context, error: event.data }),
      error_clear: ({ context }) => ({ ...context, error: null }),
    },
  },
)
