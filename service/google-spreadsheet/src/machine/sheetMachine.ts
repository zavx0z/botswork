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
  actions:
    | { type: "pathSave" }
    | { type: "pathClear" }
    | { type: "errorSave" }
    | { type: "errorClear" }
    | { type: "sheetsSave" }
    | { type: "titleSave" }
    | { type: "titleClear" }
    | { type: "sheetsClear" }
  input: { path?: string }
}
export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwA4CcwEMIFpYAswwAXAOgHsUwA7AYgnOrFIEtqA3cga2YYGMArgFsaxANoAGALqJQKcrBbEWjWSAAeiAMwAWAKykAbPoCMAdi0AOHZYBMek4cMAaEAE9Exy6Tu2AnCZ6hhJmenYmAL4RrqgY2HiEJBRUdGBoaORopCgANpjEAGaZQqT8wqKSMkgg8orKqtWaCCaktjq2ITo6EoZ+hlq2tsauHgiWgaRmJpZaWn5mfvr2llEx6Fi4BERk-PTkfKR8OQpglWq1SirUak26LY6Wen4hhuYStlojiCY-fqQS5hM7Qkjy0UzMqxAsQ2CW2pX2ewOymIOWYGGomBEZ2qF3q10anneRjMhgsZg6JMsfj0X2aPS0-ypXXM1h+lgh0Sh63iWyS-FYEFRtHUsGI+WYmAKxDSAAoOhIAJS0aE8xI7fYC1HYuQKS4NUBNExaRw+KZMmx6PQ6Aa0vx2HzvPx+LTvHRmUKRTkqzZq+FIpRChhMUii8Uh7k+uH85Fa6TnXV4m7fRy2HzU9paQxUq1WWk-CQSYm2MxU8ndckrL0R2F8jUxsB7YNsTg8P0AFQDYAAqigIOLtTUE1ck2M+qa7UCJMans7bYZUzpeoZLf4rB8tJDvTX1f6UQ20hksrl8kU0CV+B29z2+9KB7jhwTR2ZSJbHH0nCXnp93IhLL0X44VrBAWAR9Ju1a8mQRwnIiyQ0HeQ76ho3xuqQOjTFY1pPBINh+La9hoWCsyWAWZgSGEnqctQ5AQHAahbpB8Z1A+BqIDgi6THoCz2E8LqZu6Oi0g4qbvMEJi2CYiyhBJ4FxJGSSUDQTF6virEIO0tLGDo-xDO8Ek-DYPyyTCkF+spiaPpa2mkqSYIUlm1KaQ4AHLl0YKScaHJrHJ25+pqYDmSxyHNMWz5BOSZEWEaljWHmIKFqErzvJ5pJ+MZqpRnWnaBUhTR2H87o4V0bR6BJIJxcEaGDCS+h-hFtjpfJUHHLAAU4ohqnBVmpB+LYMzTACLq4TSP7ND8BjieM1p-rofUclEQA */
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
        on: {
          "doc.close": {
            description: `Закрыть документ`,
            target: "#spread-sheet.close",
          },
          "doc.title.rename": {
            description: "Переименовать документ",
            target: "#spread-sheet.doc.title",
          },
        },
        initial: "idle",
        states: {
          idle: {
            description: `Ожидание ввода команды`,
            entry: "errorClear",
            after: { 200: { actions: "errorClear" } },
          },
          title: {
            description: "Обновление заголовка документа",
            invoke: {
              id: "docTitleUpdate",
              src: "docTitleUpdate",
              // @ts-ignore
              input: ({ event: { title } }) => ({ title }),
              onDone: { actions: "titleSave" },
              onError: { actions: "errorSave" },
            },
            onDone: "#spread-sheet.doc.idle",
          },
        },
        exit: ["errorClear", "titleClear", "sheetsClear"],
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
      titleClear: assign(({ context, event }) => ({ ...context, title: null })),
      //@ts-ignore
      sheetsSave: assign(({ context, event }) => ({ ...context, sheets: event.output.sheets })),
      sheetsClear: assign(({ context, event }) => ({ ...context, sheets: [] })),
      // @ts-ignore
      errorSave: assign(({ context, event }) => ({ ...context, error: event.data })),
      errorClear: assign(({ context }) => ({ ...context, error: null })),

      // @ts-ignore
      pathSave: assign(({ context, event }) => ({ ...context, path: event.path })),
      pathClear: assign(({ context }) => ({ ...context, path: null })),
    },
  },
)
