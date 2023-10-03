<script lang="ts">
  import "@lib/theme/app.css"
  import { devTools } from "@lib/dev"
</script>

<div use:devTools />
<svelte:head>
  <title>@module/secure</title>
</svelte:head>
<slot />
