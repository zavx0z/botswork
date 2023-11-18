<script lang="ts">
  //@ts-ignore
  // import("https://esm.veryfront.com/@metafor/code-viewer@latest/dist/CodeViewer.js")
  import("../dist/CodeViewer.js").then((module) => {
    // console.log(module)
  })

  let src = `export let meta = {
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
      },
    },
  }`

  const useNode = (node: HTMLElement) => {
    const messageHandler = ({ detail }: any) => console.log("receive data")
    node.addEventListener("message", messageHandler)
    return {
      destroy() {
        node.removeEventListener("message", messageHandler)
      },
    }
  }
</script>

<main>
  <metafor-code-viewer {src} use:useNode> </metafor-code-viewer>
</main>

<style>
  /* metafor-code-viewer::part(code-viewer) {
    color: brown;
    position: relative;
  } */
  /* metafor-code-viewer::part(input-text)::after {
    content: " ";
    width: 10px;
    height: 10px;
    background-color: black;
  } */
</style>
