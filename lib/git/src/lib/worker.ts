import { createMachine, createActor, assign, type StateValue, fromCallback, setup, raise } from "xstate"
import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import { Buffer } from "buffer"
import cloneMachine from "./machine/clone"

self.Buffer = Buffer

const machine = setup({
  actions: {
    dir_ctx: assign(({ event, context }) => ({ input: { ...context.input, dir: event.params.dir } })),
    corsProxy_ctx: assign(({ event, context }) => ({ input: { ...context.input, corsProxy: event.params.corsProxy } })),
    url_ctx: assign(({ event, context }) => ({ input: { ...context.input, url: event.params.url } })),
  },
}).createMachine({
  id: "git",
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
          "git-clone": fromCallback(({ input, sendBack }) => {
            const { dir, url, corsProxy } = input
            const fs = new LightningFS("fs")
            git
              .clone({
                fs,
                http,
                dir,
                url,
                corsProxy,
                onProgress: (event) => {
                  switch (event.phase) {
                    case "Counting objects":
                      const { loaded, total } = event
                      sendBack({ type: "objects.counting", params: { loaded, total } })
                      break
                    case "Analyzing workdir":
                      console.log(event)
                      break
                    default:
                      console.log(event)
                      break
                  }
                },
                onMessage: (msg) => {
                  console.log(msg)
                  // mainThread.print(msg)
                },
                onAuth: (url) => {
                  console.log(url)
                  // return mainThread.fill(url)
                },
                onAuthFailure: (url, auth) => {
                  console.log(url, auth)
                  // return mainThread.rejected({ url, auth })
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
        console.log(stateClone)
        console.log(state)
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
