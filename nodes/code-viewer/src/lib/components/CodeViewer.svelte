<svelte:options customElement="metafor-code-viewer" />

<script context="module">
  export const meta = {
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

<script lang="ts">
  import { process } from "../process"
  type Props = {
    src: string
    fold: boolean
    lineno: boolean
    code: string
  }
  let { src = meta.input.src.default, fold = meta.input.fold.default, lineno = meta.input.lineno.default, code = meta.output.code.default } = $props<Props>()

  let preElement: HTMLPreElement
  const updateResult = (result: string) => preElement.dispatchEvent(new CustomEvent("message", { composed: true, detail: result }))
  $effect(() => {
    process(fold, lineno, src, "js").then((result) => {
      console.log("✨ Send Result")
      code = result
      updateResult(result)
    })
  })
</script>

<pre bind:this={preElement} class:line-num={code.includes("line-numbers-rows")}><code>{@html code}</code></pre>
{@html `<style>
  code details:not([open]) {
    display: inline;
  }
  code details:not([open]) > summary::after {
    content: " ... ";
  }
  code details:not([open]) + span.ll {
    display: none;
  }
  </style>`}

<style lang="scss">
  :global {
    @import "../styles/lineNum.scss";
    @import "../styles/prism.scss";

    code summary > span:first-child::before {
      position: absolute;
      display: inline-flex;
      align-items: center;
      height: 21px;
      margin-left: -16px;
      margin-top: 1px;
      content: "▶";
      font-size: 12px;
      font-style: normal;
      transition: transform 100ms;
      color: #999;
    }
    code details[open] > summary > span:first-child::before {
      transform: rotate(90deg);
    }
    code summary {
      display: inline;
      position: relative;
      list-style: none;
    }
    pre {
      margin: 0;
    }
  }
</style>
