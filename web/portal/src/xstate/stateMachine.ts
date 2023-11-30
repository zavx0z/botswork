import { createActor, createMachine, sendTo } from "xstate"
import displayMachine from "./displayMachine"
import routeMachine from "./routeMachine"
import rootMachine from "../routes/rootMachine"

const machine = createMachine(
  {
    id: "stateMachine",
    type: "parallel",
    states: {
      browser: {
        invoke: [
          { id: "display", src: "display" },
          { id: "router", src: routeMachine },
        ],
      },
      routes: {
        invoke: { id: "route-root", src: rootMachine },
        on: {
          NAVIGATE: {
            actions: ["navigate"],
          },
        },
      },
    },
    types: {} as {
      events: { type: "NAVIGATE"; pathname: string }
    },
  },
  {
    actions: {
      navigate: sendTo("route-root", ({ event }) => ({ type: "NAVIGATE", pathname: event.pathname })),
    },
    actors: {
      display: displayMachine,
    },
  },
)
export default createActor(machine).start()
