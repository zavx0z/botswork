import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})
try {
  const doc = new GoogleSpreadsheet("1dV8t0o9ENfrXCLIXtPjIZfa7cJ_EQCsTcIy_vSm", serviceAccountAuth)
  await doc.loadInfo() // loads document properties and worksheets
  console.log(doc.title)
} catch (e: any) {
  if (e.code === "FailedToOpenSocket" && e.message === "Was there a typo in the url or port?") {
    console.log(e.code, e.message)
  } else if (e.code === "" && e.message === "") {
    console.log(e.code, e.message)
  }
}
