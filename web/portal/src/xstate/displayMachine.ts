import { browser } from "$app/environment"
import { assign, createMachine } from "xstate"

const machine = createMachine(
  {
    id: "display",
    description: "Окно приложения",
    type: "parallel",
    context: {
      height: 0,
      width: 0,
    },
    states: {
      size: {
        description: "Размер окна приложения",
        initial: "init",
        states: {
          init: {
            exit: ["setSize"],
            always: [
              { target: "sm", guard: "sm" },
              { target: "md", guard: "md" },
              { target: "lg", guard: "lg" },
              { target: "xl", guard: "xl" },
              { target: "xxl", guard: "xxl" },
            ],
          },
          sm: {
            tags: ["phone"],
            on: { resize: "init" },
          },
          md: {
            tags: ["desktop", "pad", "phone"],
            on: { resize: "init" },
          },
          lg: {
            tags: ["desktop", "pad", "phone"],
            on: { resize: "init" },
          },
          xl: {
            tags: ["desktop"],
            on: { resize: "init" },
          },
          xxl: {
            tags: ["tv", "4k"],
            on: { resize: "init" },
          },
        },
      },
      orientation: {
        description: "Ориентация клиентского устройства",
        initial: "init",
        states: {
          init: {
            always: [
              { target: "portraitPrimary", guard: "portraitPrimary" },
              { target: "portraitSecondary", guard: "portraitSecondary" },
              { target: "landscapePrimary", guard: "landscapePrimary" },
              { target: "landscapeSecondary", guard: "landscapeSecondary" },
            ],
          },
          portraitPrimary: {
            tags: ["portrait"],
            on: { rotate: "init" },
          },
          portraitSecondary: {
            tags: ["portrait"],
            on: { rotate: "init" },
          },
          landscapePrimary: {
            tags: ["landscape"],
            on: { rotate: "init" },
          },
          landscapeSecondary: {
            tags: ["landscape"],
            on: { rotate: "init" },
          },
        },
      },
    },
  },
  {
    actions: {
      setSize: assign({
        width: ({ context }) => (browser ? window.innerWidth : context.width),
        height: ({ context }) => (browser ? window.innerHeight : context.height),
      }),
    },
    guards: {
      sm: () => (browser ? window.innerWidth < 640 : false),
      md: () => (browser ? 640 < window.innerWidth && window.innerWidth < 780 : false),
      lg: () => (browser ? 780 < window.innerWidth && window.innerWidth < 1024 : false),
      xl: () => (browser ? 1024 < window.innerWidth && window.innerWidth < 1280 : false),
      xxl: () => (browser ? 1280 < window.innerWidth && window.innerWidth < 1536 : false),
      portraitPrimary: () => (browser ? window.screen.orientation.type === "portrait-primary" : false),
      portraitSecondary: () => (browser ? window.screen.orientation.type === "portrait-secondary" : false),
      landscapePrimary: () => (browser ? window.screen.orientation.type === "landscape-primary" : false),
      landscapeSecondary: () => (browser ? window.screen.orientation.type === "landscape-secondary" : false),
    },
  },
)
export default machine
