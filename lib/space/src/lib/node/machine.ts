import { createMachine } from "xstate"

type Vec3Arr = [number, number, number]

export const machine = createMachine({
  context: ({ input }) => ({
    position: input.position || [0, 0, 0],
    uri: input.uri,
    tagName: input.tagName,
  }),
  types: {} as {
    input: {
      position?: Vec3Arr
      uri?: string
      tagName?: string
    }
  },
  on: { move: ".moved" },
  initial: "idle",
  states: {
    idle: {},
    moved: {},
  },
})
