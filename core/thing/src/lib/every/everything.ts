import { onDestroy } from "svelte"
import { readable, writable } from "svelte/store"
import { createActor, type AnyActor } from "xstate"
import machine from "./machine"

const everything = writable<AnyActor[]>([])
const confusion = readable([])
export function createEverything() {
  const every = createActor(
    machine.provide({
      actions: {
        createStuff: ({ event }) => {
          const actor: AnyActor = createActor(event.params.machine, event.params.options)
          actor.start()
          everything.update((stuff) => [...stuff, actor])
        },
      },
    }),
  )
  let snapshot = every.getSnapshot()
  const state = readable(snapshot, (set) => {
    return every.subscribe((nextSnapshot) => {
      if (snapshot !== nextSnapshot) {
        snapshot = nextSnapshot
        set(snapshot)
      }
    }).unsubscribe
  })
  every.start()
  onDestroy(() => every.stop())
  return {everything, confusion, state, send: every.send, every }
}
