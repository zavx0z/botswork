import { writeFile, readFile } from "fs/promises"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  return {
    stream: {
      text: await readFile("index.html", "utf-8"),
    },
  }
}
