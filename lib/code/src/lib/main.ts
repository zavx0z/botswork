import { Window } from "happy-dom"
import prismTemplate from "./index.html?raw"
import { insertFolds } from "./plugins/prismFold"

export type CodeRenderer = { Prism?: typeof import("prismjs") } & Window

export const CodeRenderer = async (): Promise<CodeRenderer> => {
  const window: { Prism?: typeof import("prismjs") } & Window = new Window()
  window.document.write(prismTemplate)
  await window.happyDOM.whenAsyncComplete()
  if (window.Prism) {
    window.Prism.manual = true
    window.Prism.hooks.add("before-all-elements-highlight", ({ elements }) => {
      if (elements[0].parentNode.className.includes("fold")) elements.forEach(insertFolds)
    })
  }
  return window
}

type OptionsRenderCode = {
  lang?: "javascript" | "typescript"
  lineno?: boolean
  fold?: boolean
}

export function renderCode(renderer: CodeRenderer, code: string, { lang = "typescript", lineno = false, fold = false }: OptionsRenderCode): Promise<string> {
  const { document, Prism } = renderer
  code = code.trimStart()

  const elementPre = document.createElement("pre")
  elementPre.className = `language-${lang}`
  if (lineno) elementPre.className += " line-numbers"
  if (fold) elementPre.className += " fold"

  const elementCode = document.createElement("code")
  elementCode.className = `language-${lang}`
  elementCode.textContent = code

  elementPre.appendChild(elementCode)
  document.body.appendChild(elementPre)

  return new Promise<string>((resolve, reject) => {
    try {
      // console.log("💫")
      Prism?.highlightAllUnder(elementPre as unknown as ParentNode, true, () => {
        // console.log("🧬")
        const result = elementCode.innerHTML
        document.body.removeChild(elementPre)
        resolve(result)
      })
    } catch (err) {
      // console.log(err)
      reject(err)
    }
  })
}
