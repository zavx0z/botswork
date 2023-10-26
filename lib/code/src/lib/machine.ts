import { createMachine, assign } from "xstate";
import type { svelteCodeRenderType } from "./svelteCodeRender";

export const machine = createMachine({
  context: {
    code: "",
    err: "",
  },
  initial: "idle",
  types: {} as svelteCodeRenderType,
  entry: "initial",
  states: {
    idle: {
      on: {
        render: { target: "renderer", actions: "srcToElement" },
      },
    },
    renderer: {
      invoke: {
        id: "prism",
        src: "highlightAll",
        onDone: { actions: "done", target: "idle" },
        //@ts-ignore
        onError: { actions: assign({ err: ({ event }) => event.data?.err || "unknown error" }), target: "idle" },
      },
    },
  },
})
