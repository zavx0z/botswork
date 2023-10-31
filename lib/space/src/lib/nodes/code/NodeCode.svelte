<script lang="ts">
  import provideMachine from "./logic/provideMachine"
  import Node from "../../node/Node.svelte"
  import type { NodeMachine } from "@lib/everything"
  import { useSelector } from "@xstate/svelte"

  export let node: NodeMachine

  const { state, send } = node.attach(provideMachine())
  let selected = "js"
  let code = $state.context.input.text
  let fold = $state.context.input.fold
  let lineno = $state.context.input.lineno
  $: send({ type: "input.fold", params: fold })
  $: send({ type: "input.text", params: code || "" })
  $: send({ type: "input.lineno", params: lineno })

  const uri = useSelector(node, (state) => state.context.uri)
  console.log($uri)

  const useNode = (node: HTMLElement, code: string | undefined) => {
    let nodeShadowLoaded = false
    if (!nodeShadowLoaded)
      import($uri).then((i) => {
        // console.log(i.default.element.observedAttributes)
        nodeShadowLoaded = true
      })

    if (code) node.setAttribute("input-html-code", code)
    node.addEventListener("m4-update", (e) => {
      console.log(e)
    })
    return {
      update(code: string | undefined) {
        if (code) node.setAttribute("input-html-code", code)
      },
    }
  }
</script>

<Node {node} title="Подсветка синтаксиса кода" let:Input let:Output let:Preview>
  <Input let:Select let:Text let:CheckBox>
    <Select
      title="язык программирования"
      bind:selected
      options={[
        { value: "js", title: "JavaScript" },
        { value: "ts", title: "TypeScript" },
        { value: "css", title: "CSS" },
        { value: "html", title: "HTML" },
      ]}
    />
    <Text bind:value={code} title="Код" placeholder="ctrl+v" />
    <CheckBox title="Свертки строк" bind:checked={fold} />
    <CheckBox title="Номера строк" bind:checked={lineno} />
  </Input>
  <Preview>
    <!-- <metafor-code-viewer use:useNode={$state.context.output.text} /> -->
    {#if $state.context.output.text}
    <!-- <metafor-code-viewer use:useNode={$state.context.output.text} /> -->

    <pre class={lineno ? "line-num" : ""}><code>{@html $state.context.output.text}</code></pre>
    {/if}
  </Preview>
  <Output let:String>
    <String title="Форматированный код" />
  </Output>
</Node>
