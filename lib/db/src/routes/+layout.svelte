<script lang="ts">
  import client from "$lib/client"
  import "@lib/theme/app.css"
  import { onDestroy, onMount, setContext } from "svelte"

  onMount(() => client.start())
  onDestroy(() => client.stop())

  setContext("db", client)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
