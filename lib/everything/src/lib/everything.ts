import { writable, type Writable } from "svelte/store"
import { createActor, type AnyActor, type AnyActorLogic } from "xstate"

function createStuff() {
  const { subscribe, set, update } = writable<AnyActor[]>([])

  return {
    subscribe,
    put: (machine: AnyActorLogic, options: any) => {
      const actor = createActor(machine, { systemId: options.systemId, id: options.id })
      actor.subscribe((state) => {
        console.log(JSON.stringify(actor.getPersistedState(), null, 2))
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
