<script lang="ts">
  import "@lib/theme/app.css"
  import "@lib/code/styles.css"
  // import { Activity, Button } from "@lib/ui/activity"
  // import { BotikIcon } from "@lib/icons"
  // import { page } from "$app/stores"
</script>

<svelte:head>
  <title>@lib/viz</title>
</svelte:head>
<!-- <Activity>
  <div>
    <Button href="/" label="главная" active={$page.url.pathname === "/"}>
      <BotikIcon />
    </Button>
    <Button href="/viz" label="главная" active={$page.url.pathname.includes("viz")}>
      <img src="/favicon.png" alt="viz" data-active={$page.url.pathname.includes("viz")} class="h-8 w-8 duration-100 hover:invert-[.5] data-[active=true]:invert-[.75]" />
    </Button>
    <Button href="/playground" label="playground" active={$page.url.pathname.includes("playground")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M42.8 38.73L29 17.16v-9h1.32a1.81 1.81 0 1 0 0-3.62h-12.7a1.81 1.81 0 0 0 0 3.62h1.32v9L5.2 38.73a1.71 1.71 0 0 0-.29 1a1.79 1.79 0 0 0 1.81 1.77h34.56a1.81 1.81 0 0 0 1.59-.94a1.77 1.77 0 0 0-.07-1.83Zm-31.41-9.65h25.22"
        />
      </svg>
    </Button>
    <Button href="/polygon" label="polygon" active={$page.url.pathname.includes("polygon")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"
        ><path
          fill="currentColor"
          d="M227.81 52.19a28 28 0 0 0-39.6 0a27.84 27.84 0 0 0-5.88 8.65l-34.56-9.42a28 28 0 0 0-47.57-23.23a28.05 28.05 0 0 0-3.48 35.37L57.91 98.49a28 28 0 0 0-37.72 1.71a28 28 0 0 0 39.6 39.6l.18-.19l75.32 55.24A28 28 0 1 0 173 183.2l29.56-83.75a28.52 28.52 0 0 0 5.44.55a28 28 0 0 0 19.8-47.79ZM105.86 33.85a20 20 0 1 1 0 28.29a20 20 0 0 1 0-28.29Zm-80 100.29a20 20 0 1 1 28.28 0a20 20 0 0 1-28.29 0Zm148.3 88a20 20 0 1 1 0-28.28a20 20 0 0 1-.01 28.29Zm-8.7-41.6a28 28 0 0 0-25.25 7.66l-.18.19l-75.32-55.23a28.13 28.13 0 0 0-1.44-28.73l38.81-34.93a28 28 0 0 0 43.6-10.36l34.56 9.43a28 28 0 0 0 8 23.22a27.64 27.64 0 0 0 6.8 5Zm56.7-94.41a20 20 0 1 1 0-28.29a20 20 0 0 1-.01 28.3Z"
        /></svg
      >
    </Button>
  </div>
</Activity>
<div class="ml-12"> -->
  <slot />
<!-- </div> -->
