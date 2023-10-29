import { createMachine, type AnyActorRef, type AnyActorLogic, assign, createActor } from "xstate"

type spawnOptions = {
  id?: string | undefined
  systemId: string
  input?: unknown
  syncSnapshot?: boolean | undefined
}

const everythingMachine = createMachine({
  types: {} as {
    context: {
      atoms: { [key: string]: AnyActorRef }
    }
    events: { type: "atom.put"; params: { atom: AnyActorLogic; options: spawnOptions } } | { type: "atom.delete" }
  },
  context: {
    atoms: {},
  },
  on: {
    "atom.put": {
      actions: assign(({ context, event, spawn }) => {
        const { atoms } = context
        atoms["atom"] = spawn(event.params.atom, event.params.options)
        // spawn(event.params.atom, event.params.options)
        return { ...context, atoms: { ...atoms } }
      }),
    },
    "atom.delete": {
      actions: assign(({ context, event }) => {
        return { ...context }
      }),
    },
  },
  initial: "BigBoom",
  states: {
    BigBoom: {},
  },
})

export const everything = createActor(everythingMachine, { systemId: "root-id" })

everything.subscribe((state) => {
  console.log(state)
  console.log(everything.getPersistedState())
  // if (Object.keys(state.context.atoms).length) {
  //   console.log(state.children)
  //   console.log(everything.system.get("code-render"))
  // }
})

// const systemId = "codeRender"
// const persistentState = localStorage.getItem(systemId)
// const Actor = createActor(provideMachine(), { systemId, ...(persistentState ? { state: JSON.parse(persistentState) } : {}) }).start()
// const state = useSelector(Actor, (state) => state)
// state.subscribe((state) => localStorage.setItem("codeRender", JSON.stringify(Actor.getPersistedState())))
