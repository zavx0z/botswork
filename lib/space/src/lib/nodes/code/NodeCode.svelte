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
  const tagName = useSelector(node, (state) => state.context.tagName)

  let nodeShadowLoaded = false
  if (!nodeShadowLoaded)
    import($uri).then((i) => {
      console.log(i.default.element.observedAttributes)
      nodeShadowLoaded = true
    })

  const useNode = (node: HTMLElement, code: string | undefined) => {
    if (code) node.setAttribute("input-html-code", code)
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
    <svelte:element this={$tagName} use:useNode={$state.context.output.text} />
  </Preview>
  <Output let:String>
    <String title="Форматированный код" />
  </Output>
</Node>
