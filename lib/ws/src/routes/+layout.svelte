<script lang="ts">
  import "@lib/theme/app.css"
  import { devTools } from "@lib/dev"
</script>

<div use:devTools />
<svelte:head>
  <title>@lib/ws</title>
</svelte:head>
<slot />
