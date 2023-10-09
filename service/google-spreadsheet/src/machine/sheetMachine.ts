import { createMachine, assign } from "xstate"
type sheets = {
  id: string
  title: string
}[]
type Types = {
  events: { type: "doc.open"; path: string } | { type: "doc.close" } | { type: "doc.title.rename"; title: string }
  context: {
    path: string | null
    error: string | null
    title: string | null
    sheets: sheets
  }
  actions: { type: "pathSave" } | { type: "pathClear" } | { type: "errorSave" } | { type: "errorClear" } | { type: "sheetsSave" } | { type: "titleSave" }
  input: { path?: string }
}
export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwA4CcwEMIFpYAswwAXAOgHsUwA7AYgnOrFIEtqA3cga2YYGMArgFsaxANoAGALqJQKcrBbEWjWSAAeiAMwAmAKykdANj1GdADnMBGACxGAnAHYdjgDQgAntq3nSTkzZWelb2ViYSNgC+ke6oGNh4hCQUVHRgaGjkaKQoADaYxABmWUKk-MKikjJIIPKKyqo1mgh6Ou5eCFYSjvakWnr2Wlo29jamjuaO0bHoWLgERGT8rBC5YPTkfKR8uQpgVWp1SirUas1m7Yj2Tn0DQyNjRhNTMSBxc4mLZZsraxtbymIa1IGGomBEBxqRwapyaiEmNlI5juNlR5h0Nh0VnMlwQWkcjlIYy0Ens+kcem6uiir3eCQWyWWgL+DCYrA43F4mwAKko1gBVFAQAr7aSHBTHRqgZoIpEotEYrE4zyIPStIkSMy6cxDcxa6ZvWb0pJLH7M9bpTLZPIFYpoUr8XlAsCC4XEUXVOQSmFneGORHIwaomzozHY3FjXrE0nkymOakGunzE3bXawdbLSg0SFe+onX14-SGExmSy2BzONwqzpF67XAlWRvWIw017UcgQOBqJOfEjivNSjSIHBGXEjxNG5NfLOw3OS2dDhCY3FBLSkZwmYbmGzDBUT+JTxmbfvzgs2Cbr4Y+Yw6QajPRaXEYgzR+xGHxORwSPT7j4M01bCwqxgCePpwp0XS+PYmo6DouhOI2oQRqiRK3iYljmJ+36-saXxMnyIFQt6+bga0RiXju6JmHeYy4teRIPqSmpPM4dg4YeZA7HsoEkdKiCKqh2JPPimrfueuL+HKgxWDo37+vYwTRNEQA */
    id: "spread-sheet",
    context: ({ input }) => ({
      path: input.path || null,
      title: null,
      sheets: [],
      error: null,
    }),
    initial: "open",
    states: {
      open: {
        description: `Инициализация документа`,
        invoke: {
          id: "document",
          src: "document",
          onDone: {
            target: "#spread-sheet.doc",
            actions: ["titleSave", "sheetsSave"],
          },
          onError: {
            target: "#spread-sheet.close",
            actions: ["errorSave"],
          },
          input: ({ context }) => context.path,
        },
      },
      doc: {
        description: `Документ открыт`,
        initial: "idle",
        states: {
          idle: {
            description: `Ожидание ввода команды`,
            entry: "errorClear",
            on: {
              "doc.close": {
                description: `Закрыть документ`,
                target: "#spread-sheet.close",
              },
              "doc.title.rename": {
                description: "Переименовать документа",
                target: "#spread-sheet.doc.title",
              },
            },
          },
          title: {
            description: "Обновление заголовка документа",
            invoke: {
              id: "docTitleUpdate",
              src: "docTitleUpdate",
              // @ts-ignore
              input: ({ event: { title } }) => ({ title }),
              onDone: {
                target: "#spread-sheet.doc.idle",
                actions: "titleSave",
              },
              onError: {
                target: "#spread-sheet.doc.idle",
                actions: "errorSave",
              },
            },
          },
        },
      },
      close: {
        entry: ["pathClear"],
        description: `Документ закрыт`,
        on: {
          "doc.open": {
            description: `Открыть документ`,
            target: "open",
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
      //@ts-ignore
      titleSave: assign(({ context, event }) => ({ ...context, title: event.output.title })),
      //@ts-ignore
      sheetsSave: assign(({ context, event }) => ({ ...context, sheets: event.output.sheets })),
      // @ts-ignore
      errorSave: assign(({ context, event }) => ({ ...context, error: event.data })),
      errorClear: assign(({ context }) => ({ ...context, error: null })),

      // @ts-ignore
      pathSave: assign(({ context, event }) => ({ ...context, path: event.path })),
      pathClear: assign(({ context }) => ({ ...context, path: null })),
    },
  },
)
