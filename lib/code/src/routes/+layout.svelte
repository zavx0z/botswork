<script lang="ts">
  import "@lib/theme/app.css"
  import "$lib/styles.css"
  import { Activity, Button } from "@lib/ui/activity"
  import { BotikIcon } from "@lib/icons"
  import { page } from "$app/stores"
</script>

<svelte:head>
  <title>@lib/code</title>
</svelte:head>
<Activity>
  <div>
    <Button href="/" label="главная" active={$page.url.pathname === "/"}>
      <BotikIcon />
    </Button>
    <Button href="/SSR" label="SSR" active={$page.url.pathname.includes("SSR")}>SSR</Button>
    <Button href="/CSR" label="CSR" active={$page.url.pathname.includes("CSR")}>CSR</Button>
    <Button href="/info" label="info" active={$page.url.pathname.includes("info")}>info</Button>
    <Button href="/demo" label="demo" active={$page.url.pathname.includes("demo")}>demo</Button>
    <Button href="/src" label="Источник кода" active={$page.url.pathname.includes("src")}>src</Button>
    <Button href="/machine" label="Источник кода" active={$page.url.pathname.includes("machine")}>machine</Button>
  </div>
</Activity>
<!-- <InfoBar></InfoBar> -->
<div class="ml-12">
  <slot />
</div>
