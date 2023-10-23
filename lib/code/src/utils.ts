export function formatHtmlTags(html: string): string {
    const tagRegex = /(<[^>]*>)/g
    const tags = html.split(tagRegex)
    let formattedHtml = ""
    for (const tag of tags) {
      if (tag.endsWith(">") && tag.includes("/")) {
        formattedHtml += tag.trim() + "\n"
      } else {
        formattedHtml += tag.trim()
      }
    }
    return formattedHtml
  }