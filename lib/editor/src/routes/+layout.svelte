<script lang="ts">
  import "@lib/theme/app.css"
  import { Activity, Button } from "@lib/ui/activity"
  import { BotikIcon } from "@lib/icons"
  import { page } from "$app/stores"
</script>

<svelte:head>
  <title>@lib/editor</title>
</svelte:head>
<Activity>
  <div>
    <Button href="/" label="главная" active={$page.url.pathname === "/"}>
      <BotikIcon />
    </Button>
    <Button href="/editor" label="editor" active={$page.url.pathname.includes("editor")}>
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
    <Button href="/xstate" label="xstate" active={$page.url.pathname.includes("xstate")}>
      <span class="fill-surface-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 306">
          <path
            d="m83.605.045l169.1 169.1c1.953 2.074 3.295 5.003 3.295 8.175c0 3.538-1.586 6.71-4.149 8.784L136.433 301.522a12.149 12.149 0 0 1-17.202 0L3.569 185.86a12.15 12.15 0 0 1 0-17.203L74.82 97.283l7.93 7.93l1.663 1.637c11.319 11.807 26.701 41.205 3.462 65.955c-2.44 2.44-2.44 6.223 0 8.663l35.626 35.748c2.44 2.44 6.222 2.44 8.662 0l35.626-35.626c1.098-1.099 1.952-2.685 1.952-4.392c0-1.587-.732-3.173-1.83-4.27l-30.502-30.502l.123-.122l-53.805-53.805C59.325 63.976 59.08 24.568 83.605.045Zm71.046 9.139c12.246-12.245 32.099-12.245 44.344 0c12.244 12.245 12.244 32.098 0 44.343c-12.245 12.245-32.098 12.245-44.344 0c-12.245-12.245-12.245-32.098 0-44.343Z"
          />
        </svg>
      </span>
    </Button>
  </div>
</Activity>
<div class="ml-12">
  <slot />
</div>
