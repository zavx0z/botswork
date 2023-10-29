import { writable, type Writable } from "svelte/store"
import { createActor, type AnyActor, type AnyActorLogic } from "xstate"

type spawnOptions = {
  id?: string | undefined
  systemId: string
  input?: unknown
  syncSnapshot?: boolean | undefined
}

function createStuff() {
  const { subscribe, set, update } = writable<AnyActor[]>([])

  return {
    subscribe,
    put: (machine: AnyActorLogic, options: spawnOptions) => {
      const actor = createActor(machine, options)
      actor.subscribe((state) => {
        // console.log(JSON.stringify(actor.getPersistedState(), null, 2))
      })
      actor.start()
      update((stuff) => [...stuff, actor])
    },
    del: () => {},
    get: () => {},
  }
}

function createConfusion() {
  const { subscribe, set, update } = writable<[]>([])
  return {
    subscribe,
  }
}

export function createEverything() {
  const { subscribe, set, update } = writable<AnyActor[]>([])

  const stuff = createStuff()
  stuff.subscribe(() => {})

  const confusion = createConfusion()
  confusion.subscribe(() => {})

  return {
    stuff,
    confusion,
    subscribe,
  }
}
