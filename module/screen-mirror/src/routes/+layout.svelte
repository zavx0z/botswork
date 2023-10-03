<script lang="ts">
  import "@lib/theme/app.css"
  import { devTools } from "@lib/dev"
</script>

<div use:devTools />
<svelte:head>
  <title>@module/screen-mirror</title>
</svelte:head>
<slot />
