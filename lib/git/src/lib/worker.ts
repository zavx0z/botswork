import { createMachine, createActor, assign, type StateValue, fromCallback, setup, raise } from "xstate"
import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import { Buffer } from "buffer"
import cloneMachine from "./machine/clone"

self.Buffer = Buffer
type Input = {
  dir: string
  url: string
  corsProxy: string
}
export interface Context {
  input: Input
}
const machine = setup({
  actions: {
    dir_ctx: assign(({ event, context }) => ({ input: { ...context.input, dir: event.params.dir } })),
    corsProxy_ctx: assign(({ event, context }) => ({ input: { ...context.input, corsProxy: event.params.corsProxy } })),
    url_ctx: assign(({ event, context }) => ({ input: { ...context.input, url: event.params.url } })),
  },
}).createMachine({
  id: "git",
  types: {} as {},
  context: {
    input: {
      dir: "/",
      corsProxy: undefined,
      url: undefined,
    },
    output: {},
    property: {},
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        clone: { target: "clone", actions: ["dir_ctx", "corsProxy_ctx", "url_ctx"] },
      },
    },
    clone: {
      invoke: {
        id: "clone",
        src: "gitClone",
        input: ({ context }) => ({ dir: context.input.dir, url: context.input.url, corsProxy: context.input.corsProxy }),
        onDone: { target: "idle" },
        onError: { target: "idle" },
      },
    },
    ready: {},
  },
})
const actor = createActor(
  machine.provide({
    actors: {
      gitClone: cloneMachine.provide({
        actors: {
          "git-clone": fromCallback(({ input, sendBack, system }) => {
            const { dir, url, corsProxy, parent } = input
            git
              .clone({
                fs: new LightningFS("fs"),
                http,
                dir,
                url,
                corsProxy,
                onProgress: (event) => {
                  const parentState = parent.getSnapshot().value
                  const params = { completed: event.loaded, total: event.total }
                  const eventType = typeof parentState === "object" ? Object.values(parentState)[0] : parentState

                  if (eventType !== event.phase) console.log(event.phase, event)

                  sendBack({ type: eventType !== event.phase ? "next" : "progress.update", params })
                },
                onMessage: (message) => {
                  if (message.startsWith("Counting objects:")) return
                  // const regex = /Counting objects:.*?\(\d+\/(\d+)\)/
                  else if (message.startsWith("Enumerating objects:")) {
                    const regex = /Enumerating objects: (\d+), done\./
                    const match = message.match(regex)
                    const total = match ? parseInt(match[1]) : undefined
                    sendBack({
                      type: "clone",
                      params: { total, completed: 0, message, status: "process" },
                    })
                  } else if (message.startsWith("Compressing objects:")) {
                    const regex = /Compressing objects:.*?\(\d+\/(\d+)\)/
                    const match = message.match(regex)
                    const total = match ? parseInt(match[1]) : undefined
                    sendBack({
                      type: "compress",
                      params: { total, completed: 0, message, status: "process" },
                    })
                  } else if (message.startsWith("Total"))
                    sendBack({
                      type: "update",
                      params: { completed: 0, message, status: "process" },
                    })
                  else console.log(message)
                },
                onAuth: (url) => {
                  console.log(url)
                  // return mainThread.fill(url)
                },
                onAuthFailure: (url, auth) => {
                  console.log(url, auth)
                  // return mainThread.rejected({ url, auth })
                },
                onAuthSuccess: (url, auth) => {
                  console.log(url, auth)
                },
              })
              .then(() => sendBack({ type: "complete.success", params: { message: "cloned" } }))
              .catch((err) => sendBack({ type: "complete.success", params: { message: JSON.stringify(err) } }))
          }),
        },
      }),
    },
  }),
)
// Message TO main thread
let prevState: StateValue
actor.subscribe((state) => {
  const { value, context } = state
  // if (prevState !== value) {
  // prevState = value
  switch (value) {
    case "clone":
      const actorClone = state.children["clone"]
      actorClone.subscribe({
        complete() {
          console.log("complete", actorClone.getSnapshot().output)
        },
      })
      actorClone.subscribe((stateClone) => {
        postMessage({ value: [value, stateClone.value], context: stateClone.context })
      })
    default:
      postMessage({ value, context })
      break
    // }
  }
})
// Message FROM main thread
addEventListener("message", ({ data: { type, params } }) => {
  console.log("[@lib/git]", "✨", JSON.stringify(type), { params })
  actor.send({ type, params })
})
actor.start()
//   listBranches: (args) => git.listBranches({ ...args, fs, dir }),
//   listFiles: (args) => git.listFiles({ ...args, fs, dir }),
//   log: (args) => git.log({ ...args, fs, dir }),
