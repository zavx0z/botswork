import { test, describe, expect } from "bun:test"
import Prism from "prismjs"

describe("prism", () => {
  const code = `var data = 1;`
  Prism.hooks.add("wrap", function (env) {
    if (env.token === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&")
    }
  })
  const html = Prism.highlight(code, Prism.languages.javascript, "javascript")
  test("yes", () => {
    expect(html).toBeString()
  })

  test("hook", () => {})
})
