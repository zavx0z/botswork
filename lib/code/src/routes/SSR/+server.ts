import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { writeFile } from "fs/promises"
import { fileURLToPath } from "url"
import path from "path"

export const POST: RequestHandler = async (event) => {
  const { content } = await event.request.json()
  try {
    await writeFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "content/code.ts"), content, "utf-8")
    return json({ status: "success" })
  } catch (e) {
    console.log(e)
    return json({ status: "error" })
  }
}
