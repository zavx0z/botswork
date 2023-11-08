<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import { opfs, OPFSExplorer, loadFileFromDevice } from "$lib"

  onMount(() => opfs.start())
  onDestroy(() => opfs.stop())
</script>

<button class="p-4" on:click={loadFileFromDevice}> Загрузить файл базы данных </button>
<OPFSExplorer />
<h2 class="text-2xl">Ссылки на инфу</h2>
<a href="https://web.dev/articles/origin-private-file-system?hl=ru">web.dev</a>
<a href="https://blog.stranianelli.com/js-wasm-sqlite3-01/">js-wasm-sqlite3-01</a>
<a href="https://blog.stranianelli.com/js-wasm-sqlite3-03/">js-wasm-sqlite3-03</a>
<a href="https://blog.stranianelli.com/js-wasm-sqlite3-02/">js-wasm-sqlite3-02</a>
