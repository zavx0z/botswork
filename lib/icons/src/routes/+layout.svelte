<script lang="ts">
  import "@lib/theme/app.css"
  import { onMount } from "svelte"
  let inspector: HTMLElement
  onMount(() => {
    let eruda: any
    import("eruda").then((module) => {
      eruda = module.default
      eruda.init({
        container: inspector,
        tool: ["console", "elements"],
      })
    })
    return () => eruda.destroy()
  })
</script>

<div bind:this={inspector} />
<svelte:head>
  <title>@lib/icons</title>
</svelte:head>
<slot />
