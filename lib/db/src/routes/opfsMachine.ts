// https://web.dev/articles/origin-private-file-system?hl=ru
// https://blog.stranianelli.com/js-wasm-sqlite3-01/
// https://blog.stranianelli.com/js-wasm-sqlite3-02/
// https://blog.stranianelli.com/js-wasm-sqlite3-03/
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
type eventsType = { type: "file.create"; params: { fileName: string; content: string } } | { type: "file.from.device"; params: { handle: FileSystemFileHandle } }
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
  initial: "activate",
  states: {
    activate: {
      invoke: {
        src: "rootGetter",
        onDone: {
          target: "idle",
          actions: "ctx_rootFileSystemDirectoryHandle",
        },
        onError: { actions: "ctx_error" },
      },
    },
    idle: {
      on: {
        "file.create": { target: "file-create" },
        "file.from.device": { target: "file-from-device" },
      },
    },
    "file-create": {
      invoke: {
        src: "fileCreate",
        input: ({ event }) => event.params,
        onDone: { target: "idle" },
        onError: { actions: "ctx_error" },
      },
    },
    "file-from-device": {
      invoke: {
        src: "fileFromDevice",
        input: ({ event }) => event.params,
        onDone: { target: "idle" },
        onError: { actions: "ctx_error" },
      },
    },
  },
})
let opfsRoot: FileSystemDirectoryHandle

const provider = machine.provide({
  actions: {
    ctx_rootFileSystemDirectoryHandle: assign(({ event }) => ({ output: { rootFileSystemDirectoryHandle: event.output } })),
    ctx_error: assign(({ event }) => ({ error: event.data as ErrorMachine })),
  },
  actors: {
    rootGetter: fromPromise(function () {
      return new Promise(async (resolve, reject) => {
        try {
          opfsRoot = await navigator.storage.getDirectory()
          resolve({ kind: opfsRoot.kind, name: opfsRoot.name })
        } catch (err) {
          reject(JSON.stringify(err))
        }
      })
    }),
    fileFromDevice: fromPromise(function ({ input }) {
      return new Promise(async (resolve, reject) => {
        const file = await input.handle.getFile()
        const contents = await file.text()
        const fileHandle = await opfsRoot.getFileHandle(input.handle.name, { create: true })
        const writable = await fileHandle.createWritable()
        await writable.write(contents)
        await writable.close()
        resolve({ status: "success" })
      })
    }),
    fileCreate: fromPromise(function ({ input }) {
      return new Promise(async (resolve, reject) => {
        try {
          const fileHandle = await opfsRoot.getFileHandle(input.fileName, { create: true })
          const writable = await fileHandle.createWritable()
          await writable.write(input.content)
          await writable.close()
          resolve({ status: "success" })
        } catch (err) {
          reject(JSON.stringify(err))
        }
      })
    }),
  },
})
export const actor = createActor(provider, {
  //   inspect(inspectionEvent) {
  //     console.log(inspectionEvent.event)
  //   },
})
actor.subscribe((state) => {
  console.log("💾", state.value, state.context)
})
