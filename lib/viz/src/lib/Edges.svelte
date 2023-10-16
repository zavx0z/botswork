<script lang="ts">
  import { useSelector } from "@xstate/svelte"
  import type { AnyActor } from "xstate"
  import { getAllEdges } from "./utils"
  import Edge from "./Edge.svelte"

  export let service: AnyActor
  const machine = useSelector(service, (state) => state.context.machine)
  const edges = getAllEdges($machine)
</script>

<svg class="pointer-events-none fixed left-0 top-0 h-full w-full">
  {#each edges as edge, idx (idx)}
    <Edge {edge} {idx} />
  {/each}
</svg>
