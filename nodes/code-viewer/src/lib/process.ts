let Prism: typeof import("prismjs")
type lang = "js" | "ts"

export async function process(fold: Boolean, lineno: Boolean, text: string, language: lang): Promise<string> {
  if (!Prism) {
    Prism = (await import("prismjs")).default
    Prism.manual = true
    const langJS = (await import("prismjs/components/prism-javascript.js?raw")).default
    await eval(langJS)
    const pluginKeepMarkup = (await import("prismjs/plugins/keep-markup/prism-keep-markup?raw")).default
    await eval(pluginKeepMarkup)

    const lineNumbers = (await import("prismjs/plugins/line-numbers/prism-line-numbers?raw")).default
    await eval(lineNumbers)

    const { insertFolds } = await import("./prismFold")
    Prism.hooks.add("before-all-elements-highlight", ({ elements }) => {
      if (elements[0].parentNode.className.includes("fold")) elements.forEach(insertFolds)
    })
  }
  const elementPre = document.createElement("pre")
  elementPre.className = `language-${language}`
  if (lineno) elementPre.className += " line-numbers"
  if (fold) elementPre.className += " fold"

  const elementCode = document.createElement("code")
  elementCode.className = `language-${language}`
  elementCode.textContent = text.trimStart()

  elementPre.appendChild(elementCode)
  document.body.appendChild(elementPre)

  return new Promise((resolve, reject) => {
    try {
      Prism.highlightAllUnder(elementPre, false, () => {
        const result = elementCode.innerHTML
        document.body.removeChild(elementPre)
        resolve(result)
      })
    } catch (err) {
      reject(JSON.stringify(err))
    }
  })
}
