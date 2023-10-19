<script lang="ts">
  import { devTools } from "$lib"
  import { onMount, tick } from "svelte"
  onMount(async () => {
    await tick()
    setTimeout(()=>console.log("devtools"), 1000)
    
  })
</script>

<div use:devTools />
