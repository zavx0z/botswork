<script lang="ts">
  import img from "./example.jpg"
  import worker from "$lib/opencvWorker?worker"

  const opencvWorker = (node: HTMLElement) => {
    const canvas = node.getElementsByTagName("canvas")[0]
    const dest = canvas.transferControlToOffscreen()
    const cv = new worker()
    cv.addEventListener("message", (message) => {
      switch (message.data.type) {
        case "ready":
          cv.postMessage(dest, [dest])
          cv.postMessage({ type: "imread", param: { element: img } })
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
    return {
      destroy() {
        cv.terminate()
      },
    }
  }
</script>

<span use:opencvWorker>
  <img src={img} alt="img" />
  <canvas />
</span>
