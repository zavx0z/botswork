export let ssr = false
export let prerender = false

import { PUBLIC_XSTATE_DEBUG, PUBLIC_IO_HOST, PUBLIC_XSTATE_IFRAME, PUBLIC_XSTATE_PANEL } from "$env/static/public"
import type { LayoutLoad } from "./$types"
import { inspect } from "@xstate/inspect"
import { interpret } from "xstate"
import { WebSocketMachine } from "$lib"

export const load = (() => {
  if (PUBLIC_XSTATE_DEBUG === "true")
    inspect({
      ...(PUBLIC_XSTATE_IFRAME === "true" ? {} : { iframe: undefined }),
      ...(PUBLIC_XSTATE_PANEL === "true"
        ? {}
        : {
            url: "https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect",
          }),
    })
  const ws = interpret(WebSocketMachine, { devTools: PUBLIC_XSTATE_DEBUG === "true" }).start()

  const socket = new WebSocket(PUBLIC_IO_HOST)
  socket.addEventListener("message", (event) => {
    console.log("message", event.data)
  })
  socket.addEventListener("open", (event) => {
    console.log("open", event)
  })
  socket.addEventListener("close", (event) => {
    console.log("close", event.code, event.reason)
  })
  socket.addEventListener("error", (event) => {
    console.log("error", event.type)
  })
  setTimeout(() => {
    socket.send("message")
  }, 1000)

  return { ws }
}) satisfies LayoutLoad
