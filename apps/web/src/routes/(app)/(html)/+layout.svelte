<script lang="ts">
  import { page } from "$app/stores"
  import { ripple } from "svelte-ripple-action"
  import { Button } from "ui/activity"
  import { BotsIcon, BotikIcon, GroupsIcon, HumansIcon, SettingsIcon, LoginIcon, SidebarCloseIcon } from "icons"

  import stateMachine from "../../../xstate/stateMachine"
  import { Activity } from "ui/activity"
  import Avatar from "$lib/ui/Avatar.svelte"
  import zavx0z from "$lib/assets/img/zavx0z.jpg"

  const routeRoot = stateMachine.children.get("route-root")
  const layoutCanvas = stateMachine.children.get("canvas")

  export let data

  let { session } = data
  $: ({ session } = data)

  const sideBarLeft = $routeRoot.children["sideBar-left"]
  const sideBarRight = $routeRoot.children["sideBar-right"]

  sideBarLeft?.send("OPEN")
  sideBarRight?.send("OPEN")
</script>

{#if $sideBarLeft.matches("opened")}
  <Activity>
    <div>
      <Button href="/" active={$page.url.pathname === "/"}>
        <BotikIcon />
      </Button>
      <Button href="humans" active={$page.url.pathname.includes("humans")}>
        <HumansIcon />
      </Button>
      <Button href="bots" active={$page.url.pathname.includes("bots")}>
        <BotsIcon />
      </Button>
      <Button href="groups" active={$page.url.pathname.includes("groups")}>
        <GroupsIcon />
      </Button>
    </div>
    <div>
      {#if session}
        <Button href={"profile"} active={$page.url.pathname.includes("profile")}>
          <Avatar src={zavx0z} alt="zavx0z" />
        </Button>
      {:else}
        <Button href={"login"}>
          <LoginIcon />
        </Button>
      {/if}
      <Button href="settings" active={$page.url.pathname.includes("settings")}>
        <SettingsIcon />
      </Button>
      <Button on:click={console.log}>
        <SidebarCloseIcon />
      </Button>
    </div>
  </Activity>
{/if}
<slot />
