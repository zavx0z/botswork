<script lang="ts">
  import client from "$lib/client"
  import "@lib/theme/app.css"
  import { onMount, setContext } from "svelte"
  import opfs, { loadFileFromDevice } from "$lib/opfs"

  onMount(async () => {
    client.start()
    opfs.start()
  })
  setContext("db", client)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <button class="p-4" on:click={loadFileFromDevice}> Загрузить файл базы данных </button>
  <slot />
</div>
