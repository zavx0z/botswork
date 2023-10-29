<script lang="ts">
  import { useSelector } from "@xstate/svelte"
  import provideMachine from "./logic/provideMachine"
  import Node from "../../node/Node.svelte"
  import type { NodeMachine } from "@lib/everything"

  export let node: NodeMachine
  const service = node.attach(provideMachine())
  const state = useSelector(service, (state) => state)

  let selected = "js"
  let code = $state.context.input.text
  let fold = $state.context.input.fold
  let lineno = $state.context.input.lineno
  $: service.send({ type: "input.fold", params: fold })
  $: service.send({ type: "input.lineno", params: lineno })
  $: service.send({ type: "input.text", params: code || "" })
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
    {#if $state.context.output.text}
      <pre class={lineno ? "line-num" : ""}><code>{@html $state.context.output.text}</code></pre>
    {/if}
  </Preview>
  <Output let:String>
    <String title="Форматированный код" />
  </Output>
</Node>
