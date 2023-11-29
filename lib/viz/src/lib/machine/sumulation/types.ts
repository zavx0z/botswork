import type { Actor, ActorLogic, AnyStateMachine, AnyStateNodeConfig, AnyTransitionDefinition, EventDescriptor } from "xstate"

export type SimulationEvents =
  | { type: "EVENT"; event: EventDescriptor<any>  }
  | { type: "EVENT.PREVIEW"; eventType: AnyTransitionDefinition }
  | { type: "STATE.UPDATE"; state: AnyStateNodeConfig }
  | { type: "MACHINE.UPDATE"; machine: AnyStateMachine }
  | { type: "PREVIEW.CLEAR" }
export type SimulationActor = Actor<ActorLogic<any, SimulationEvents, any, any>>
