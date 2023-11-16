<script>
  import { onDestroy, onMount } from "svelte"
  import img from "./example.jpg"
  let cv
  onMount(async () => {
    const opencvWorker = (await import("$lib/opencvWorker?worker")).default
    cv = new opencvWorker()
    cv.addEventListener("message", (message) => {
      switch (message.data.type) {
        case "ready":
          cv["ready"] = true
          break
        case "result":
          console.log("result", message.data)
          break
        default:
          break
      }
      cv.addEventListener("error", (error) => {
        console.log(error)
      })
    })
  })
  onDestroy(() => cv.terminate())
  let canvas
  const openCV = (node, cv) => {
    return {
      update(cv) {
        if (cv.ready) {
          const dest = canvas.transferControlToOffscreen()
          cv.postMessage(dest, [dest])
          cv.postMessage({ type: "imread", param: { element: node.src } })
        }
      },
    }
  }
</script>

<img use:openCV={cv} src={img} alt="img" />
<canvas id="canvaOut" bind:this={canvas}></canvas>
