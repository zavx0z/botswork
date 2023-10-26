import type { Actor, ActorLogic } from "xstate"

export type eventsType = { type: "render"; code: string }
type contextType = {
  code: string
  err: string
  input?: {}
  output?: {}
}
export type svelteCodeRenderType = {
  events: eventsType
  context: contextType
}

export type codeRenderType = Actor<ActorLogic<any, eventsType, any, any, any>>
