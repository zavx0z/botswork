<script context="module">
  import { NavButtonBotik } from "ui"
  import stateMachine from "../../../xstate/stateMachine"

  import Avatar from "$lib/ui/Avatar.svelte"
  import zavx0z from "$lib/assets/img/zavx0z.jpg"
  import BotikIcon from "~icons/botswork/botik"
  import HumansIcon from "~icons/material-symbols/circle-outline"
  import BotsIcon from "~icons/material-symbols/square-outline-rounded"
  import GroupsIcon from "~icons/tabler/circle-square"
  import SidebarCloseIcon from "~icons/lucide/sidebar-close"
  import SettingsIcon from "~icons/fluent/settings-32-regular"
  import LoginIcon from "~icons/ri/login-circle-line"

  const routeRoot = stateMachine.children.get("route-root")
  const layoutCanvas = stateMachine.children.get("canvas")
</script>

<script lang="ts">
  import { page } from "$app/stores"
  import { ripple } from "svelte-ripple-action"
  export let data

  let { session } = data
  $: ({ session } = data)

  const sideBarLeft = $routeRoot.children["sideBar-left"]
  const sideBarRight = $routeRoot.children["sideBar-right"]

  sideBarLeft?.send("OPEN")
  sideBarRight?.send("OPEN")

  const topLinks = [
    { href: "humans", icon: HumansIcon },
    { href: "bots", icon: BotsIcon },
    { href: "groups", icon: GroupsIcon },
  ]
</script>

{#if $sideBarLeft.matches("opened")}
  <nav
    class="fixed inset-y-0 left-0 z-40 flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900"
  >
    <div>
      <NavButtonBotik href={"/"} active={$page.url.pathname === "/"} />
      {#each topLinks as link (link.href)}
        <a
          use:ripple
          href={link.href}
          data-active={link.href === "/" ? $page.url.pathname === link.href : $page.url.pathname.includes(link.href)}
          class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
        >
          <svelte:component this={link.icon} />
        </a>
      {/each}
    </div>
    <div>
      {#if session}
        <a
          use:ripple
          href={"profile"}
          data-active={$page.url.pathname.includes("profile")}
          class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
        >
          <Avatar src={zavx0z} alt="zavx0z" />
        </a>
      {:else}
        <a
          use:ripple
          href={"login"}
          class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500"
        >
          <LoginIcon />
        </a>
      {/if}
      <a
        use:ripple
        href="settings"
        data-active={$page.url.pathname.includes("settings")}
        class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
      >
        <SettingsIcon />
      </a>
      <button
        use:ripple
        class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500"
        on:click={console.log}
      >
        <SidebarCloseIcon />
      </button>
    </div>
  </nav>
{/if}
<slot />
