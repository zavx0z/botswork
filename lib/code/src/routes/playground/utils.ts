export const saveData = async (content: string) => {
  const response = await fetch("/playground", {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response
}

export function renderCode(code: string, lang: "javascript" | "typescript" = "typescript", happyDOM: any): Promise<string> {
  const { document, Prism } = happyDOM
  code = code.trimStart()
  const tempPre = document.createElement("pre")
  tempPre.className = `line-numbers language-${lang}`
  const tempCode = document.createElement("code")
  tempCode.className = `language-${lang}`
  tempCode.textContent = code
  tempPre.appendChild(tempCode)
  document.body.appendChild(tempPre)
  return new Promise<string>((resolve, reject) => {
    try {
      Prism.highlightElement(tempCode, true, () => {
        console.log("🧬")
        setTimeout(() => {
          const result = tempCode.innerHTML
          document.body.removeChild(tempPre)
          resolve(result)
        }, 2000)
      })
    } catch (err) {
      console.log(err)
      reject("🧬😒")
    }
  })
}
