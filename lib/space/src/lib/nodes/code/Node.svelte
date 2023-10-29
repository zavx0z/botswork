<script lang="ts">
  import { createActor, type AnyActorRef } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import provideMachine from "./logic/provideMachine"
  import Boolean from "../../node/input/InputCheckBox.svelte"
  import OutputString from "../../node/output/OutputString.svelte"
  import InputText from "../../node/input/InputText.svelte"
  import PropSelect from "../../node/prop/PropSelect.svelte"
  import Node from "../../node/Node.svelte"

  export let atom: AnyActorRef
  console.log(atom)
  const position = useSelector(atom, (state) => state.context.position)
  let selected = "js"

  const systemId = "codeRender"
  const persistentState = localStorage.getItem(systemId)
  const Actor = createActor(provideMachine(), { systemId, ...(persistentState ? { state: JSON.parse(persistentState) } : {}) }).start()
  // const Actor = createActor(provideMachine(), { systemId }).start()
  const state = useSelector(Actor, (state) => state)
  state.subscribe((state) => localStorage.setItem("codeRender", JSON.stringify(Actor.getPersistedState())))

  let code = $state.context.input.text
  let fold = $state.context.input.fold
  let lineno = $state.context.input.lineno
  $: Actor.send({ type: "input.fold", params: fold })
  $: Actor.send({ type: "input.lineno", params: lineno })
  $: Actor.send({ type: "input.text", params: code || "" })
</script>

<Node {position} let:Input let:Output let:Preview>
  <Title slot="title" title="Подсветка синтаксиса кода" let:Title />
  <Input>
    <PropSelect
      title="язык программирования"
      bind:selected
      options={[
        { value: "js", title: "JavaScript" },
        { value: "ts", title: "TypeScript" },
        { value: "css", title: "CSS" },
        { value: "html", title: "HTML" },
      ]}
    />
    <InputText bind:value={code} title="Код" placeholder="ctrl+v" />
    <Boolean title="Свертки строк" bind:checked={fold} />
    <Boolean title="Номера строк" bind:checked={lineno} />
  </Input>
  <Preview>
    {#if $state.context.output.text}
      <pre class={lineno ? "line-num" : ""}><code>{@html $state.context.output.text}</code></pre>
    {/if}
  </Preview>
  <Output>
    <OutputString title="Форматированный код" />
  </Output>
</Node>
