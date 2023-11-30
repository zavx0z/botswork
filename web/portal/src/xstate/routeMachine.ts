import { assign, createMachine, sendParent, fromCallback } from "xstate"
import { browser } from "$app/environment"

const routeMachine = createMachine(
  {
    id: "router",
    initial: "observe",
    context: {
      pathname: "/",
    },
    states: {
      observe: {
        entry: "init",
        invoke: {
          id: "pathnameDetect",
          src: "routeDetector",
        },
        on: {
          NAVIGATE: {
            actions: ["changePathName", "parentUpdate"],
          },
          WARNING: "warning",
        },
      },
      warning: { on: { RELOAD: "observe" } },
    },
    // types: {} as {
    //   context: { pathname: string }
    //   events: { type: "NAVIGATE"; pathname: string } | { type: "WARNING" } | { type: "RELOAD" }
    // },
  },
  {
    actors: {
      routeDetector: fromCallback(({ receive, sendBack }) => {
        if (browser) {
          sendBack({ type: "NAVIGATE", pathname: document.location.pathname })
          let observer: MutationObserver
          const observeUrlChange = () => {
            let oldHref = document.location.href
            const body = document.querySelector("body")
            observer = new MutationObserver((mutations) => {
              if (oldHref !== document.location.href) {
                oldHref = document.location.href
                sendBack({ type: "NAVIGATE", pathname: document.location.pathname })
              }
            })
            if (body) observer.observe(body, { childList: true, subtree: true })
          }
          observeUrlChange()
          return () => observer.disconnect()
        }
        sendBack({ type: "WARNING" })
        return () => {}
      }),
    },
    actions: {
      changePathName: assign(({ context, event }) => ({ ...context, pathname: event.pathname })),
	  //@ts-ignore
      parentUpdate: sendParent(({ event }) => ({ type: "NAVIGATE", pathname: event.pathname})),
      init: assign(({ context }) => {
        if (browser) {
          const { pathname } = window.location
          return { ...context, pathname }
        }
        return { ...context }
      }),
    },
  },
)
export default routeMachine
