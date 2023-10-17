import type { AnyStateMachine } from "xstate"

export type SimulationEvents =
  | { type: "EVENT"; event: AnyTransitionDefinition }
  | { type: "EVENT.PREVIEW"; eventType: AnyTransitionDefinition }
  | { type: "STATE.UPDATE"; state: AnyStateNodeConfig }
  | { type: "MACHINE.UPDATE"; machine: AnyStateMachine }
  | { type: "PREVIEW.CLEAR" }
export type SimulationActor = Actor<ActorLogic<any, SimulationEvents, any, any, any>>
