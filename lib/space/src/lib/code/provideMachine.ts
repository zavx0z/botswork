import { fromPromise } from "xstate"
import { machine } from "./machine"

export default () => {
  let Prism: typeof import("prismjs")
  return machine.provide({
    actors: {
      codeRender: fromPromise(async ({ input }) => {
        if (!Prism) {
          Prism = await import("prismjs")
          Prism.manual = true
          const langJS = (await import("prismjs/components/prism-javascript.js?raw")).default
          await eval(langJS)
          const pluginKeepMarkup = (await import("prismjs/plugins/keep-markup/prism-keep-markup?raw")).default
          await eval(pluginKeepMarkup)

          const { insertFolds } = await import("./plugins/prismFold")
          Prism.hooks.add("before-all-elements-highlight", ({ elements }) => {
            if (elements[0].parentNode.className.includes("fold")) elements.forEach(insertFolds)
          })
        }
        console.log(Prism)
        const elementPre = document.createElement("pre")
        elementPre.className = `language-${input.language}`
        if (input.lineno) elementPre.className += " line-numbers"
        if (input.fold) elementPre.className += " fold"

        const elementCode = document.createElement("code")
        elementCode.className = `language-${input.language}`
        elementCode.textContent = input.text.trimStart()

        elementPre.appendChild(elementCode)
        document.body.appendChild(elementPre)
        return new Promise((resolve, reject) => {
          try {
            Prism.highlightAllUnder(elementPre, false, () => {
              const result = elementCode.innerHTML
              document.body.removeChild(elementPre)
              // console.log(result)
              resolve(result)
            })
          } catch (err) {
            reject(JSON.stringify(err))
          }
        })
      }),
    },
  })
}
