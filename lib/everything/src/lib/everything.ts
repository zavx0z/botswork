import { onDestroy } from "svelte"
import { readable, writable } from "svelte/store"
import { createActor, createMachine } from "xstate"
import machine from "./machine"
import { attach, type NodeMachine } from "./extendXstate"
const stuff = writable<NodeMachine[]>([])
const confusion = readable([])


const everything = createActor(
  machine.provide({
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
