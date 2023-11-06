import { assign, createMachine, not, pure } from "xstate"
type types = {
  context: {
    input: {
      path: string
    }
    output: {
      version: string | null
      fs: string | null
      size: number | undefined
    }
    error?: ErrorMachine
  }
  input: {
    path: string
  }
}
export default createMachine(
  {
    id: "db",
    context: ({ input }) => ({
      input: {
        path: input.path,
      },
      output: {
        version: null,
        fs: null,
        size: undefined,
      },
    }),
    initial: "module-init",
    states: {
      "module-init": {
        invoke: {
          id: "db-init",
          src: "db-init",
          onDone: { target: "#db.fs-check", actions: "ctx_version" },
          onError: { target: "#db.error", actions: "ctx_error" },
        },
      },
      "fs-check": {
        entry: "ctx_size",
        after: {
          0: [
            { target: "fs-opfs", guard: "allow_OPFS", actions: "ctx_fs_OPFS" },
            { target: "fs-vfs", guard: not("allow_OPFS"), actions: "ctx_fs_VFS" },
          ],
        },
      },
      "fs-opfs": {
        entry: "new_OPFS",
        after: { 0: { target: "active" } },
      },
      "fs-vfs": {
        entry: "new_VFS",
        after: { 0: { target: "active" } },
      },
      active: {
        entry: ["optimize", "send_ctx"],
        type: "final",
      },
      error: {},
    },
    types: {} as types,
  },
  {
    guards: {
      allow_OPFS: ({ context }) => Boolean(context.output.size),
    },
    actions: {
      ctx_version: assign(({ event, context }) => ({ output: { ...context.output, version: event.output.version } })),
      ctx_fs_VFS: assign(({ context }) => ({ output: { ...context.output, fs: "VFS" } })),
      ctx_fs_OPFS: assign(({ context }) => ({ output: { ...context.output, fs: "OPFS" } })),
      ctx_error: assign({ error: ({ event }) => event.data }),
    },
  },
)
