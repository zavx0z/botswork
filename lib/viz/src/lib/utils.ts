import { createEmptyActor, type AnyActorContext } from "xstate"

export const createMockActorContext = (): AnyActorContext => {
  const emptyActor = createEmptyActor()
  return {
    self: emptyActor,
    logger: console.log,
    id: "",
    sessionId: Math.random().toString(32).slice(2),
    defer: () => {},
    system: emptyActor.system!, // TODO: mock system?
    stopChild: () => {},
  }
}
export const mockActorContext: AnyActorContext = createMockActorContext()
