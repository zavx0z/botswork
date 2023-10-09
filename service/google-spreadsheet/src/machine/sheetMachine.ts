import { createMachine, assign } from "xstate"
type Types = {
  events: { type: "doc.open"; path: string } | { type: "doc.close" } | { type: "document.title.update"; title: string }
  context: {
    path: string | null
    error: string | null
    docTitle: string | null
  }
  actions: { type: "pathSave" } | { type: "pathClear" } | { type: "errorSave" } | { type: "errorClear" }
  input: { path?: string }
}
export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5RQPYqgGzAWlgCzDABcA6FABzADsBiCFKsEgSyoDcUBrJ+gYwFcAttSIBtAAwBdRKHIpYzIswYyQAD0QBmAEwBWEtoBsuw3oA0IAJ5a9JACwB2Y6d0BfVxdTosuAsTKUtGAATsEowSTkGACGRABm4YIkfEIiEtJIIHIKSiqZGgg6+kYm5laIdoYAjAZuHiBemDj4hKQU1JB0KLwkvBjyYOmq2YrKVKoFhgAc+lVTDroW1oXamiQAnE6ldZ5oTb6tvf2wYF097VRDmSO54-mI07Pzi+UIVUbu9VQoEHCqjT4WsRhvJRnlQAVsIYlogoe5dt5mn42oEQTkxhMKtoYW9dGsHCUXPCGntAciAh0IGiwXcIRV1oYSA5NHZNAscdoZgZCXpiQCkYc+gNqbdMQgZg4NtN2a9OZKCc5eZ8gA */
    id: "google-sheet",
    description: `Таблица Google`,
    initial: "close",
    context: ({ input }) => {
      console.log("input ", input.path ? input.path : null)
      return {
        path: input.path ? input.path : null,
        docTitle: null,
        error: null,
      }
    },
    states: {
      open: {
        description: `Открытие документа`,
        invoke: {
          id: "document",
          src: "document",
          onDone: { target: "opened" },
          onError: {
            target: "close",
            actions: "errorSave",
          },
          input: ({ context }) => ({ path: context.path }),
        },
      },
      opened: {
        description: `Документ открыт`,
        entry: "errorClear",
        on: {
          "doc.close": "close",
          "document.title.update": ".titleUpdate",
        },
        initial: "idle",
        states: {
          idle: {},
          titleUpdate: {
            invoke: {
              id: "docTitleUpdate",
              src: "docTitleUpdate",
              input: ({ event }) => event.type === "document.title.update" && event.title,
              onDone: {
                target: "#google-sheet.opened.titleUpdated",
                actions: assign(({ context, event }) => ({ ...context, docTitle: event.output })),
              },
              onError: {
                target: "#google-sheet.opened.idle",
                actions: "errorSave",
              },
            },
          },
          titleUpdated: {
            after: {
              10: { target: "#google-sheet.opened.idle" },
            },
          },
        },
      },
      close: {
        entry: ["pathClear"],
        description: `Документ закрыт`,
        on: {
          "doc.open": {
            description: `Открыть таблицу`,
            target: "open",
            actions: ["pathSave"],
          },
        },
      },
    },
    types: {} as Types,
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
          case "doc.open":
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
