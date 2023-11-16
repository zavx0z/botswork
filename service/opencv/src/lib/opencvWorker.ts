import loadWasm from "./opencv.js"

// @ts-ignore
self.HTMLImageElement = ImageBitmap
// @ts-ignore
self.HTMLCanvasElement = OffscreenCanvas
self.document = {
  // @ts-ignore
  createElement() {
    return new OffscreenCanvas(300, 150)
  },
}
async function fetchAsBlob(url: string): Promise<Blob> {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw "Network Error"
  }
  return resp.blob()
}

let dest: OffscreenCanvasRenderingContext2D
try {
  const cv: any = await loadWasm({})
  postMessage({ type: "ready" })
  addEventListener("error", (event) => {
    console.log(event)
  })
  addEventListener("message", async (event) => {
    switch (event.data.type) {
      case "imread":
        console.log(event.data.param)
        const source = await fetchAsBlob(event.data.param.element)
        const inputBmp = await createImageBitmap(source)

        const src = cv.imread(inputBmp)
        const dst = new cv.Mat()

        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
        cv.Canny(src, dst, 50, 100, 3, false)
        cv.imshow(dest, dst)
        src.delete()
        dst.delete()
        inputBmp.close()
        break
      default:
        console.log("worker", event.data)
        dest = event.data
        break
    }
  })
} catch {
  postMessage({ error: { code: 200, message: "Not loaded" } })
}
