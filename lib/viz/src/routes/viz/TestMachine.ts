import { createMachine } from "@lib/machine"
type Events = { type: "INC"; value: number } | { type: "ROOT.EVENT" } | { type: "EVENT" } | { type: "NEXT" } | { type: "PREV" } | { type: "SELF" } | { type: "TO_PARALLEL" }

export default createMachine(
  {
    predictableActionArguments: true,
    id: "testMachine",
    schema: {} as {
      events: Events
      context: {
        count: number
      }
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
          INC: [{ target: "compound", cond: (_, event) => event.value > 10 }, { target: "final" }],
          EVENT: {
            target: "final",
            cond: function somethingIsTrue() {
              return true
            },
          },
          SELF: ".",
        },
      },
      compound: {
        invoke: {
          id: "fooSrc",
          src: "fooSrc",
          onDone: "final",
          onError: "failure",
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
              NEXT: "three",
            },
          },
          three: {
            initial: "atomic",
            always: {
              target: "one",
              cond: function gua() {
                return true
              },
            },
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
            on: {
              TO_PARALLEL: "#parallel",
            },
          },
        },
        on: {
          SELF: ".",
        },
      },
      parallel: {
        id: "parallel",
        type: "parallel",
        states: {
          three: {
            on: {
              SELF: ".",
            },
          },
          four: {},
          five: {},
        },
      },
      final: {
        type: "final",
      },
      failure: {},
    },
  },
  // {
  //   actions: {
  //     rootAction1: () => {},
  //     action1: () => {},
  //     "really long action": () => {},
  //     action3: () => {},
  //     anotherAction: () => {},
  //     action4: () => {},
  //   },
  //   services: {
  //     fooSrc: () => () => {},
  //   },
  // },
)
