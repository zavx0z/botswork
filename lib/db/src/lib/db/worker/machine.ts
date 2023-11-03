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
          onError: { target: "error", actions: "setError" },
        },
      },
      init: {
        invoke: {
          src: "init",
          onDone: [
            {
              target: "idle",
              actions: [assign(({ context }) => ({ output: { ...context.output, fs: "VFS" } })), "setVersion", "newVFS"],
              guard: not("OPFSallow"),
            },
            {
              target: "idle",
              actions: [assign(({ context }) => ({ output: { ...context.output, fs: "OPFS" } })), "setVersion", "newOPFS"],
              guard: "OPFSallow",
            },
          ],
          onError: { target: "error", actions: "setError" },
        },
      },
      idle: {
        entry: "optimize",
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
      setVersion: assign(({ event, context }) => ({ output: { ...context.output, version: event.output.version } })),
      setError: assign({ error: ({ event }) => event.data }),
    },
  },
)
