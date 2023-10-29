<script lang="ts">
  import { createEverything } from "$lib/everything"
  import { createMachine } from "xstate"

  let everything = createEverything()

  const childMachine = createMachine({
    initial: "idle",
    states: {
      idle: {},
    },
  })
  const { stuff, confusion } = everything
</script>

<button on:click={() => stuff.put(childMachine, { systemId: "atom-system1" + crypto.randomUUID(), id: "atom" + crypto.randomUUID() })}> add atom </button>
{#each $stuff as atom (atom.id)}
  <li>{atom.id}</li>
{/each}
