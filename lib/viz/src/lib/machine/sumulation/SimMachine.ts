import { assign, createActor, createMachine, fromCallback, sendTo } from "xstate"
import type { Events } from "./types/Events"

export const createSimulationMachine = (machine: any, state: any, previewEvent: string | undefined) =>
  createMachine({
    id: "simService",
    types: {} as {
      events: Events
    },
    initial: "active",
    context: {
      machine: machine,
      state: state,
      previewEvent: previewEvent,
    },
    on: {
      "STATE.UPDATE": {
        actions: assign({ state: ({ event }) => event.state }),
      },
      EVENT: {
        actions: sendTo("machine", ({ context, event }) => {
          const eventSchema = context.machine.schema?.events?.[event.event.type]
          const eventToSend = { ...event.event }
          console.log("Event", context.machine)
          if (eventSchema) {
            Object.keys(eventSchema.properties).forEach((prop) => {
              const value = prompt(`Enter value for "${prop}" (${eventSchema.properties[prop].type}):`)
              console.log("prompt value", value)
              eventToSend[prop] = value
            })
          }
          return eventToSend
        }),
      },
    },
    states: {
      active: {
        invoke: {
          id: "machine",
          input: ({ context }) => ({ machine: context.machine }),
          src: fromCallback(({ sendBack, input }) => {
            console.log("starting again")
            const actor = createActor(input.machine).start()
            // .onTransition((state) => sendBack({ type: "STATE.UPDATE", state }))
            // onReceive((event) => { service.send(event) })
            return () => {
              actor.stop()
            }
          }),
        },
        on: {
          "MACHINE.UPDATE": {
            target: "active",
            reenter: true,
            actions: [assign({ machine: createMachine({ initial: "foo", states: { foo: { on: { NEXT: "bar" } }, bar: { on: { NEXT: "foo" } } } }) })],
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
