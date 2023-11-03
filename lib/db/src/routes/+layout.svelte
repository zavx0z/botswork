<script lang="ts">
  import "@lib/theme/app.css"
  import initWorker from "$lib/sqlite/loadWorker"
  import { onMount } from "svelte"
  import { createActor, createMachine, fromPromise } from "xstate"

  const machine = createMachine({
    initial: "worker-load",
    states: {
      "worker-load": {
        invoke: {
          src: "loadWorker",
          onDone: { target: "worker-loaded" },
          onError: { target: "worker-error" },
        },
      },
      "worker-loaded": {},
      "worker-error": {},
    },
  })

  let worker: Worker
  const actor = createActor(
    machine.provide({
      actors: {
        loadWorker: fromPromise(function () {
          return new Promise(async (resolve, reject) => {
            try {
              const Worker = (await import("$lib/worker.ts?worker")).default
              worker = new Worker()
              resolve({ success: "ok" })
            } catch (error) {
              reject(JSON.stringify(error))
            }
          })
        }),
      },
    }),
  )
  actor.subscribe((state) => {
    switch (state.value) {
      case "worker-load":
        console.log("⚒️ 🔃 worker load")
        break
      case "worker-loaded":
        console.log("⚒️ ✅ worker load")
        break
    }
  })
  actor.start()
  onMount(async () => {
    const workerImp = (await import("$lib/sqlite/worker/worker.ts?worker")).default
    initWorker(workerImp)
  })
</script>

<div class="flex min-h-screen flex-col">
  <span class="text-2xl font-semibold text-white">sqlite wasm</span>
  <main class="flex-grow">
    <slot />
  </main>
</div>
