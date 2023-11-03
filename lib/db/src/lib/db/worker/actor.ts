import { createActor, fromPromise } from "xstate"
import machine from "./machine"
import type { DB } from "sqlite3oo1"

let sqlite3: any
let oo1: any
let capi: any
let db: DB

const actor = createActor(
  machine.provide({
    actors: {
      import: fromPromise(function () {
        return new Promise(async (resolve, reject) => {
          try {
            await import("../../sqlite/jswasm/sqlite3-bundler-friendly.mjs")
            resolve({ success: "ok" })
          } catch (err) {
            reject(JSON.stringify(err))
          }
        })
      }),
      init: fromPromise(function () {
        return new Promise(async (resolve, reject) => {
          try {
            sqlite3 = await self.sqlite3InitModule({ print: console.log, printErr: console.error })
            oo1 = sqlite3.oo1
            capi = sqlite3.capi
            resolve({ version: capi.sqlite3_libversion() })
          } catch (err) {
            reject(JSON.stringify(err))
          }
        })
      }),
    },
    guards: {
      OPFSallow: () => Boolean(capi.sqlite3_vfs_find("opfs")),
    },
    actions: {
      sendMessage: () => postMessage({}),
      newOPFS: ({ context }) => (db = new oo1.OpfsDb(context.input.dbName) as DB),
      newVFS: ({ context }) => (db = new oo1.DB(context.input.dbName, "ct") as DB),
      optimize: () => db.exec(["PRAGMA journal_mode = wal;", "PRAGMA synchronous = normal;"]),
    },
  }),
  {
    input: {
      dbName: "file:///offline-db.sqlite",
    },
    inspect: (inspectionEvent) => {
      if (inspectionEvent.type === "@xstate.snapshot") {
        if (inspectionEvent.snapshot.status === "active") {
          const snapshotValue = inspectionEvent.snapshot as typeof inspectionEvent.snapshot & { value: string; context: any }
          if (snapshotValue.value)
            switch (snapshotValue.value) {
              // case "idle":
              //   console.log("💽", snapshotValue.value, snapshotValue.context)
              //   break
              default:
                console.log("💽", snapshotValue.value, snapshotValue.context)
            }
        }
      }
    },
  },
)
// actor.subscribe((state) => {
//   console.log(state.value)
// })
actor.start()
export default actor
