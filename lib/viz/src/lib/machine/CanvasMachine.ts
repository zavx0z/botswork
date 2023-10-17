import { assign, createMachine } from "xstate"
interface Point {
  x: number
  y: number
}
export default createMachine({
  id: "canvasMachine",
  context: {
    zoom: 1,
    pan: { dx: 0, dy: 0 },
    initialPosition: { x: 0, y: 0 },
  },
  types: {} as {
    context: {
      zoom: number
      pan: { dx: number; dy: number }
      initialPosition: Point
    }
    events: { type: "ZOOM.OUT" } | { type: "ZOOM.IN" } | { type: "POSITION.SET"; position: Point } | { type: "PAN"; dx: number; dy: number }
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
    PAN: {
      actions: assign({ pan: ({ context, event }) => ({ dx: context.pan.dx - event.dx, dy: context.pan.dy - event.dy }) }),
    },
    "POSITION.SET": {
      actions: assign({ initialPosition: ({ event }) => event.position }),
    },
  },
})
