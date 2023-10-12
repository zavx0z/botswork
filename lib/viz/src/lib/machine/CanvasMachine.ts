import { assign, createMachine } from "xstate"

export default createMachine({
  id: "canvasMachine",
  context: {
    zoom: 1,
  },
  on: {
    "ZOOM.OUT": {
      actions: assign({ zoom: ({ context }) => context.zoom - 0.1 }),
      guard: ({ context }) => context.zoom > 0.5,
    },
    "ZOOM.IN": {
      actions: assign({ zoom: ({ context }) => context.zoom + 0.1 }),
      guard: ({ context }) => context.zoom < 1,
    },
  },
})
