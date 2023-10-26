import type { Actor, ActorLogic } from "xstate"

export type eventsType = { type: "render"; code: string }
export type svelteCodeRenderType = {
  events: eventsType
  context: {
    code: string
    err: string
  }
}

export type codeRenderType = Actor<ActorLogic<any, eventsType, any, any, any>>
