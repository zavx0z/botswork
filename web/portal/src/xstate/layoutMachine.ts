import { assign, createMachine } from "xstate"

const layoutMachineFabric = (id: string = "layout", zIndex: string = "auto") =>
  createMachine(
    {
      id: id,
      context: {
        zIndex: zIndex,
      },
      initial: "zIndex",
      states: {
        zIndex: {
          initial: "change",
          states: {
            change: {
              always: [
                { target: "0", guard: "z0" },
                { target: "10", guard: "z10" },
                { target: "20", guard: "z20" },
                { target: "30", guard: "z30" },
                { target: "40", guard: "z40" },
                { target: "50", guard: "z50" },
                { target: "auto", guard: "auto" },
                { target: "auto" },
              ],
            },
            0: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            10: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            20: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            30: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            40: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            50: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
            auto: { on: { SET_INDEX: { target: "change", actions: ["cacheData"] } } },
          },
        },
      },
      types: {} as {
        events: { type: "SET_INDEX"; data: { zIndex: string } }
        context: { zIndex: string }
        actions: { type: "cacheData" }
      },
    },
    {
      actions: {
        cacheData: assign({ zIndex: ({ context, event }) => event.data.zIndex }),
      },
      guards: {
        z0: ({ context }) => context.zIndex === "0",
        z10: ({ context }) => context.zIndex === "10",
        z20: ({ context }) => context.zIndex === "20",
        z30: ({ context }) => context.zIndex === "30",
        z40: ({ context }) => context.zIndex === "40",
        z50: ({ context }) => context.zIndex === "50",
        auto: ({ context }) => context.zIndex === "auto",
      },
    },
  )
export default layoutMachineFabric
