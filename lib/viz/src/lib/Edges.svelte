<script lang="ts">
  import type { AnyActor } from "xstate"
  import EdgeViz from "./EdgeViz.svelte"
  import { getAllEdges } from "./utils"
  import { useSelector } from "@xstate/svelte"
  export let service: AnyActor
  let edges = useSelector(service, (state) => getAllEdges(state.context.machine))
</script>

<svg class="pointer-events-none fixed left-0 top-0 h-full w-full">
  {#each $edges as edge}
    <EdgeViz {edge} {service} />
  {/each}
</svg>
