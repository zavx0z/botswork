import { createMachine } from "xstate"
import layoutMachineFabric from "../xstate/layoutMachine"
import sideBar from "../xstate/sideBarMachine"

const rootMachine = createMachine(
  {
    id: "route-root",
    type: "parallel",
    states: {
      layout: {
        type: "parallel",
        states: {
          sideBarLeft: {
            invoke: { id: "sideBar-left", src: "sideBarLeft" },
          },
          sideBarRight: {
            invoke: { id: "sideBar-right", src: "sideBarRight" },
          },
        },
      },
      view: {
        invoke: [{ id: "canvas", src: "layoutCanvas" }],
      },
      page: {
        initial: "root",
        on: {
          NAVIGATE: [
            { target: "page.root", guard: "root" },
            { target: "page.humans", guard: "humans" },
            { target: "page.bots", guard: "bots" },
            { target: "page.groups", guard: "groups" },
            { target: "page.profile", guard: "profile" },
            { target: "page.settings", guard: "settings" },
          ],
        },
        states: {
          root: { invoke: [] },
          humans: { invoke: [] },
          bots: { invoke: [] },
          groups: { invoke: [] },
          profile: { invoke: [] },
          settings: { invoke: [] },
        },
      },
    },
    types: {} as {
      events: { type: "NAVIGATE"; pathname: string }
    },
  },
  {
    guards: {
      root: ({ event }) => event.pathname === "/",
      humans: ({ event }) => event.pathname.includes("humans"),
      bots: ({ event }) => event.pathname.includes("bots"),
      groups: ({ event }) => event.pathname.includes("groups"),
      profile: ({ event }) => event.pathname.includes("profile"),
      settings: ({ event }) => event.pathname.includes("settings"),
    },
    actors: {
      layoutCanvas: layoutMachineFabric("layoutCanvas", "0"),
      sideBarLeft: sideBar("left"),
      sideBarRight: sideBar("right"),
    },
  },
)
export default rootMachine
