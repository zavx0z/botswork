import { createMachine, createActor, assign, type StateValue, fromCallback, setup } from "xstate"
import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import FS from "@isomorphic-git/lightning-fs"

const fs = new FS("fs")
const machine = setup({
  actions: {
    dir_ctx: assign(({ event, context }) => ({ input: { ...context.input, dir: event.param.dir } })),
    corsProxy_ctx: assign(({ event, context }) => ({ input: { ...context.input, corsProxy: event.param.corsProxy } })),
    url_ctx: assign(({ event, context }) => ({ input: { ...context.input, url: event.param.url } })),
  },
}).createMachine({
  id: "git",
  context: {
    input: {
      dir: undefined,
      corsProxy: undefined,
      url: undefined,
    },
    output: {
      progress: "",
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
      initial: "clone.start",
      states: {
        "clone.start": {
          entry: [() => console.log("iiiiiii")],
        },
        "clone.progress": {},
        "clone.auth": {},
        "clone.message": {},
        "clone.auth.failure": {},
        "clone.auth.success": {},
      },
    },
  },
})
const actor = createActor(
  machine.provide({
    actors: {
      gitClone: fromCallback(({ input }: { input: { dir: string; url: string; corsProxy: string } }) => {
        const { dir, url, corsProxy } = input
        console.log(dir, url, corsProxy)
        git
          .clone({
            fs,
            http,
            dir,
            url,
            corsProxy,
            onProgress: (evt) => {
              console.log(evt)
              // mainThread.progress(evt)
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
          .then((repo) => {})
          .catch((err) => {})
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
  console.log("⚒️", { type, param })
  actor.send({ type, param })
})
//   listBranches: (args) => git.listBranches({ ...args, fs, dir }),
//   listFiles: (args) => git.listFiles({ ...args, fs, dir }),
//   log: (args) => git.log({ ...args, fs, dir }),
