import "@lib/theme/app.css"
import { createActor, fromPromise, type Snapshot } from "xstate"
import machine from "./machine"

let worker: Worker

const actor = createActor(
  machine.provide({
    actors: {
      loadWorker: fromPromise(function () {
        return new Promise(async (resolve, reject) => {
          try {
            const Worker = (await import("$lib/worker.ts?worker")).default
            worker = new Worker()
            resolve({ success: "ok" })
          } catch (error) {
            reject(JSON.stringify(error))
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
          const snapshotValue = inspectionEvent.snapshot as typeof inspectionEvent.snapshot & { value: string }
          switch (snapshotValue.value) {
            case "worker-loading":
              console.log("⚒️ 🔃 worker loading")
              break
            case "worker-loaded":
              console.log("⚒️ ✅ worker loaded")
              break
          }
        }
      }
    },
  },
)
export default actor
