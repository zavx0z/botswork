import { onDestroy } from "svelte"
import { readable, writable } from "svelte/store"
import {
  createActor,
  createMachine,
  type AnyActor,
  type AnyStateMachine,
  type Actor,
  type AnyActorLogic,
  type AreAllImplementationsAssumedToBeProvided,
  type MissingImplementationsError,
} from "xstate"

function attach<TMachine extends AnyStateMachine>(
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

const stuff = writable<NodeMachine[]>([])
const confusion = readable([])

const everythingMachine = createMachine({
  initial: "idle",
  on: {
    "stuff.put": {
      actions: ["createStuff"],
    },
  },
  states: {
    idle: {},
  },
})

const everything = createActor(
  everythingMachine.provide({
    actions: {
      createStuff: ({ event }) => {
        const actor: NodeMachine = createActor(event.params.machine, event.params.options) as NodeMachine
        actor["attach"] = attach
        actor.start()
        stuff.update((stuff) => [...stuff, actor])
      },
    },
  }),
)

let snapshot = everything.getSnapshot()
const state = readable(snapshot, (set) => {
  return everything.subscribe((nextSnapshot) => {
    if (snapshot !== nextSnapshot) {
      snapshot = nextSnapshot
      set(snapshot)
    }
  }).unsubscribe
})

everything.start()

export function createEverything() {
  onDestroy(() => everything.stop())
  return { stuff, confusion, state, send: everything.send }
}
