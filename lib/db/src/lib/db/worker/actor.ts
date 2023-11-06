import { createActor, fromPromise } from "xstate"
import machine from "./machine"
import "../../sqlite/jswasm/sqlite3-bundler-friendly.mjs"
import type { DB } from "sqlite3oo1"

let sqlite3: any
let oo1: any
let capi: any
let db: DB

const actor = createActor(
  machine.provide({
    actors: {
      "db-init": fromPromise(function () {
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
      allow_OPFS: () => Boolean(capi.sqlite3_vfs_find("opfs")),
    },
    actions: {
      new_OPFS: ({ context }) => (db = new oo1.OpfsDb(context.input.dbName) as DB),
      new_VFS: ({ context }) => (db = new oo1.DB(context.input.dbName, "ct") as DB),
      optimize: () => db.exec(["PRAGMA journal_mode = wal;", "PRAGMA synchronous = normal;"]),
      msgIDLE: ({ context }) => postMessage({ type: "IDLE", status: "success", payload: { version: context.output.version } }),
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
              default:
                console.log("💽", snapshotValue.value, snapshotValue.context)
            }
        }
      }
    },
  },
)
actor.start()
export default actor
