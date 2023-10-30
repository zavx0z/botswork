<script lang="ts">
  let name = "one"
  // только при изменении в svelte
  $: console.log(name)
  setTimeout(() => (name = "yo!"), 4000)

  const useNode = (node: HTMLElement) => {
    node.addEventListener("m4-update", (e) => {
      console.log(e)
    })
  }
</script>

<svelte:head>
  <script type="module" src="../dist/CodeViewer.js"></script>
</svelte:head>
<main>
  <code-viewer use:useNode {name} >
    <p>best!</p>
    </code-viewer>
</main>
