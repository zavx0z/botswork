import { createMachine } from "xstate"
import type { PageLoad } from "./$types"

export const load = (async () => {
  const machine = createMachine(
    {
      context: {
        count: 0,
      },
      id: "machine",
      entry: {
        type: "inc",
      },
      initial: "started",
      states: {
        started: {
          on: {
            finish: {
              target: "final",
            },
            increment: {
              actions: "inc",
            },
          },
        },
        final: {
          type: "final",
        },
      },
    },
    {
      actions: { inc: ({ context, event }) => {} },
      actors: {},
      guards: {},
      delays: {},
    },
  )
  return { machine }
}) satisfies PageLoad
