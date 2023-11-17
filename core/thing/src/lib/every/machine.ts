import { createMachine } from "xstate";

export default createMachine({
    initial: "idle",
    on: {
      "stuff.put": {
        actions: ["createStuff"],
      },
    },
    states: {
      idle: {},
    },
  })