import { createMachine, assign } from "xstate"

type contextType = {
  output: {
    rootFileSystemDirectoryHandle: {
      kind: "directory" | undefined
      name: "" | undefined
    }
  }
  error?: ErrorMachine
}
type eventsType = { type: "file.create"; params: { fileName: string; content: string } } | { type: "file.from.device"; params: { handle: FileSystemFileHandle } }
export const machine = createMachine(
  {
    id: "opfs",
    types: {} as { context: contextType; evens: eventsType },
    context: {
      output: {
        rootFileSystemDirectoryHandle: {
          kind: "directory",
          name: "",
        },
      },
    },
    initial: "init",
    states: {
      init: {
        invoke: {
          src: "rootGetter",
          onDone: {
            target: "idle",
            actions: "ctx_rootFileSystemDirectoryHandle",
          },
          onError: { actions: "ctx_error" },
        },
      },
      idle: {
        on: {
          "file.create": { target: "file-create" },
          "file.from.device": { target: "file-from-device" },
        },
      },
      "file-create": {
        invoke: {
          src: "fileCreate",
          input: ({ event }) => event.params,
          onDone: { target: "idle" },
          onError: { actions: "ctx_error" },
        },
      },
      "file-from-device": {
        invoke: {
          src: "fileFromDevice",
          input: ({ event }) => event.params,
          onDone: { target: "idle" },
          onError: { actions: "ctx_error" },
        },
      },
    },
  },
  {
    actions: {
      //@ts-ignore
      ctx_rootFileSystemDirectoryHandle: assign(({ event }) => ({ output: { rootFileSystemDirectoryHandle: event.output } })),
      //@ts-ignore
      ctx_error: assign(({ event }) => ({ error: event.data as ErrorMachine })),
    },
  },
)
