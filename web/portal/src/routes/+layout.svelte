<script lang="ts">
  // import { debounce } from "@lib/ui/utils"
  // import stateMachine from "../xstate/stateMachine"
  // const display = stateMachine.children.get("display")
</script>

<svelte:head>
  <title>BotsWork</title>
</svelte:head>
<!-- <svelte:window on:orientationchange={() => display?.send("rotate")} on:resize={debounce(() => display?.send({ type: "resize" }), 200)} /> -->
<slot />
