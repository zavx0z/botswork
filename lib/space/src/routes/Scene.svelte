<script lang="ts">
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { interactivity } from "@threlte/extras"
  import Node from "$lib/nodes/Node.svelte"
  import { createActor } from "xstate"
  import { machine } from "$lib/nodes/machine"
  import type { AnyActor } from "xstate"

  const actors: { ref: String; actor: AnyActor }[] = [
    { ref: "left", actor: createActor(machine, { input: { position: [0, 0, 0] } }) },
    // { ref: "right", actor: createActor(machine, { input: { position: [6, 0, 0] } }) },
  ]
  interactivity()
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 25]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

{#each actors as { ref, actor } (ref)}
  <Node {actor} />
{/each}
