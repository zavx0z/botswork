import { createMachine } from "xstate"

type Vec3Arr = [number, number, number]

export const machine = createMachine({
  context: ({ input }) => ({
    position: input.position || [0, 0, 0],
  }),
  types: {} as {
    input: {
      position?: Vec3Arr
    }
  },
  on: { move: ".moved" },
  initial: "idle",
  states: {
    idle: {},
    moved: {},
  },
})
