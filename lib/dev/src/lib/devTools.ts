import eruda from "eruda"

export default (node: HTMLElement) => {
  eruda.init({
    container: node,
    tool: ["console", "elements", "network"],
    useShadowDom: true,
    autoScale: true,
    defaults: {
      displaySize: 50,
      transparency: 0.8,
      theme: "Monokai Pro",
    },
  })
  eruda.show()
  return {
    destroy() {
      eruda.destroy()
    }
  }
}
