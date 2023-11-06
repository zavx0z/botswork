import { createActor, fromPromise, assign } from "xstate"
import machine from "./machine"
import "../../sqlite/jswasm/sqlite3-bundler-friendly.mjs"
import type { DB } from "sqlite3oo1"

let sqlite3: any
let oo1: any
let capi: any
let db: DB

const provider = machine.provide({
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
  actions: {
    ctx_size: assign(({ context }) => ({ output: { ...context.output, size: capi.sqlite3_vfs_find("opfs") } })),
    new_OPFS: ({ context }) => (db = new oo1.OpfsDb(context.input.path) as DB),
    new_VFS: ({ context }) => (db = new oo1.DB(context.input.path, "ct") as DB),
    optimize: () => db.exec(["PRAGMA journal_mode = wal;", "PRAGMA synchronous = normal;"]),
    send_ctx: ({ context }) => postMessage({ type: "active", status: "success", payload: { ...context.input, ...context.output } }),
  },
})

const actor = createActor(provider, { input: { path: "file:///offline-db.sqlite" } })
actor.subscribe((state) => console.log("💽", state.value, state.context))
actor.start()
export default actor
