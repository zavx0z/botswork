import { fromPromise } from "xstate"
import { machine } from "./machine"

export default () => {
  let Prism: typeof import("prismjs")
  return machine.provide({
    actors: {
      codeRender: fromPromise(async ({ input }) => {
        if (!Prism) {
          console.log("initialize Prismjs")
          Prism = await import("prismjs")
          Prism.manual = true
          const langJS = (await import("prismjs/components/prism-javascript.js?raw")).default
          await eval(langJS)
          const pluginKeepMarkup = (await import("prismjs/plugins/keep-markup/prism-keep-markup?raw")).default
          await eval(pluginKeepMarkup)

          const { insertFolds } = await import("./plugins/prismFold")
          Prism.hooks.add("before-all-elements-highlight", ({ elements }) => elements.forEach(insertFolds))
        }

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
            console.log(Prism, window.Prism)
            Prism.highlightAllUnder(elementPre, false, () => {
              const result = elementCode.innerHTML
              document.body.removeChild(elementPre)
              resolve(result)
            })
          } catch (err) {
            console.log(err)
            reject(JSON.stringify(err))
          }
        })
      }),
    },
  })
}
