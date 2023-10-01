<script lang="ts">
  import { page } from "$app/stores"
  import { Modal } from "@lib/ui/modal"
  import { ripple } from "svelte-ripple-action"

  export let tabs = [
    { title: "Вход", id: "login" },
    { title: "Регистрация", id: "join" },
    { title: "Сброс", id: "reset" }
  ]
</script>

<Modal>
  <div class="bg-surface-800 relative flex h-96 w-96 flex-col content-center rounded-md p-4 shadow-md">
    <div aria-label="Authentication" class="flex w-full justify-around">
      {#each tabs as tab (tab.id)}
        <a
          use:ripple
          href={tab.id}
          data-active={$page.url.pathname.includes(tab.id)}
          class="text-primary-900 focus-visible:ring-surface-500 data-[active=true]:text-primary-600 flex h-11 flex-1 cursor-default items-center justify-center rounded-none rounded-t px-4 leading-none outline-none focus-visible:ring-1 data-[active=true]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[active=true]:shadow-current"
        >
          {tab.title}
        </a>
      {/each}
    </div>
    <div
      class="focus-visible:ring-surface-500 h-full rounded-md p-4 outline-none transition-colors focus-visible:ring-1"
    >
      <slot />
    </div>
  </div>
</Modal>
