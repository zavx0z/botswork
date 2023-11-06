<script lang="ts">
  import "@lib/theme/app.css"
  import db from "./actor"
  import { onMount, setContext } from "svelte"

  onMount(() => {
    db.start()
  })
  setContext<typeof db>("db", db)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
