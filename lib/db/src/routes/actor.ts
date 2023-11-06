import "@lib/theme/app.css"
import { createActor, fromCallback, fromPromise } from "xstate"
import machine from "./machine"

let worker: Worker

const workerProvider = machine.provide({
  actors: {
    msg: fromCallback(() => {
      worker.addEventListener("message", (message) => console.log(message))
    }),
    "worker-import": fromPromise(function () {
      return new Promise(async (resolve, reject) => {
        try {
          const Worker = (await import("$lib/db?worker")).default
          worker = new Worker()
          const receiveContext = (message: any) => {
            if (message.data.type === "active") {
              worker.removeEventListener("message", receiveContext)
              message.data.status === "success" ? resolve(message.data.payload) : reject(message.data.payload)
            }
          }
          worker.addEventListener("message", receiveContext)
        } catch (error) {
          reject({ code: 1, message: JSON.stringify(error) })
        }
      })
    }),
  },
})

const actor = createActor(workerProvider, {
  input: {
    tables: [
      {
        name: "stuff",
        pk: "id",
        columns: [{ name: "id", type: "string" }],
      },
      {
        name: "confusion",
        pk: "id",
        columns: [{ name: "id", type: "string" }],
      },
    ],
  },
})
actor.subscribe((state) => console.log("⚒️", state.value, state.context))
export default actor
export type dbType = typeof actor
