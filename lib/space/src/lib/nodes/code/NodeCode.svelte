<script lang="ts">
  import provideMachine from "./logic/provideMachine"
  import type { NodeMachine } from "@lib/everything"
  import { useSelector } from "@xstate/svelte"
  import { HTML } from "@threlte/extras"
  import { T } from "@threlte/core"
  import { Node, Preview, Title, Body, Input, Output } from "$lib/node"
  import { InputBoolean } from "$lib/node/input"
  import { OutputText } from "$lib/node/output"
  import InputText from "$lib/node/input/InputText.svelte"

  export let node: NodeMachine
  const uri = useSelector(node, (state) => state.context.uri)
  const position = useSelector(node, (state) => state.context.position)

  const { state, send } = node.attach(provideMachine())

  let code = $state.context.input.text
  $: send({ type: "input.text", params: code || "" })

  type protoType = {
    tag: string
    title: string
    input?: {
      [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown }
    }
    output?: {
      [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown }
    }
  }
  let proto: protoType
  let inputKeys: string[]
  let outputKeys: string[]
  import(/* @vite-ignore */ $uri).then((module) => {
    // console.log(module)
    proto = module.proto
    if (proto.input) inputKeys = Object.keys(proto.input)
    if (proto.output) outputKeys = Object.keys(proto.output)
  })

  const makePersistentState = (node: any) =>
    JSON.stringify({
      input: inputKeys.map((key) => node[key]),
      output: outputKeys.map((key) => node[key]),
    })

  const useNode = (node: HTMLElement, code: string | undefined) => {
    node.addEventListener("up", (e: any) => {
      const persistentState = makePersistentState(e.target)
      localStorage.setItem("NC", persistentState)
    })
    //@ts-ignore
    if (proto.input) Object.entries(proto.input).map(([key, item]) => (node[key] = item.default))
    if (code) node.setAttribute("src", code)
    return {
      update(code: string | undefined) {
        console.log(code)
        // if (code) node.setAttribute("input-html-code", code)
      },
    }
  }
  let customElement: HTMLElement
</script>

<T.Mesh position={$position}>
  <HTML transform>
    {#if proto}
      <Node>
        <Title title={proto.title} />
        <Body>
          {#if customElement}
            {#if proto.input}
              <Input>
                {#each Object.entries(proto.input) as [key, item] (key)}
                  {#if item.type === "Boolean"}
                    <InputBoolean title={item.title} bind:checked={customElement[key]} />
                  {/if}
                  {#if item.type === "Text"}
                    <InputText title={item.title} bind:value={customElement[key]} />
                  {/if}
                {/each}
              </Input>
            {/if}
          {/if}
          <Preview>
            <svelte:element this={proto.tag} bind:this={customElement} use:useNode={code} />
          </Preview>
          {#if proto.output}
            <Output>
              {#each Object.entries(proto.output) as [key, item] (key)}
                {#if item.type === "Text"}
                  <OutputText title={item.title} />
                {/if}
              {/each}
            </Output>
          {/if}
        </Body>
      </Node>
    {/if}
  </HTML>
</T.Mesh>
