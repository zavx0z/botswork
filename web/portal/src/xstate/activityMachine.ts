import { createMachine } from "xstate"

export default (id: string = "activity") =>
  createMachine({
    id: id,
    context: { buttons: {} },
    initial: "opened",
    states: {
      opened: {
        on: {
          CLOSE: "closed",
        },
      },
      closed: {
        on: {
          OPEN: "opened",
        },
      },
    },
    types: {} as {
      events: { type: "OPEN" } | { type: "CLOSE" }
      context: {}
    },
  })
