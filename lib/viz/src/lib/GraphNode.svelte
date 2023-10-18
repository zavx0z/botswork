<script lang="ts">
  export let elkNode: any

  const useNode = (node: HTMLElement, elkNode: any) => {
    node.style.width = `${parseInt(elkNode.width)}px`
    node.style.height = `${parseInt(elkNode.height)}px`
    node.style.top = `${parseInt(elkNode.y ?? 0)}px`
    node.style.left = `${parseInt(elkNode.x ?? 0)}px`
  }
</script>

<div use:useNode={elkNode} class="absolute outline outline-blue-500">
  {#if elkNode.children}
    {#each elkNode.children as child, idx (idx)}
      <svelte:self elkNode={child} />
    {/each}
  {/if}
</div>
