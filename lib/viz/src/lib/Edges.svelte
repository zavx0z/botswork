<script lang="ts">
  import EdgeViz from "./EdgeViz.svelte"

  export let edges: any
</script>

<svg class="pointer-events-none fixed left-0 top-0 h-full w-full">
  {#each edges as edge}
    <EdgeViz {edge} />
  {/each}
</svg>
