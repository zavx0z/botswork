<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import { opfs, OPFSExplorer, loadFileFromDevice } from "$lib"

  onMount(() => opfs.start())
  onDestroy(() => opfs.stop())
</script>

<button class="p-4" on:click={loadFileFromDevice}> Загрузить файл базы данных </button>
<OPFSExplorer />
