import { onDestroy } from "svelte"
import { readable, writable, type Writable } from "svelte/store"
import {
  createActor,
  type AnyActor,
  type AnyActorLogic,
  createMachine,
  type AnyStateMachine,
  type AreAllImplementationsAssumedToBeProvided,
  type ActorOptions,
  type InternalMachineImplementations,
  type TODO,
} from "xstate"

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
  return { subscribe }
}

type RestParams<TMachine extends AnyStateMachine> = AreAllImplementationsAssumedToBeProvided<TMachine["__TResolvedTypesMeta"]> extends false
  ? [options: ActorOptions<TMachine> & InternalMachineImplementations<TMachine["__TContext"], TMachine["__TEvent"], TODO, TODO, TODO, TMachine["__TResolvedTypesMeta"], true>]
  : [options?: ActorOptions<TMachine> & InternalMachineImplementations<TMachine["__TContext"], TMachine["__TEvent"], TODO, TODO, TODO, TMachine["__TResolvedTypesMeta"]>]

export function createEverything() {
  const stuff = createStuff()
  stuff.subscribe(() => {})
  const confusion = createConfusion()
  confusion.subscribe(() => {})

  const machine = createMachine({
    initial: "idle",
    on: {
      "stuff.put": { actions: [({ event }) => stuff.put(event.params.machine, event.params.options)] },
    },
    states: {
      idle: {},
    },
  })

  const everything = createActor(machine).start()
  onDestroy(() => everything.stop())
  let snapshot = everything.getSnapshot()
  const state = readable(snapshot, (set) => {
    return everything.subscribe((nextSnapshot) => {
      if (snapshot !== nextSnapshot) {
        snapshot = nextSnapshot
        set(snapshot)
      }
    }).unsubscribe
  })

  return { stuff, confusion, state, send: everything.send }
}
