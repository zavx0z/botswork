import type { PageServerLoad } from "./$types"
import { readFile } from "fs/promises"
import path from "path"
import Prism from "prismjs"
import { fileURLToPath } from "url"

export const load: PageServerLoad = async ({ locals, depends }) => {
  depends("machine:local")
  const src = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "content/code.ts"), "utf-8")
  return {
    src,
    dst: Prism.highlight(src, Prism.languages.javascript, "javascript"),
  }
}
