<svelte:options customElement={{ tag: "code-viewer" }} />

<script lang="ts">
  export let code = ""
  function click(e: Event) {
    e.target?.dispatchEvent(new CustomEvent("m4-update", { composed: true, detail: "success" }))
  }
</script>

<pre class="language-js"><code class="language-js">{@html code}</code></pre>
<slot />
<button on:click={click}>click</button>

<style lang="scss" global>
  @import "../styles/global.scss";
</style>
