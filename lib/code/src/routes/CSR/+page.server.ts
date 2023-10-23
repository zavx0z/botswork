import type { PageServerLoad } from "./$types"
// import { readFile } from "fs/promises"
// import path from "path"
import Prism from "prismjs"
// import { fileURLToPath } from "url"

export const load: PageServerLoad = async () => {
  // const src = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "content/code.ts"), "utf-8")
  const code = `const machine = createMachine(
    {
      context: {
        count: 42,
      },
      id: "machine",
      entry: {
        type: "inc",
      },
      initial: "started",
      states: {
        started: {
          on: {
            finish: {
              target: "final",
            },
            increment: {
              actions: "inc",
            },
          },
        },
        final: {
          type: "final",
        },
      },
    },
    {
      actions: { inc: ({ context, event }) => {} },
      actors: {},
      guards: {},
      delays: {},
    },
  )`
  return {
    src: code,
    dst: Prism.highlight(code, Prism.languages.javascript, "javascript"),
  }
}
