<script lang="ts">
  import client from "$lib/client"
  import "@lib/theme/app.css"
  import { onMount, setContext } from "svelte"
  import { actor } from "./opfsMachine"

  onMount(async () => {
    client.start()
    actor.start()
  })
  setContext("db", client)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
