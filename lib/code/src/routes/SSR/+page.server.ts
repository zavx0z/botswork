import type { PageServerLoad } from "./$types"
import { readFile } from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { renderCode } from "$lib"

export const load: PageServerLoad = async ({ locals, depends }) => {
  depends("machine")
  const { CodeRenderer } = locals
  const src = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "content/code.ts"), "utf-8")
  const dst = await renderCode(CodeRenderer, src, { lang: "javascript", lineno: false, fold: true })
  return { src, dst }
}
