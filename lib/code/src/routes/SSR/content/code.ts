const machine = createMachine(
  {
    context: {
      count: 44,
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
