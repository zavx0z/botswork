<svelte:options
  customElement={{
    tag: "metafor-code-viewer",
    shadow: "none",
    props: {
      inputCode: { reflect: true, attribute: "input-html-code", type: "String" },
    },
  }}
/>

<script lang="ts">
  export let inputCode = ""
  // function click(e: Event) {
  //   e.target?.dispatchEvent(new CustomEvent("m4-update", { composed: true, detail: "success" }))
  // }
</script>

<pre class="line-num"><code>{@html inputCode}</code></pre>
<slot />

<!-- <button on:click={click}>click</button> -->

<style lang="scss" global>
  // @import "../styles/global.scss";
  // @import "../styles/lineNum.scss";
</style>
