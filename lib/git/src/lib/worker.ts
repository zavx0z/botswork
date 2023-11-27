import { sendTo, createActor, assign, type StateValue, fromCallback, setup, raise } from "xstate"
import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import { Buffer } from "buffer"
import cloneMachine from "./clone/clone"
import gitInitMachine from "./clone/init"
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
        systemId: "git-clone[machine]",
        src: "git-clone[machine]",
        input: ({ context }) => ({ dir: context.input.dir, url: context.input.url, corsProxy: context.input.corsProxy }),
        onDone: { target: "idle", actions: () => console.log("done clone!!!!!!!!!!!!!") },
        onError: { target: "idle", actions: () => console.log("done clone") },
      },
    },
    ready: {},
  },
})
const actor = createActor(
  machine.provide({
    actors: {
      "git-clone[machine]": cloneMachine.provide({
        actors: {
          "git-clone[callback]": fromCallback(({ input, sendBack, system }) => {
            const { dir, url, corsProxy, parent } = input
            git
              .clone({
                fs: new LightningFS("fs"),
                http,
                dir,
                url,
                corsProxy,
                onProgress: (event) => {
                  const params: { completed: number; total: number } = { completed: event.loaded, total: event.total }
                  let targetActor
                  switch (event.phase) {
                    case "Counting objects":
                      targetActor = system.get("git-clone-init-counting")
                      if (targetActor) targetActor.send({ type: "progress.update", params })
                      break
                    case "Compressing objects":
                      targetActor = system.get("git-clone-init-compressing")
                      if (targetActor) targetActor.send({ type: "progress.update", params })
                      break
                    default:
                      // const parentState = parent.getSnapshot().value
                      // const eventType = typeof parentState === "object" ? Object.values(parentState)[0] : parentState
                      // if (eventType !== event.phase) console.log(event.phase, event)
                      // sendBack({ type: eventType !== event.phase ? "next" : "progress.update", params })
                      break
                  }
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
                    return
                    //   const regex = /Compressing objects:.*?\(\d+\/(\d+)\)/
                    //   const match = message.match(regex)
                    //   const total = match ? parseInt(match[1]) : undefined
                    //   sendBack({
                    //     type: "compress",
                    //     params: { total, completed: 0, message, status: "process" },
                    //   })
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
          "git-clone-init": gitInitMachine,
        },
      }),
    },
  }),
  {
    systemId: "git",
    state: {
      status: "active",
      value: "idle",
      historyValue: {},
      context: {
        input: {
          dir: "/",
        },
        output: {},
        property: {},
      },
      children: {},
    },
  },
)

const entanglement = new BroadcastChannel("git")
actor.system.inspect({
  next: (value) => {
    // @ts-ignore
    const systemId = value.actorRef?.options?.systemId
    switch (value.type) {
      case "@xstate.event":
        switch (value.event.type) {
          case "xstate.init":
            // console.log("[event]", value)
            entanglement.postMessage({
              type: "event.init",
              // @ts-ignore
              params: JSON.stringify({ logic: value.actorRef.logic.config, options: value.actorRef.options }),
            })
            break
          default:
            console.log("[event]", value)
            break
        }
        break
      case "@xstate.snapshot":
        switch (value.event.type) {
          case "xstate.init":
            // console.log("[snapshot]", value)
            entanglement.postMessage({
              type: "snapshot.init",
              // @ts-ignore
              params: JSON.stringify({ state: actor.getPersistedState() }),
            })
            break
          default:
            // console.log("[snapshot]", value)
            break
        }
      case "@xstate.actor":
        // console.log("[actor]", value)
        break
      default:
        // console.log(`[sys: ${value.type}]`, value)
        break
    }
    // console.log("sys", value.event?.type, value)
  },
})
actor.subscribe((state) => {
  const { value, context } = state
  // if (prevState !== value) {
  // prevState = value
  switch (value) {
    case "clone":
    // const actorClone = state.children["clone"]
    // actorClone.subscribe({
    //   error: (error) => {
    //     console.log("error", error)
    //   },
    //   next: (data) => {
    //     postMessage({ value: [value, data.value], context: data.context })
    //   },
    //   complete: () => {
    //     console.log("complete", actorClone.getSnapshot().output)
    //   },
    // })
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
