import { createActor, createMachine } from "xstate"

const machine = createMachine({
  initial: "subscribe",
  entry: { type: "sendMessage" },
  states: {
    subscribe: {},
  },
})
const actor = createActor(
  machine.provide({
    actions: {
      sendMessage: () => postMessage({}),
    },
  }),
).start()

addEventListener("message", (message) => {
  console.log(message)
})
