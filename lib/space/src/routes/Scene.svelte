<script lang="ts">
  import { machine } from "$lib/node/machine"
  import NodeCode from "$lib/nodes/code/NodeCode.svelte"
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { createEverything } from "@lib/everything"

  const { stuff, send } = createEverything()

  send({ type: "stuff.put", params: { machine, options: { systemId: "code-render", id: "atom", input: { position: [0, 0, 0] } } } })
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 25]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

{#each $stuff as node (node.id)}
  <NodeCode {node} />
{/each}
