import type { PageServerLoad } from "./$types"
import { readFile } from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { renderCode } from "./utils"

export const load: PageServerLoad = async ({ locals, depends }) => {
  const { happyDOM } = locals
  depends("machine")
  const src = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "content/code.ts"), "utf-8")
  const dst = renderCode(src, "javascript", happyDOM)
  return {
    src,
    dst,
  }
}
