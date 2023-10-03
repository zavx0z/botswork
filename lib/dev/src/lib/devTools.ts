export default (node: HTMLElement) => {
  let eruda: any
  import("eruda").then((module) => {
    eruda = module.default
    eruda.init({
      container: node,
      tool: ["console", "elements"],
    })
    return {
      destroy() {
        eruda.destroy()
      },
    }
  })
}
