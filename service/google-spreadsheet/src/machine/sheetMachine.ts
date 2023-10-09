import { createMachine, assign } from "xstate"
type Types = {
  events: { type: "doc.init"; path: string } | { type: "doc.close" } | { type: "doc.title.update"; title: string }
  context: {
    path: string | null
    error: string | null
    title: string | null
  }
  actions: { type: "pathSave" } | { type: "pathClear" } | { type: "errorSave" } | { type: "errorClear" }
  input: { path?: string }
}
export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwA4CcwEMIFpYAswwAXAOgEsA7c4gYggHtKwLKA3BgaxcYGMBXALZhKxANoAGALqJQKBrBrkmskAA9EAZgBMAVlLaAbLsPaJADgDsl3RO3aANCACeiACyGJpAJzbvlw2tvAEZzbVDDAF9Ip1QMbDxCElYaWjA0NAY0UhQAG0xiADMswVI+IRFxaVV5RWJlSlUNBF1HF0RgiV1LUmNDHW1NW383S2jY9CxcAiIyBhQRegZeUl5chTBJGSQQWqUVHebTJ1cEf30+zU1gw19Nc1HxkDipxNnSecW+UnriXJZ+CgIAVNtUdnt6gdQM1WoZSJZNG5NNZgto3N5EZoTu4PD4-NYwpYQvdgk8XgkZslPpQfjR-gBVIEgpbMVgcbhlZYAFTpYEZwOIoO2cgU+0ahw6EnupGCllCugVljcsus2IQyuCpDcumu3kCCox5kRZMmFKScwWNN+DKZgrSGSyOXyRRKnN4PL+fNtQpqosh4uhkulsvliuV1ksap1XksUuCerMRgk8ZN8Wm5o+ltpnv5IIgtDUsGIINImEKgrQAApOgBKWjk9PvanZm0CyBbX11BpNDr3OEBA1WMzBeNtU5ItwyokDrrKwz9VOvSlkNYbJYrKg0Dvgv3diUIa76IwmMxWGx2McdPQ+by37wWNzmWWjczRGIgSgMCBwVQNt4kTsxR7BAcEMNUcH0O8oOgkJdEXM13k3YhAP9YC3EvFpgguExEUfcwdVfd8-2XTMRBQvdA3VSxzHhTEUTRDEkTVNF9G1HQ7DCCxbiiIjTUbKks3ICB-nIqF1A6XRUVIJ80XMfwET0bxzDVNw3C8dDzmsOcTEIiY03-C0RBbL021EgNxIQWN9AkDxzEMOybifJ8VMGPFznvPRJPwtx4P4wyrV5XNBQgMzgNRdDSAkaiorCbwFVwlSrineSFWVR80R4vSlwzVdYDAUL9zRbQtXCGTbm1XQkQwuL9Cw-orkMUIVU0N9IiAA */
    id: "spread-sheet",
    context: ({ input }) => {
      console.log("input ", input.path ? input.path : null)
      return {
        path: input.path ? input.path : null,
        title: null,
        error: null,
      }
    },
    initial: "init",
    states: {
      init: {
        description: `Инициализация документа`,
        invoke: {
          id: "document",
          src: "document",
          onDone: { target: "open" },
          onError: {
            target: "close",
            actions: "errorSave",
          },
          input: ({ context }) => ({ path: context.path }),
        },
      },
      open: {
        description: `Документ открыт`,
        entry: "errorClear",
        on: {
          "doc.close": {
            target: "close",
            description: `Закрыть документ`,
          },
          "doc.title.update": ".titleUpdate",
        },
        initial: "idle",
        states: {
          idle: {},
          titleUpdate: {
            invoke: {
              id: "docTitleUpdate",
              src: "docTitleUpdate",
              input: ({ event }) => event.type === "doc.title.update" && event.title,
              onDone: {
                target: "#spread-sheet.open.titleUpdated",
                actions: assign(({ context, event }) => ({ ...context, title: event.output })),
              },
              onError: {
                target: "#spread-sheet.open.idle",
                actions: "errorSave",
              },
            },
          },
          titleUpdated: {
            after: {
              10: { target: "#spread-sheet.open.idle" },
            },
          },
        },
      },
      close: {
        entry: ["pathClear"],
        description: `Документ закрыт`,
        on: {
          "doc.init": {
            description: `Открыть документ`,
            target: "init",
            actions: ["pathSave"],
          },
        },
      },
    },

    types: {} as Types,
    description: `Таблица`,
  },
  {
    actions: {
      errorClear: assign(({ context }) => ({ ...context, error: null })),
      errorSave: assign(({ context, event }) => {
        // @ts-ignore
        const { data } = event
        return { ...context, error: data }
      }),
      pathClear: assign(({ context }) => ({ ...context, path: null })),
      pathSave: assign(({ context, event }) => {
        switch (event.type) {
          case "doc.init":
            return { ...context, path: event.path }
          case "doc.close":
            return { ...context, path: null }
          default:
            return context
        }
      }),
    },
  },
)
