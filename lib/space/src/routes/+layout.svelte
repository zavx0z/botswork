<script lang="ts">
  import "@lib/theme/app.css"
  import "@lib/code/styles.css"
  import { onMount } from "svelte"
  import { initSQLiteWorker } from "@lib/db"
  onMount(async () => {
    const workerImp = (await import("@lib/db/worker.ts?worker")).default
    initSQLiteWorker(workerImp)
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
