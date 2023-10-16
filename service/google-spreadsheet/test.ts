import { createActor, waitFor } from "xstate"
import { GoogleSpreadSheetMachine } from "./index"
import { Database } from "bun:sqlite"

const db = new Database("log.sqlite")
const createEventIfNotExist = db.query(`
CREATE TABLE IF NOT EXISTS event (
  type TEXT,
  value TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)
createEventIfNotExist.run()
db.query(`DELETE FROM event`).run()

const insertEvent = db.query("INSERT INTO event (type, value) VALUES ($type, $value)")

const SpreadSheetActor = createActor(GoogleSpreadSheetMachine, {
  systemId: "spreadsheet",
  inspect: (inspectionEvent) => {
    if (inspectionEvent.type === "@xstate.event") {
      // console.log(inspectionEvent.sourceRef)
      // console.log(inspectionEvent.targetRef)
      // console.log(inspectionEvent.event)
      if (GoogleSpreadSheetMachine.events.includes(inspectionEvent.event.type as any)) {
        console.log(inspectionEvent.event.type)
        const { type, ...other } = inspectionEvent.event
        insertEvent.values({ $type: type, $value: JSON.stringify(other) })
      }
    }
  },
})

SpreadSheetActor.subscribe((state) => {
  const persistedState = SpreadSheetActor.getPersistedState()
  console.log(`\n`)
  // console.log(JSON.stringify(persistedState, null, 2))
  console.log(JSON.stringify(persistedState))
  console.log(JSON.stringify(state))
})
// console.log(JSON.stringify(GoogleSheetActor.getSnapshot().toJSON()))

SpreadSheetActor.start()
SpreadSheetActor.send({ type: "open", path: "1dV8t0o9ENfrXCLIXtPjIZfa7cJ_EQCsTcIy_vSm-864" })
const { context } = await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches({ open: "idle" }), { timeout: 10000 })
SpreadSheetActor.send({ type: "title.update", title: "Вопросы к GPT" })

// await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches({ open: "idle" }))
// TITLE
// SpreadSheetActor.send({ type: "title.update", title: "Вопросы" })
// SpreadSheetActor.send({ type: "doc.col.get", sheetName: "Генерация", index: 1 })
// const { context } = await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches({ open: "idle" }))

// const sheet = doc.sheetsByIndex[0] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
// console.log(sheet.title)
// console.log(sheet.rowCount)

// // adding / removing sheets
// const newSheet = await doc.addSheet({ title: "another sheet" })
// await newSheet.delete()
// db.close()

console.log(context)
