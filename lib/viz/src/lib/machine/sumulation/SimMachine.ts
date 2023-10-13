import { assign, createActor, createMachine, fromCallback, sendTo, type AnyStateMachine, type AnyStateNodeConfig } from "xstate"
import type { SimulationEvents } from "./types/Events"

export const SimulationMachine = createMachine({
  id: "simService",
  types: {} as {
    context: {
      machine: AnyStateMachine
      state: AnyStateNodeConfig
      previewEvent?: string
    }
    events: SimulationEvents
    input: {
      machine: AnyStateMachine
      state: AnyStateNodeConfig
      previewEvent?: string
    }
  },
  initial: "active",
  context: ({ input }) => ({
    machine: input.machine,
    state: input.state,
    previewEvent: input.previewEvent,
  }),
  on: {
    "STATE.UPDATE": {
      actions: assign({ state: ({ event }) => event.state }),
    },
    EVENT: {
      actions: sendTo("machine", ({ event }) => {
        // const eventSchema = context.machine.schema?.events?.[event.event.type]
        const eventToSend = { ...event.event }
        // if (eventSchema) {
        //   Object.keys(eventSchema.properties).forEach((prop) => {
        //     const value = prompt(`Enter value for "${prop}" (${eventSchema.properties[prop].type}):`)
        //     console.log("prompt value", value)
        //     eventToSend[prop] = value
        //   })
        // }
        return eventToSend
      }),
    },
  },
  states: {
    active: {
      invoke: {
        id: "machine",
        input: ({ context }) => ({ machine: context.machine }),
        src: fromCallback(({ sendBack, receive, input }) => {
          console.log("starting again")
          const actor = createActor(input.machine)
          actor.start()
          const sub = actor.subscribe((state) => {
            sendBack({ type: "STATE.UPDATE", state })
          })
          receive((event) => {
            actor.getSnapshot().status === "active" && actor.send(event)
          })
          return () => {
            sub.unsubscribe()
            actor.stop()
          }
        }),
      },
      on: {
        "MACHINE.UPDATE": {
          target: "active",
          reenter: true,
          actions: assign({ machine: createMachine({ initial: "foo", states: { foo: { on: { NEXT: "bar" } }, bar: { on: { NEXT: "foo" } } } }) }),
        },
        "EVENT.PREVIEW": {
          actions: assign({ previewEvent: ({ event }) => event.eventType }),
        },
        "PREVIEW.CLEAR": {
          actions: assign({ previewEvent: undefined }),
        },
      },
    },
  },
})
