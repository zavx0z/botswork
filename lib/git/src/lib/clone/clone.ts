// https://isomorphic-git.org/docs/en/clone
import type { Complete, Progress } from "$lib/types"
import { assign, createMachine, raise } from "xstate"
type Input = {
  dir: string
  url: string // URL-адрес удаленного репозитория
  corsProxy: string // Дополнительный прокси-сервер CORS . Значение хранится в файле конфигурации git для этого репозитория.
}
export interface Context {
  input: Input
  output?: object
  progress?: Progress
  complete?: Complete
}

export default createMachine(
  {
    id: "git-clone",
    types: {} as {
      context: Context
      input: Input
      output: Complete
    },
    context: ({ input }) => ({ input }),
    invoke: {
      src: "git-clone",
      input: ({ context, self }) => ({ ...context.input, parent: self }),
    },
    on: {
      // "complete.success": { target: ".complete", actions: ["complete_success_ctx"] },
      // "complete.error": { target: ".complete", actions: ["complete_error_ctx"] },
      // "Analyzing workdir": { target: ".Analyzing workdir", actions: ["progress_ctx"] },
      // "Compressing objects": { target: ".Compressing objects", actions: ["progress_ctx"] },
      // "Counting objects": { target: ".Counting objects", actions: ["progress_ctx"] },
      // "Updating workdir": { target: ".Updating workdir", actions: ["progress_ctx"] },
      // "Resolving deltas": { target: ".Resolving deltas", actions: ["progress_ctx"] },
      // "Receiving objects": { target: ".Receiving objects", actions: ["progress_ctx"] },
      // "*": { target: ".other", actions: ["progress_ctx"] },
      // "progress.update": { actions: ["progress_ctx"] },
    },
    initial: "check",
    states: {
      check: {
        on: {
          update: { target: "exist", actions: ["progress_ctx", "complete_update"] },
          clone: { target: "init", actions: ["progress_ctx", "complete_update"] },
        },
      },
      exist: {
        initial: "Analyzing workdir",
        states: {
          "Analyzing workdir": {
            on: {
              "progress.update": { actions: ["progress_ctx"] },
              next: { target: "Updating workdir", actions: ["progress_ctx"] },
            },
          },
          "Updating workdir": {
            on: {},
          },
        },
      },
      init: {
        invoke: {
          src: "git-clone-init",
          systemId: "git-clone-init",
          onDone: { target: "completed", actions: () => console.log("done init!!!!!!!!!!!!!") },
        },
      },
      completed: { type: "final" },
      other: {
        entry: ({ event }) => console.log(event),
      },
      "Counting objects": {},
      "Receiving objects": {},
      "Resolving deltas": {},
      "Updating workdir": {},
      "Compressing objects": {},
      "Analyzing workdir": {},
      // complete: {
      //   entry: "progress_delete",
      //   type: "final",
      // },
    },
    // output: ({ context }) => context.complete,
  },
  {
    actions: {
      progress_delete: assign(({ event }) => ({ progress: undefined })),
      progress_ctx: assign(({ event }) => ({ progress: { total: event.params.total, completed: event.params.completed } })),
      complete_error_ctx: assign(({ event }) => ({ complete: { status: "error" as Complete["status"], message: event.params.message } })),
      complete_success_ctx: assign(({ event }) => ({ complete: { status: "success" as Complete["status"], message: event.params.message } })),
      complete_update: assign(({ event }) => ({ complete: { status: event.params.status, message: event.params.message } })),
    },
  },
)
