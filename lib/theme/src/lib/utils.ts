import { browser } from "$app/environment"

export const themeColor = (varColor: string): string => (browser ? `rgb(${window.getComputedStyle(document.body).getPropertyValue(varColor).replaceAll(" ", ", ")})` : "")

export const hexThemeColor = (varColor: string): string => {
  if (!browser) return ""
  const rgb = window
    .getComputedStyle(document.body)
    .getPropertyValue(varColor)
    .split(" ")
    .map((i) => parseInt(i))
  const hex = "#" + ((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16).slice(1)
  return hex
}
