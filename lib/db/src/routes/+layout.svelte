<script lang="ts">
  import "@lib/theme/app.css"
  import { main } from "./actor"
  import { onMount, setContext } from "svelte"

  onMount(async () => {
    main.start()
  })

  setContext("db", main)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
