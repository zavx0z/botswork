import { assign, createMachine } from "xstate"

export default createMachine({
  id: "canvasMachine",
  context: {
    zoom: 1,
  },
  on: {
    "ZOOM.OUT": {
      actions: assign({ zoom: (ctx) => ctx.zoom - 0.1 }),
      cond: (ctx) => ctx.zoom > 0.5,
    },
    "ZOOM.IN": {
        actions: assign({ zoom: (ctx) => ctx.zoom + 0.1 }),
        cond: (ctx) => ctx.zoom < 1,
      },
    },
})
