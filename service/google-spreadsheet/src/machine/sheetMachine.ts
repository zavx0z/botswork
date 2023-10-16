import { createMachine, assign, sendParent } from "xstate"
type sheets = {
  id: string
  title: string
}[]
type CellType = {
  a1Address: string
  rowIndex: number
  columnIndex: number
  value: number | string | boolean
}
export type SheetMachineEvents =
  | { type: "open"; path: string }
  | { type: "close" }
  | { type: "title.update"; title: string }
  | { type: "spreadsheet.column.request"; sheetId?: string; sheetName?: string; index: number }

export type SheetMachineTypes = {
  context: {
    path: string | null
    error: string | null
    title: string | null
    sheets: sheets
    cells: CellType[]
  }
  events: SheetMachineEvents
  actions:
    | { type: "spreadshit_path_save" }
    | { type: "spreadshit_path_clear" }
    | { type: "error_save" }
    | { type: "error_clear" }
    | { type: "spreadsheet_sheets_save" }
    | { type: "sheetsClear" }
    | { type: "spreadsheet_title_save" }
    | { type: "titleClear" }
    | { type: "cellsSave" }
  input: { path?: string }
}

export default createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwA4CcwEMKwBZjABcBiAexTADsBtABgF1FQVTYBLQt0ypkAD0QAWAEwAaEAE9EwwQFYAdAA4A7IICcwgIwBmQZq3DhAXyPjUGbHgIkAxgBtWYOoyQgW7Tt14CEI8VIRZNVp5WkUg5U1w4TVZFRMzdCwcfCJ5cio2SihiCG4weSyAN1IAawLzZKsiAH0MmgZedw4uHlcfADZdeUFFQUEOzVplbVlaMP9pTU15WWFtbVjdWUXFBJBKy1TCdIpKLJywNDRSNHkUO0xCADNTgFt5TZTrOr3nJtYWr3bEDpkevoDIYjMYTSRCYQdJSKYSKTRqDRwtSaQTrJ7VHb1YicQh2AoAVxQECuTkarmanjaoB8ijU2lm42mHSCwLUkwQ83pgmUzO0tDki3mHTRSS21l2VHkOLxuXyhUoJXKj1Fz1q0tJLmYn0p3kQOjUUI6KmUyloQ25ZvZMRCS1oK0h0zhslRpg2KoxEsoUo4MqOJzOFyutzQD3R2xq6ve5O1rV1CH1huNpvNyfZ8OU8gRCI6qhEMOdLsSFlVO3sjjIbzJWo8sZ+CC6ggB-UGw1G40U7IWNpiXXbHQ6YTULtdlFIEDgvDD1g+Ne+1MQAFoOuyF-9xuMFsoNJFgvMRcWPfUDjOvlT+NJuZm+osRipDNyrXJ5APNGNkaaN7J91Vtp6Tzq6z6BRQSZFlhjZcF6y5LM+lfPRFBzXRvzFNJ6kKCA8X-Wt53jQZhHkKIeTmUY6RkZdIMMKE1CI2gBwLe1CzdA9fzQ9UsLnc9435EItFpQQ7UhXR+ytIYeho2Q-n42hRi-V0pzSMtYDAdizxpAYCIk4QglkTQiO0DtIJEDMBzpLcNANV8TBMIA */
    id: "spreadsheet",
    context: {
      path: null,
      title: null,
      sheets: [],
      error: null,
      cells: [],
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          open: { target: "opening", actions: "spreadshit_path_save" },
        },
      },
      opening: {
        invoke: {
          id: "spreadsheet_open",
          src: "spreadsheet_open",
          input: ({ context }) => context.path,
          onDone: {
            target: "open",
            actions: ["spreadsheet_title_save", "spreadsheet_sheets_save", ({ event }) => sendParent({ type: "open.complete", sheets: event.output.sheets })],
          },
          onError: {
            target: "close",
            actions: ["error_save"],
          },
        },
      },
      open: {
        on: {
          "title.update": ".title",
          close: "close",
          open: { target: "opening", actions: "spreadshit_path_save" },
        },
        initial: "idle",
        entry: "error_clear",
        states: {
          idle: {},
          title: {
            invoke: {
              id: "spreadsheet_title",
              src: "spreadsheet_title",
              input: ({ event: { title } }: any) => ({ title }),
              onDone: { target: "idle", actions: "spreadsheet_title_save" },
              onError: { target: "idle", actions: "error_save" },
            },
          },
        },
      },

      // "document.idle": {
      //   description: `Переход в ожидание`,
      //   target: "#spreadsheet.document.idle",
      // },
      // "document.update.title": {
      //   description: "Переименовать документ",
      //   target: "#spreadsheet.document.title",
      // },
      // "document.rows.read.all": {
      //   description: "Получить все строки",
      //   target: "#spreadsheet.document.rows",
      // },
      // "document.cells.read.all": {
      //   description: "Получить все ячейки",
      //   target: "#spreadsheet.document.cells",
      // },
      // "document.column.request": {
      //   description: "Получить колонку по индексу",
      //   target: "#spreadsheet.document.cols",
      // },
      // initial: "idle",
      // states: {
      //   sheet: {
      //     description: "Открыт лист документа",
      //     initial: "idle",
      //     states: {
      //       idle: {
      //         description: `Ожидание ввода команды`,
      //         entry: "error_clear",
      //         after: { 200: { actions: "error_clear" } },
      //       },
      //       // rows: {
      //       //   description: "Строки",
      //       //   invoke: {
      //       //     src: "rows",
      //       //     // @ts-ignore
      //       //     input: ({ event: { title } }) => ({ title }),
      //       //     onDone: {},
      //       //     onError: {},
      //       //   },
      //       //   // onDone: "#spreadsheet.document.idle",
      //       // },
      //       // cells: {
      //       //   description: "Ячейки",
      //       //   invoke: {
      //       //     src: "cells",
      //       //     input: ({ event }) => event,
      //       //     onDone: { actions: [] },
      //       //     onError: { actions: "error_save" },
      //       //   },
      //       //   onDone: "#spreadsheet.document.idle",
      //       // },
      //       // cols: {
      //       //   description: "Колонки",
      //       //   invoke: {
      //       //     src: "cols",
      //       //     input: ({ event }) => event,
      //       //     // onDone: { actions: ["cellsSave", raise({ type: "document.idle" })] },
      //       //     // onError: { target: "#spreadsheet.document.idle", actions: "error_save" },
      //       //   },
      //       //   always: [
      //       //     {
      //       //       target: "#spreadsheet.document.idle",
      //       //       guard: ({ context, event }) => {
      //       //         console.log("GUARD", context, event)
      //       //         return false
      //       //       },
      //       //     },
      //       //   ],
      //       // },
      //       // },
      //     },
      //     idle: {
      //       description: `Ожидание ввода команды`,
      //       entry: "error_clear",
      //       after: { 200: { actions: "error_clear" } },
      //     },
      //     // title: {
      //     //   description: "Обновление заголовка документа",
      //     //   invoke: {
      //     //     src: "docTitle",
      //     //     // @ts-ignore
      //     //     input: ({ event: { title } }) => ({ title }),
      //     //     onDone: { actions: "titleSave" },
      //     //     onError: { actions: "error_save" },
      //     //   },
      //     // onDone: "#spreadsheet.document.idle",
      //   },
      // },
      // exit: ["error_clear", "titleClear", "sheetsClear"],
      close: {
        entry: ["spreadshit_path_clear"],
        on: {
          open: { target: "opening", actions: "spreadshit_path_save" },
        },
      },
    },
    types: {} as SheetMachineTypes,
  },
  {
    actions: {
      spreadsheet_title_save: assign(({ context, event }: any) => ({ ...context, title: event.output.title })),
      titleClear: assign(({ context, event }) => ({ ...context, title: null })),
      spreadsheet_sheets_save: assign(({ context, event }: any) => ({ ...context, sheets: event.output.sheets })),
      sheetsClear: assign(({ context, event }) => ({ ...context, sheets: [] })),
      error_save: assign(({ context, event }: any) => ({ ...context, error: event.data })),
      error_clear: assign(({ context }) => ({ ...context, error: null })),
      spreadshit_path_save: assign(({ context, event }: any) => ({ ...context, path: event.path })),
      spreadshit_path_clear: assign(({ context }) => ({ ...context, path: null })),
      cellsSave: assign(({ context, event }: any) => ({ ...context, cells: event.output })),
    },
  },
)
