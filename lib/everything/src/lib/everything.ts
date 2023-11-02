import { onDestroy } from "svelte"
import { readable, writable } from "svelte/store"
import { createActor, type AnyActor } from "xstate"
import machine from "./machine"

const stuff = writable<AnyActor[]>([])
const confusion = readable([])

export function createEverything() {
  const everything = createActor(
    machine.provide({
      actions: {
        createStuff: ({ event }) => {
          const actor: AnyActor = createActor(event.params.machine, event.params.options)
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

  onDestroy(() => everything.stop())
  return { stuff, confusion, state, send: everything.send }
}
