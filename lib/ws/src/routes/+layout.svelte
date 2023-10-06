<script lang="ts">
  import "@lib/theme/app.css"
  import { devTools } from "@lib/dev"
  const xstateInspect = (node: HTMLIFrameElement) => {
    import("$lib/inspector").then((module) => {
      const { inspect } = module
      inspect({
        iframe: node,
        // url: "https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect",
      })
    })
  }
</script>

<div use:devTools />
<iframe class="h-96 w-screen" use:xstateInspect title="xstate" />
<svelte:head>
  <title>@lib/ws</title>
</svelte:head>
<slot />
