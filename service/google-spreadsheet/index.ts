import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import { createActor, fromPromise, waitFor } from "xstate"
import sheetMachine from "./src/machine/sheetMachine"

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const createGoogleSpreadSheetMachine = (serviceAccount: JWT) => {
  let doc: GoogleSpreadsheet

  return sheetMachine.provide({
    actors: {
      document: fromPromise(
        ({ input }) =>
          new Promise(async (resolve, reject) => {
            try {
              const googleSpreadsheet = new GoogleSpreadsheet(input.path, serviceAccount)
              await googleSpreadsheet.loadInfo()
              doc = googleSpreadsheet
              return resolve("success")
            } catch (e: any) {
              return reject(e.message)
            }
          }),
      ),
      docTitleUpdate: fromPromise(
        ({ input }) =>
          new Promise(async (resolve, reject) => {
            try {
              await doc.updateProperties({ title: input })
              return resolve(input)
            } catch (e: any) {
              return reject(e.message)
            }
          }),
      ),
    },
  })
}
const machine = createGoogleSpreadSheetMachine(serviceAccountAuth)

const SpreadSheetActor = createActor(machine, { input: { path: "1dV8t0o9ENfrXCLIXtPjIZfa7cJ_EQCsTcIy_vSm-864" } })
SpreadSheetActor.subscribe((state) => {
  const persistedState = SpreadSheetActor.getPersistedState()
  console.log(JSON.stringify(persistedState))
  // console.log(state)
})
SpreadSheetActor.start()
// SpreadSheetActor.send({ type: "doc.init", path: "1dV8t0o9ENfrXCLIXtPjIZfa7cJ_EQCsTcIy_vSm-864" })
await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches("open"))

SpreadSheetActor.send({ type: "doc.title.update", title: "Вопросы" })
const { context } = await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches({ open: "titleUpdated" }))
console.log(context.title)
// console.log(JSON.stringify(GoogleSheetActor.getSnapshot().toJSON()))

// const doc = new GoogleSpreadsheet("1dV8t0o9ENfrXCLIXtPjIZfa7cJ_EQCsTcIy_vSm-864", serviceAccountAuth)

// await doc.loadInfo() // loads document properties and worksheets
// console.log(doc.title)
// await doc.updateProperties({ title: "renamed doc" })

// // Вывод имен всех вкладок
// doc.sheetsByIndex.forEach((sheet, index) => {
//   console.log(`Вкладка ${index + 1}: ${sheet.title}`)
// })

// const sheet = doc.sheetsByIndex[0] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
// console.log(sheet.title)
// console.log(sheet.rowCount)

// // adding / removing sheets
// const newSheet = await doc.addSheet({ title: "another sheet" })
// await newSheet.delete()
