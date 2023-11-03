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
    initial: "import",
    context: ({ input }) => ({
      input: {
        dbName: input.dbName,
      },
      output: {
        version: null,
        fs: null,
      },
    }),
    states: {
      import: {
        invoke: {
          src: "import",
          onDone: { target: "init" },
          onError: { target: "error", actions: "error_ctx" },
        },
      },
      init: {
        invoke: {
          src: "init",
          onDone: [
            {
              target: "idle",
              actions: ["VFS_ctx", "version_ctx", "newVFS"],
              guard: not("OPFSallow"),
            },
            {
              target: "idle",
              actions: ["OPFS_ctx", "version_ctx", "newOPFS"],
              guard: "OPFSallow",
            },
          ],
          onError: { target: "error", actions: "error_ctx" },
        },
      },
      idle: {
        entry: ["optimize", "msgIDLE"],
        on: {
          "table-check-exist": {},
          "table-create": {},
          "table-fill": {},
          query: {},
        },
      },
      error: {},
    },
    types: {} as types,
  },
  {
    actions: {
      version_ctx: assign(({ event, context }) => ({ output: { ...context.output, version: event.output.version } })),
      VFS_ctx: assign(({ context }) => ({ output: { ...context.output, fs: "VFS" } })),
      OPFS_ctx: assign(({ context }) => ({ output: { ...context.output, fs: "OPFS" } })),
      error_ctx: assign({ error: ({ event }) => event.data }),
    },
  },
)
