import { readable, type Readable } from "svelte/store"
import { type AnyActor, type AnyStateMachine, type Actor, type AreAllImplementationsAssumedToBeProvided, type MissingImplementationsError, createActor, type StateFrom } from "xstate"

type Prop<T, K> = K extends keyof T ? T[K] : never

type UseMachineReturn<TMachine extends AnyStateMachine, TInterpreter = Actor<TMachine>> = {
  state: Readable<StateFrom<TMachine>>
  send: Prop<TInterpreter, "send">
  service: TInterpreter
}

export function attach<TMachine extends AnyStateMachine>(
  machine: AreAllImplementationsAssumedToBeProvided<TMachine["__TResolvedTypesMeta"]> extends true ? TMachine : MissingImplementationsError<TMachine["__TResolvedTypesMeta"]>,
): UseMachineReturn<TMachine> {
  const systemId = "codeRender"
  const persistentState = localStorage.getItem(systemId)
  const service = createActor(machine, { systemId, ...(persistentState ? { state: JSON.parse(persistentState) } : {}) })
  service.subscribe((state) => localStorage.setItem("codeRender", JSON.stringify(service.getPersistedState())))

  let snapshot = service.getSnapshot()
  const state = readable(snapshot, (set) => {
    return service.subscribe((nextSnapshot) => {
      if (snapshot !== nextSnapshot) {
        snapshot = nextSnapshot
        set(snapshot)
      }
    }).unsubscribe
  })
  service.start()
  return { state, send: service.send, service } as any
}
export interface NodeMachine extends AnyActor {
  attach: typeof attach
}
