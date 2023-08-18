<script lang="ts">
  import { NavButtonBotik } from "ui"
  import "@packages/config/tailwindCSS"
  import "../../component.css"
  import { ripple } from "svelte-ripple-action"
  import BotikIcon from "~icons/botswork/botik"
</script>

<nav
  class="fixed inset-y-0 left-0 z-40 flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900"
>
  <div>
    <a
      use:ripple
      href={"/"}
      class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500"
    >
      <BotikIcon />
    </a>
    <NavButtonBotik />
  </div>
  <div>
    <a
      use:ripple
      href={"login"}
      class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500"
    >
      <BotikIcon />
    </a>
  </div>
</nav>
<slot />
