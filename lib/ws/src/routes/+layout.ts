export let ssr = false
export let prerender = false

import { PUBLIC_XSTATE_DEBUG, PUBLIC_IO_HOST, PUBLIC_XSTATE_IFRAME, PUBLIC_XSTATE_PANEL } from "$env/static/public"
import type { LayoutLoad } from "./$types"
import { inspect } from "@xstate/inspect"
import { interpret } from "xstate"
import { WebSocketMachine } from "$lib"

export const load = (() => {

  

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
  return { }
}) satisfies LayoutLoad
