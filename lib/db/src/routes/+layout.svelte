<script lang="ts">
  import "@lib/theme/app.css"
  import db, { queryActor } from "./actor"
  import { onMount, setContext } from "svelte"
  import { useSelector } from "@xstate/svelte"
  import { waitFor } from "xstate"
  onMount(async () => {
    db.start()
    const i = await waitFor(db, (state) => state.matches("active"))
    // console.log(i)
    queryActor.start()
    queryActor.send({ type: "put" })
  })
  const state = useSelector(db, (state) => state)
  // $: console.log($state.status)
  setContext("db", db)
</script>

<div class="flex h-screen w-screen flex-col items-center gap-4 p-4">
  <slot />
</div>
