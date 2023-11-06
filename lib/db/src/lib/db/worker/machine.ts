import { assign, createMachine, not, pure } from "xstate"
type types = {
  context: {
    input: {
      dbName: string
    }
    output: {
      version: string | null
      fs: string | null
    }
    error?: {
      code: number
      message: string
    }
  }
  input: {
    dbName: string
  }
}
export default createMachine(
  {
    id: "db",
    context: ({ input }) => ({
      input: {
        dbName: input.dbName,
      },
      output: {
        version: null,
        fs: null,
      },
    }),
    initial: "db-module-init",
    states: {
      "db-module-init": {
        invoke: {
          id: "db-init",
          src: "db-init",
          onDone: { target: "#db.db-fs-check", actions: "ctx_version" },
          onError: { target: "#db.error", actions: "ctx_error" },
        },
      },
      "db-fs-check": {
        after: {
          0: [
            { target: "db-fs-opfs", guard: "allow_OPFS", actions: "ctx_fs_OPFS" },
            { target: "db-fs-vfs", guard: not("allow_OPFS"), actions: "ctx_fs_VFS" },
          ],
        },
      },
      "db-fs-opfs": {
        entry: "new_OPFS",
        after: { 0: { target: "active" } },
      },
      "db-fs-vfs": {
        entry: "new_VFS",
        after: { 0: { target: "active" } },
      },
      sync: {
        initial: "structure",
        states: {
          structure: {
            after: { 0: { target: "data" } },
          },
          data: {
            after: { 0: { target: "#db.active" } },
          },
        },
      },
      active: {
        initial: "idle",
        states: {
          idle: {
            entry: ["optimize", "msgIDLE"],
            on: {
              "table-check-exist": {
                target: "idle",
              },
              "table-create": {
                target: "idle",
              },
              "table-fill": {
                target: "idle",
              },
              query: {
                target: "idle",
              },
            },
          },
        },
      },
      error: {},
    },
    types: {} as types,
  },
  {
    actions: {
      ctx_version: assign(({ event, context }) => ({ output: { ...context.output, version: event.output.version } })),
      ctx_fs_VFS: assign(({ context }) => ({ output: { ...context.output, fs: "VFS" } })),
      ctx_fs_OPFS: assign(({ context }) => ({ output: { ...context.output, fs: "OPFS" } })),
      ctx_error: assign({ error: ({ event }) => event.data }),
    },
  },
)
