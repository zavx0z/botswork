import { createMachine } from "xstate"
type Events = { type: "INC"; value: number } | { type: "ROOT.EVENT" } | { type: "EVENT" } | { type: "NEXT" } | { type: "PREV" }

export default createMachine(
  {
    id: "testMachine",
    types: {} as {
      events: Events
    },
    context: {
      count: 0,
    },
    initial: "simple",
    entry: ["rootAction1"],
    exit: ["rootAction1"],
    on: {
      "ROOT.EVENT": {},
    },
    states: {
      simple: {
        entry: ["action1", "really long action", "action3"],
        exit: ["anotherAction", "action4"],
        on: {
          NEXT: "compound",
          INC: [{ target: "compound", guard: ({ event }) => event.value > 10 }, { target: "final" }],
          EVENT: {
            target: "final",
            guard: function somethingIsTrue() {
              return true
            },
          },
        },
      },
      compound: {
        invoke: {
          src: "fooSrc",
        },
        initial: "one",
        states: {
          one: {
            on: {
              NEXT: "two",
            },
          },
          two: {
            on: {
              PREV: "one",
            },
          },
          three: {
            initial: "atomic",
            states: {
              atomic: {},
              history: {
                type: "history",
              },
              deepHist: {
                type: "history",
                history: "deep",
              },
            },
          },
        },
      },
      parallel: {
        type: "parallel",
        states: {
          three: {},
          four: {},
          five: {},
        },
      },
      final: {
        type: "final",
      },
    },
  },
  {
    actions: {
      rootAction1: () => {},
      action1: () => {},
      "really long action": () => {},
      action3: () => {},
      anotherAction: () => {},
      action4: () => {},
    },
  },
)
