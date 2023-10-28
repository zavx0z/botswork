<script lang="ts">
  import "@lib/theme/app.css"
  import "@lib/code/styles.css"
  import { onMount } from "svelte"
  enum WorkerMessageTypes {
    INIT_DB,
    INIT_DB_RESPONSE,
  }

  type WorkerMessage = {
    type: WorkerMessageTypes
  }

  onMount(async () => {
    const workerImp = await import("@lib/db/worker.ts?worker")
    const worker = new workerImp.default()
    const msg: WorkerMessage = { type: WorkerMessageTypes.INIT_DB }
    console.log(`Sending message to worker:`, msg)
    worker.postMessage(msg)

    worker.addEventListener("message", async ({ data }: { data: WorkerMessage }) => {
      console.log("Received message from worker:", data.type)
    })
  })
</script>

<div id="app">
  <slot />
</div>

<style>
  #app {
    height: 100svh;
    width: 100svw;
  }
</style>
