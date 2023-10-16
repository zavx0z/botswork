import { GoogleSpreadSheetMachine } from "@service/google-spreadsheet"
import { createActor, createMachine } from "xstate"
import { machine } from "./machine"

const SpreadSheetActor = createActor(GoogleSpreadSheetMachine, { systemId: "spreadsheet" })

const spreadsheetTelegramMachine = machine.provide({
  actors: {
    
  },
})

const actor = createActor(spreadsheetTelegramMachine, {
  systemId: "spreadsheetTelegram",
})
