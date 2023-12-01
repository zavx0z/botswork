<script lang="ts">
  import { machine } from "$lib/node/machine"
  import NodeCode from "$lib/node/NodeFabric.svelte"
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  // import { createEverything } from "@core/thing"
  const { stuff, send } = {}

  const uuid = crypto.randomUUID()
  send({
    type: "stuff.put",
    params: {
      machine,
      options: {
        systemId: uuid,
        id: uuid,
        input: {
          position: [5, 0, 0],
          uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.7/dist/CodeViewer.js",
        },
      },
    },
  })
  const uuid2 = crypto.randomUUID()
  send({
    type: "stuff.put",
    params: {
      machine,
      options: {
        systemId: uuid2,
        id: uuid2,
        input: {
          position: [-5, 0, 0],
          uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.7/dist/CodeViewer.js",
        },
      },
    },
  })
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 14]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

{#each $stuff as node (node.id)}
  <NodeCode {node} />
{/each}
