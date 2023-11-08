<script lang="ts">
  import { onMount } from "svelte"
  import opfs, { OPFSExplorer, loadFileFromDevice } from "$lib"

  onMount(async () => {
    opfs.start()
  })
</script>

<button class="p-4" on:click={loadFileFromDevice}> Загрузить файл базы данных </button>
<OPFSExplorer />
