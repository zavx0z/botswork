<script lang="ts">
  import "@lib/theme/app.css"
  import initWorker from "$lib/sqlite/loadWorker"
  import { onMount } from "svelte"
  import actor from "./actor"

  onMount(async () => {
    actor.start()
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
