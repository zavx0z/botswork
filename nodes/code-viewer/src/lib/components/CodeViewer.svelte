<svelte:options
  customElement={{
    tag: "metafor-code-viewer",
    // shadow: "none",
    props: {
      inputCode: { reflect: false, attribute: "input-html-code", type: "String" },
      fold: { reflect: false, attribute: "fold", type: "Boolean" },
    },
    // extend: (/** @type {any} */ customElementConstructor) => {
    //   return class extends customElementConstructor {
    //     constructor() {
    //       super()
    //       this.dispatchEvent(new CustomEvent("prototype", { composed: true, detail: "success" }))
    //     }
    //   }
    // },
  }}
/>

<script context="module">
  export let proto = {
    tag: "metafor-code-viewer",
    title: "Подсветка синтаксиса кода",
    input: {
      fold: {
        type: "Boolean",
        title: "Свертки строк",
        default: false,
      },
      lineno: {
        type: "Boolean",
        title: "Номера строк",
        default: true,
      },
    },
    output: {},
  }
</script>

<script>
  import { process } from "../process"
  export let inputCode = ""
  export let fold = false
  export let lineno = true
  /**
   * @type {HTMLPreElement}
   */
  let preElement
  /**
   * @param {string} result
   */
  function updateResult(result) {
    preElement.dispatchEvent(new CustomEvent("output", { composed: true, detail: result }))
  }
  $: {
    console.log("!!!!!!!!!!!!!!!")
    process(fold, lineno, inputCode, "js").then((result) => {
      console.log("Set Result!")
      updateResult(result)
    })
  }
</script>

<!-- <input type="checkbox" bind:checked={fold} /> -->
<pre bind:this={preElement} class:line-num={inputCode.includes("line-numbers-rows")}><code>{@html inputCode}</code></pre>

<style lang="scss" global>
  @import "../styles/global.scss";
  @import "../styles/lineNum.scss";
  pre {
    margin: 0;
  }
</style>
