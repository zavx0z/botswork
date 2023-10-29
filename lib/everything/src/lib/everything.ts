import { onDestroy } from "svelte"
import { readable, writable } from "svelte/store"
import { createActor, createMachine, type AnyActor } from "xstate"

const stuff = writable<AnyActor[]>([])
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
        const actor = createActor(event.params.machine, event.params.options)
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
