import loadWasm from "./opencv.js"
/** We need to trick opencv in thinking we're in a normal web env. */
self.HTMLImageElement = ImageBitmap;
self.HTMLCanvasElement = OffscreenCanvas;
self.document = {
    createElement() {
        return new OffscreenCanvas(300, 150);
    }
};
async function fetchAsBlob(url) {
    const resp = await fetch(url);
    if (!resp.ok) { throw "Network Error"; }
    return resp.blob();
}

let dest
try {
    const cv = await loadWasm()
    postMessage({ type: "ready" })
    addEventListener("error", (event) => { console.log(event) })
    addEventListener("message", async (event) => {
        switch (event.data.type) {
            case "imread":
                const source = await fetchAsBlob(event.data.param.element);
                const inputBmp = await createImageBitmap(source);

                const src = cv.imread(inputBmp)
                const dst = new cv.Mat()
                
                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                cv.Canny(src, dst, 50, 100, 3, false)
                cv.imshow(dest, dst)
                src.delete();
                dst.delete();
                inputBmp.close();
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
