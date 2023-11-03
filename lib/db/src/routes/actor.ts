import "@lib/theme/app.css"
import { createActor, fromPromise, type Snapshot } from "xstate"
import machine from "./machine"

let worker: Worker

const actor = createActor(
  machine.provide({
    actors: {
      import: fromPromise(function () {
        return new Promise(async (resolve, reject) => {
          try {
            const Worker = (await import("$lib/db/worker/actor.ts?worker")).default
            worker = new Worker()
            resolve({ status: "success" })
          } catch (error) {
            reject({ code: 1, message: JSON.stringify(error) })
          }
        })
      }),
      loadWorker: fromPromise(function () {
        return new Promise(async (resolve, reject) => {
          try {
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
  }),
  {
    inspect: (inspectionEvent) => {
      if (inspectionEvent.type === "@xstate.actor") {
        // console.log("🔎 @xstate.actor", inspectionEvent)
      }
      if (inspectionEvent.type === "@xstate.event") {
        // console.log("🔎", inspectionEvent.sourceRef)
        // console.log("🔎", inspectionEvent.targetRef)
        // console.log("🔎", inspectionEvent.event)
        // console.log("🔎 @xstate.event", inspectionEvent)
      }
      if (inspectionEvent.type === "@xstate.snapshot") {
        // console.log("🔎", inspectionEvent.actorRef)
        // console.log("🔎", inspectionEvent.event)
        // console.log("🔎", inspectionEvent.snapshot)
        // console.log("🔎 @xstate.snapshot", inspectionEvent)
        if (inspectionEvent.snapshot.status === "active") {
          const snapshotValue = inspectionEvent.snapshot as typeof inspectionEvent.snapshot & { value: string; context: {} }
          if (snapshotValue.value) console.log("⚒️", snapshotValue.value, snapshotValue.context)
        }
      }
    },
  },
)
export default actor
