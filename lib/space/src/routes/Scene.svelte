<script lang="ts">
  import { machine } from "$lib/node/machine"
  import Node from "$lib/nodes/code/Node.svelte"
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { useSelector } from "@xstate/svelte"
  import { everything } from "./everything"
  everything.start()

  everything.send({ type: "atom.put", params: { atom: machine, options: { systemId: "code-render", id: "atom", input: { position: [-1, 0, 0] } } } })
  const atoms = useSelector(everything, (state) => state.context.atoms)
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 25]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

{#each Object.entries($atoms) as [ref, atom] (ref)}
  <Node {atom} />
{/each}
