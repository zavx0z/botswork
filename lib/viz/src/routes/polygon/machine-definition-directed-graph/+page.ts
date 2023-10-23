import type { PageLoad } from "./$types"
let machineAsString = `const machine = createMachine(
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
              actions: "inc"
            }
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
  );`
export const load = (async () => {
  return { machineAsString }
}) satisfies PageLoad