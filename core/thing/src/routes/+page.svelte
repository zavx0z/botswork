<script lang="ts">
  import Node from "$lib/Node.svelte"
  import type { LayoutData } from "./$types"

  let { data } = $props<{ data: LayoutData }>()
  let everything = $state(data.everything)
</script>

{#each everything as thing (thing.uuid)}
  <Node {thing} />
{/each}
