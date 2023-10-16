import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import { fromPromise } from "xstate"
import sheetMachine from "./src/machine/sheetMachine"

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

type CellType = {
  a1Address: string
  rowIndex: number
  columnIndex: number
  value: number | string | boolean
}
const createGoogleSpreadSheetMachine = (serviceAccount: JWT) => {
  let doc: GoogleSpreadsheet

  return sheetMachine.provide({
    actors: {
      spreadsheet_open: fromPromise(
        ({ input, system }) =>
          new Promise(async (resolve, reject) => {
            try {
              const googleSpreadsheet = new GoogleSpreadsheet(input, serviceAccount)
              await googleSpreadsheet.loadInfo()
              doc = googleSpreadsheet
              return resolve({
                title: doc.title,
                sheets: doc.sheetsByIndex.map(({ sheetId, title }) => ({ id: sheetId, title })),
              })
            } catch (e: any) {
              return reject(e.message)
            }
          }),
      ),
      spreadsheet_title: fromPromise(
        ({ input: { title } }) =>
          new Promise(async (resolve, reject) => {
            try {
              await doc.updateProperties({ title })
              return resolve({ title })
            } catch (e: any) {
              return reject(e.message)
            }
          }),
      ),
      cols: fromPromise(
        ({ input }) =>
          new Promise(async (resolve, reject) => {
            try {
              const { index, sheetName, type } = input
              const sheet = doc.sheetsByTitle[sheetName]
              await sheet.loadCells({ startColumnIndex: index - 1 })
              const rowIndexes = [...Array(sheet.rowCount).keys()]
              let cells: CellType[] = []
              rowIndexes.forEach((rowIndex: number) => {
                const cell = sheet.getCell(rowIndex, index - 1)
                if (typeof cell.value === "number" || typeof cell.value === "string" || typeof cell.value === "boolean")
                  cells.push({
                    a1Address: cell.a1Address,
                    rowIndex,
                    columnIndex: index,
                    value: cell.value,
                  })
              })
              return resolve(cells)
            } catch (e: any) {
              return reject(e.message)
            }
          }),
      ),
    },
  })
}
export const GoogleSpreadSheetMachine = createGoogleSpreadSheetMachine(serviceAccountAuth)
