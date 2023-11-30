import { createMachine } from "xstate"
import activityMachine from "./activityMachine.js"

export default (position: string = "left") => {
  const machineId = `sideBar-${position}`
  const activityId = `${machineId}-activity`
  return createMachine({
    id: machineId,
    initial: "idle",
    context: {
      zIndex: "auto",
    },
    // always: [
    // 	{
    // 		target: 'idle',
    // 		// actions: (event) => console.log(event),
    // 		cond: (context, event) => {
    // 			return false
    // 		}
    // 	}
    // ],
    states: {
      idle: {
        on: {
          OPEN: "opened",
          CLOSE: "closed",
          NAVIGATE: { actions: () => console.log("navigate") },
        },
      },
      opened: {
        on: {
          NAVIGATE: { target: "opened", actions: ({ context, event }) => console.log("navigate", event) },
          CLOSE: "closed",
        },
        type: "parallel",
        states: {
          activity: {
            invoke: {
              id: activityId,
              src: activityMachine(activityId),
            },
            on: { CLOSE: { target: "..closed", actions: () => console.log("close") } },
          },
          panel: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  OPEN_PANEL: "opened",
                  CLOSE_PANEL: "closed",
                },
              },
              closed: {
                on: {
                  OPEN_PANEL: "opened",
                },
              },
              opened: {
                on: {
                  CLOSE_PANEL: "closed",
                  NAVIGATE: { actions: () => console.log("navigate") },
                },
              },
            },
          },
        },
      },
      closed: {
        on: { OPEN: "opened" },
      },
    },
    types: {} as {
      events: { type: "OPEN" } | { type: "CLOSE" } | { type: "OPEN_PANEL" } | { type: "CLOSE_PANEL" } | { type: "NAVIGATE" }
      context: {
        zIndex: 0 | 10 | 20 | 30 | 40 | 50 | "0" | "10" | "20" | "30" | "40" | "50" | "auto"
      }
    },
  })
}
