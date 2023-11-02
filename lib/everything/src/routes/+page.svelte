<script lang="ts">
  import { createEverything } from "$lib/everything"
  import { createMachine } from "xstate"

  const machine = createMachine({
    initial: "idle",
    states: {
      idle: {},
    },
  })
  const { stuff, send } = createEverything()

  const uuid = crypto.randomUUID()
  const addStuff = () =>
    send({
      type: "stuff.put",
      params: {
        machine,
        options: {
          systemId: uuid,
          id: uuid,
          input: {
            position: [0, 0, 0],
            // uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.6/dist/CodeViewer.js",
            uri: "/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js",
          },
        },
      },
    })
</script>

<button on:click={addStuff}> add atom </button>
{#each $stuff as atom (atom.id)}
  <li>{atom.id}</li>
{/each}
