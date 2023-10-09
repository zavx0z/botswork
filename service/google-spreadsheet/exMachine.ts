import { createMachine } from "xstate"

const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgiwGMBXAWzAwBd8QAHLWASyqaw1oA9EBaAZgBs6AJ68ArAA5kaEIVIVqAOlgALMGBpJ6jFmw5buCAIwAmEYhMBORWOno55SlWVqNigE5YA7rQbNW7FyIAgAM5sZGAOx2ssSOSqrqzp5eikRgADYZvjoB+qCGRiES4SYhACw2MQ4KzoluRFgZ5Pna-npBCKGlkbYyNU4uSWlNLWmZ2Vp+uoEGiEUlIKIIgiZV0shAA */
  id: "document",
  initial: "sheet",
  context: {
    document: "",
    sheet: "",
    row: "",
    column: "",
  },
  states: {
    sheet: {
      type: "parallel",
      states: {
        row: {
          states: {
            cell: {},
          },
        },
        column: {
          states: {
            cell: {},
          },
        },
      },
    },
  },
})
