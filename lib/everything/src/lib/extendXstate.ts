import { type AnyActor, type AnyStateMachine, type Actor, type AreAllImplementationsAssumedToBeProvided, type MissingImplementationsError, createActor } from "xstate"

export function attach<TMachine extends AnyStateMachine>(
  machine: AreAllImplementationsAssumedToBeProvided<TMachine["__TResolvedTypesMeta"]> extends true ? TMachine : MissingImplementationsError<TMachine["__TResolvedTypesMeta"]>,
): Actor<TMachine> {
  const systemId = "codeRender"
  const persistentState = localStorage.getItem(systemId)
  const actor = createActor(machine, { systemId, ...(persistentState ? { state: JSON.parse(persistentState) } : {}) })
  actor.subscribe((state) => localStorage.setItem("codeRender", JSON.stringify(actor.getPersistedState())))
  actor.start()
  return actor
}
export interface NodeMachine extends AnyActor {
  attach: typeof attach
}
