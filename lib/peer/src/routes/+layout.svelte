<script lang="ts">
  import "@lib/theme/app.css"
  import { devTools } from "@lib/dev"
</script>

<svelte:head>
  <title>@lib/peer</title>
</svelte:head>
<div use:devTools />
<slot />
