export default (node: HTMLElement) => {
  let erudaDestroy: any
  import("eruda").then((eruda: any) => {
    
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
    erudaDestroy = eruda.destroy
  })

  return {
    destroy() {
      try {
        if (erudaDestroy) erudaDestroy()
      } catch {}
    },
  }
}
