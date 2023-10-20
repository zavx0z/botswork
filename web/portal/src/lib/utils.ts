export const themeColor = (varColor: string): string => `rgb(${window.getComputedStyle(document.body).getPropertyValue(varColor).replaceAll(" ", ", ")})`
