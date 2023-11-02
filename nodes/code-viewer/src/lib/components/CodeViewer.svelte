<svelte:options customElement="metafor-code-viewer" />

<script context="module">
  export let proto = {
    tag: "metafor-code-viewer",
    title: "Подсветка синтаксиса кода",
    input: {
      src: {
        title: "Код",
        type: "Text",
        default: "",
      },
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
  export let src = ""
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
  const updateResult = (result) => preElement.dispatchEvent(new CustomEvent("up", { composed: true, detail: result }))
  $: process(fold, lineno, src, "js").then((result) => {
    console.log("✨ Send Result")
    code = result
    updateResult(result)
  })
</script>

<pre bind:this={preElement} class:line-num={code.includes("line-numbers-rows")}><code>{@html code}</code></pre>

<style lang="scss" global>
  @import "../styles/global.scss";
  @import "../styles/lineNum.scss";
  pre {
    margin: 0;
  }
</style>
