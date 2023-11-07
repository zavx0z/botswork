import { fromPromise, assign, createMachine, createActor } from "xstate"

type contextType = {
  output: {
    rootFileSystemDirectoryHandle: {
      kind: "directory" | undefined
      name: "" | undefined
    }
  }
  error?: ErrorMachine
}

export const machine = createMachine({
  id: "opfs",
  types: {} as { context: contextType },
  context: {
    output: {
      rootFileSystemDirectoryHandle: {
        kind: "directory",
        name: "",
      },
    },
  },
  initial: "idle",
  states: {
    idle: {
      always: { target: "rootDir" },
    },
    rootDir: {
      invoke: {
        src: "rootGetter",
        onDone: {
          target: "next",
          actions: "ctx_rootFileSystemDirectoryHandle",
        },
        onError: { actions: "ctx_error" },
      },
    },
    next: {},
  },
})
let fileHandle: FileSystemDirectoryHandle

const provider = machine.provide({
  actions: {
    ctx_rootFileSystemDirectoryHandle: assign(({ event }) => ({ output: { rootFileSystemDirectoryHandle: event.output } })),
    ctx_error: assign(({ event }) => ({ error: event.data })),
  },
  actors: {
    rootGetter: fromPromise(function () {
      return new Promise(async (resolve, reject) => {
        try {
          const opfsRoot = await navigator.storage.getDirectory()
          fileHandle = opfsRoot
          resolve({ kind: opfsRoot.kind, name: opfsRoot.name })
        } catch (err) {
          reject(JSON.stringify(err))
        }
      })
    }),
  },
})
export const actor = createActor(provider)
actor.subscribe((state) => {
  console.log("💾", state.value, state.context)
})
