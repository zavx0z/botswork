import { fromPromise, assign, createActor } from "xstate"
import { machine } from "./machine"

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
        const contents = await file.arrayBuffer()
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
export const actor = createActor(provider)

