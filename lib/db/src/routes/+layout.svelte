<script lang="ts">
  import "@lib/theme/app.css"
  import db from "./actor"
  import { onMount, setContext } from "svelte"
  import { waitFor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  onMount(async () => {
    db.start()
    const state = await waitFor(db, (state) => state.status === "done")
  })
  const state = useSelector(db, (state) => state)
  $: console.log($state.status)
  setContext("db", db)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
