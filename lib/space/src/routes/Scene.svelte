<script lang="ts">
  import { machine } from "$lib/node/machine"
  import NodeCode from "$lib/node/NodeFabric.svelte"
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { createEverything } from "@lib/everything"
  const { stuff, send } = createEverything()

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
          // uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.6/dist/CodeViewer.js",
          uri: "/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js",
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
