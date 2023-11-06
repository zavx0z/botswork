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
          const IDLEsuccess = (message: any) => {
            if (message.data.type === "IDLE") {
              worker.removeEventListener("message", IDLEsuccess)
              if (message.data.status === "success") resolve({ version: message.data.payload.version })
              else reject(message.data.payload)
            }
          }
          worker.addEventListener("message", IDLEsuccess)
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
  inspect: (inspectionEvent) => {
    if (inspectionEvent.type === "@xstate.snapshot") {
      if (inspectionEvent.snapshot.status === "active") {
        const snapshotValue = inspectionEvent.snapshot as typeof inspectionEvent.snapshot & { value: string; context: {} }
        if (snapshotValue.value) console.log("⚒️", snapshotValue.value, snapshotValue.context)
      }
    }
  },
})
export default actor
