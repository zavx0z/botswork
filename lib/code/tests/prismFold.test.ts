import { insertFolds } from "$lib/plugins/prismFold"
import { test, describe, expect } from "bun:test"
import Prism from "prismjs"
const code = await Bun.file("../src/routes/playground/content/code.ts").text()

describe("prism", () => {
  Prism.hooks.add("before-tokenize", (arg) => {
    console.log(arg)
  })
  Prism.hooks.add("after-tokenize", (arg) => {
    console.log(arg)
  })
  Prism.hooks.add("wrap", function (env) {
    if (env.token === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&")
    }
  })

  Prism.hooks.add("before-highlight", ({ element }) => insertFolds(element))
  const html = Prism.highlight(code, Prism.languages.javascript, "javascript")
  test("prism fold", () => {
    expect(html).toBeString()
  })
  test("hook", () => {})
})
