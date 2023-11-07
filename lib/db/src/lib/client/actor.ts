import "@lib/theme/app.css"
import { createActor, fromCallback, fromPromise } from "xstate"
import { rootMachine, activateMachine, queryMachine } from "./machine"

let worker: Worker

const provider = rootMachine.provide({
  actors: {
    activate: activateMachine.provide({
      actors: {
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
    }),
    query: queryMachine.provide({
      actors: {
        "message-listener": fromCallback(({ sendBack, receive, self, system, input }) => {
          receive((event) => {
            switch (event.type) {
              case "put":
                worker.postMessage("put")
                break
              default:
                break
            }
          })
          const fn = (message: any) => {
            console.log(message)
          }
          worker.addEventListener("message", fn)
          return () => {
            worker.removeEventListener("message", fn)
          }
        }),
      },
    }),
  },
})
export const actor = createActor(provider)
