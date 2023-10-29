import { createMachine, type AnyActorRef, type AnyActorLogic, assign, createActor } from "xstate"

const rootMachine = createMachine({
  context: {
    atoms: {},
  },
  on: {
    "actor.put": {
      actions: assign(({ context, event, spawn }) => {
        const { atoms } = context
        atoms["atom"] = spawn(event.params.atom, event.params.options)
        return { ...context, atoms: { ...atoms } }
      }),
    },
  },
  initial: "idle",
  states: {
    idle: {},
  },
})

const actor = createActor(rootMachine, { systemId: "root-actor" })
actor.subscribe((state) => {
  console.log(actor.getPersistedState())
})
actor.start()

const childMachine = createMachine({
  initial: "idle",
  states: {
    idle: {},
  },
})

actor.send({ type: "actor.put", params: { atom: childMachine, options: { systemId: "child-id", id: "child" } } })
