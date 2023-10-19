import type { LayoutLoad } from "./$types"
let machine = `const machine = createMachine(
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

let provide = `machine.provide({
  actions: {
    inc: assign({count: ({context})=> context.count += 1})
  },
})`
export const load: LayoutLoad = () => {
  return { machine, provide }
}
