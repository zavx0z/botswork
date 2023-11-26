import { createMachine, createActor, assign, type StateValue, fromCallback, setup } from "xstate"
import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import { Buffer } from "buffer"

self.Buffer = Buffer

const machine = setup({
  actions: {
    dir_ctx: assign(({ event, context }) => ({ input: { ...context.input, dir: event.param.dir } })),
    corsProxy_ctx: assign(({ event, context }) => ({ input: { ...context.input, corsProxy: event.param.corsProxy } })),
    url_ctx: assign(({ event, context }) => ({ input: { ...context.input, url: event.param.url } })),
    progress_loaded: assign(({ event, context }) => ({ progress: { ...context.progress, ...event.param } })),
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
    progress: {
      loaded: undefined,
      total: undefined,
    },
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
        input: ({ context }) => context.input,
      },
      initial: "process",
      states: {
        process: {
          initial: "started",
          states: {
            started: {
              on: { "objects.counting": { target: "counting" } },
            },
            counting: {},
          },
        },
        auth: {
          initial: "idle",
          states: {
            idle: {},
            process: {},
            success: {},
            failure: {},
          },
        },
        message: {},
      },
    },
    ready: {},
  },
})
const actor = createActor(
  machine.provide({
    actors: {
      gitClone: fromCallback(({ input, sendBack }) => {
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
                  sendBack({ type: "objects.counting", param: { loaded, total } })
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
          .then((repo) => console.log(repo))
          .catch((err) => console.log(err))
      }),
    },
  }),
)
let prevState: StateValue
actor.subscribe((state) => {
  const { value, context } = state
  if (prevState !== value) {
    prevState = value
    postMessage({ value, context })
  }
})
actor.start()
addEventListener("message", ({ data: { type, param } }) => {
  console.log("[@lib/git]", "✨", JSON.stringify(type), { param })
  actor.send({ type, param })
})
//   listBranches: (args) => git.listBranches({ ...args, fs, dir }),
//   listFiles: (args) => git.listFiles({ ...args, fs, dir }),
//   log: (args) => git.log({ ...args, fs, dir }),
