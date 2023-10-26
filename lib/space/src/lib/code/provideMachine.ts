import { fromPromise } from "xstate"
import { machine } from "./machine"

export default () => {
  return machine.provide({
    actors: {
      codeRender: fromPromise(({ input }) => {
        const code = input.text.trimStart()
        const elementPre = document.createElement("pre")
        elementPre.className = `language-${input.language}`
        if (input.lineno) elementPre.className += " line-numbers"
        if (input.fold) elementPre.className += " fold"

        const elementCode = document.createElement("code")
        elementCode.className = `language-${input.language}`
        elementCode.textContent = code

        elementPre.appendChild(elementCode)
        document.body.appendChild(elementPre)
        return new Promise((resolve, reject) => {
          try {
            window.Prism.highlightAllUnder(elementPre, false, () => {
              const result = elementCode.innerHTML
              console.log(result)
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
    actions: {
      onEntry: async () => {
        if (!window.Prism) {
          console.log("initialize Prismjs")
          const Prism = await import("prismjs")
          Prism.manual = true
          const langJS = (await import("prismjs/components/prism-javascript.js?raw")).default
          await eval(langJS)
          const pluginKeepMarkup = (await import("prismjs/plugins/keep-markup/prism-keep-markup?raw")).default
          await eval(pluginKeepMarkup)

          const { insertFolds } = await import("./plugins/prismFold")
          Prism.hooks.add("before-all-elements-highlight", ({ elements }) => elements.forEach(insertFolds))
        }
      },
    },
  })
}
