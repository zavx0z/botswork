import { assign, interpret, createMachine, sendTo } from "@metafor/machine"
import type { EventType, AnyStateMachine, EventObject, AnyState } from "@metafor/machine"
export type Events =
  | { type: "EVENT"; event: EventObject }
  | { type: "EVENT.PREVIEW"; eventType: EventType }
  | { type: "STATE.UPDATE"; state: AnyState }
  | { type: "MACHINE.UPDATE"; machine: AnyStateMachine }
  | { type: "PREVIEW.CLEAR" }
// export type SimulatorActorType = Actor<ActorLogic<any, SimulatorEvents, any, any>>
type InputType = {
  machine: AnyStateMachine
  state: AnyState
  previewEvent?: string
}
export const createSimulator = (input: InputType) =>
  interpret(
    createMachine({
      predictableActionArguments: true,
      id: "simService",
      schema: {} as {
        events: Events
        context: InputType
      },
      initial: "active",
      context: () => ({
        machine: input.machine,
        state: input.state,
        previewEvent: input.previewEvent,
      }),
      on: {
        "STATE.UPDATE": {
          actions: assign({ state: (_, event) => event.state }),
        },
        EVENT: {
          actions: sendTo("machine", (_, event) => {
            const eventToSend = { ...event.event }
            return eventToSend
          }),
        },
      },
      states: {
        active: {
          invoke: {
            id: "machine",
            src: (ctx) => (sendBack, onReceive) => {
              console.log("starting again")
              const actor = interpret(ctx.machine)
                .onTransition((state) => sendBack({ type: "STATE.UPDATE", state }))
                .start()
              onReceive((event) => {
                actor.send(event)
              })
              return () => {
                actor.stop()
              }
            },
          },
          on: {
            "MACHINE.UPDATE": {
              target: "active",
              internal: false,
              actions: assign({ machine: (_, event) => event.machine }),
            },
            "EVENT.PREVIEW": {
              actions: assign({ previewEvent: (_, event) => event.eventType }),
            },
            "PREVIEW.CLEAR": {
              actions: assign({ previewEvent: undefined }),
            },
          },
        },
      },
    }),
  )
