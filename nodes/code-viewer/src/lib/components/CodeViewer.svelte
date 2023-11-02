<svelte:options
  customElement={{
    tag: "metafor-code-viewer",
    // shadow: "none",
    props: {
      inputCode: { reflect: false, attribute: "input-html-code", type: "String" },
      output: { reflect: false, attribute: "output", type: "String" },
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
        title: "Свертки строк",
        type: "Boolean",
        default: false,
      },
      lineno: {
        title: "Номера строк",
        type: "Boolean",
        default: true,
      },
    },
    output: {
      code: {
        title: "Код",
        type: "Text",
        default: "",
      },
    },
  }
</script>

<script>
  import { process } from "../process"
  export let inputCode = ""
  export let fold = false
  export let lineno = true
  export let code = ""
  /**
   * @type {HTMLPreElement}
   */
  let preElement
  /**
   * @param {string} result
   */
  function updateResult(result) {
    preElement.dispatchEvent(new CustomEvent("code", { composed: true, detail: result }))
  }
  $: process(fold, lineno, inputCode, "js").then((result) => {
    console.log("✨ Send Result")
    code = result
    updateResult(result)
  })
</script>

<!-- <input type="checkbox" bind:checked={fold} /> -->
<pre bind:this={preElement} class:line-num={code.includes("line-numbers-rows")}><code>{@html code}</code></pre>

<style lang="scss" global>
  @import "../styles/global.scss";
  @import "../styles/lineNum.scss";
  pre {
    margin: 0;
  }
</style>
