<script lang="ts">
  import { createEverything } from "$lib/every/everything.js"
  import { machine } from "$lib/machine.js"
  import Node from "$lib/Node.svelte"
  const { everything, send, every } = createEverything()

  every.subscribe((state) => {
    switch (state.value) {
      case "idle":
        console.log(state)
    }
  })
  const uuid = crypto.randomUUID()
  send({
    type: "stuff.put",
    params: {
      machine,
      options: {
        systemId: uuid,
        id: uuid,
        input: {
          position: [0, 0, 0],
          uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.7/dist/CodeViewer.js",
        },
      },
    },
  })
</script>

{#each $everything as thing (thing.id)}
  <Node {thing} />
{/each}
