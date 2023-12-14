// import type {
//   Actor,
//   //  ActorLogic,
//   AnyStateMachine,
//   // AnyStateNodeConfig,
//   //  AnyTransitionDefinition,
//   // EventDescriptor
// } from "@lib/machine"

import { assign, interpret, createMachine, sendTo } from "@lib/machine"

export type Events = { type: "EVENT"; event: any } | { type: "EVENT.PREVIEW"; eventType: string } | { type: "STATE.UPDATE"; state: any } | { type: "MACHINE.UPDATE" } | { type: "PREVIEW.CLEAR" }
// export type SimulatorEvents =
//   | { type: "EVENT"; event: EventDescriptor<any> }
//   | { type: "EVENT.PREVIEW"; eventType: AnyTransitionDefinition }
//   | { type: "STATE.UPDATE"; state: AnyStateNodeConfig }
//   | { type: "MACHINE.UPDATE"; machine: AnyStateMachine }
//   | { type: "PREVIEW.CLEAR" }
// export type SimulatorActorType = Actor<ActorLogic<any, SimulatorEvents, any, any>>
type InputType = {
  machine: any
  state: any
  previewEvent?: any
}
export const createSimulator = (input: InputType) => {
  return interpret(
    createMachine({
      id: "simService",
      // types: {} as {
      //   context: {
      //     machine: AnyStateMachine
      //     state: AnyStateNodeConfig
      //     previewEvent?: string
      //   }
      //   events: SimulatorEvents
      //   input: {
      //     machine: AnyStateMachine
      //     state: AnyStateNodeConfig
      //     previewEvent?: string
      //   }
      // },
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
              actions: assign({ previewEvent: (_, event) => event.eventType as unknown as string }),
            },
            "PREVIEW.CLEAR": {
              actions: assign({ previewEvent: undefined }),
            },
          },
        },
      },
      predictableActionArguments: true,
    }),
  )
}
