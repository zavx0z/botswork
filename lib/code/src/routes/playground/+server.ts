import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { writeFile } from "fs/promises"

export const POST: RequestHandler = async (event) => {
  const { content } = await event.request.json()
  try {
    await writeFile("index.html", content, "utf-8")
    return json({ status: "success" })
  } catch (e) {
    console.log(e)
    return json({ status: "error" })
  }
}
