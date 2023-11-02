<script lang="ts">
  import provideMachine from "./logic/provideMachine"
  import type { NodeMachine } from "@lib/everything"
  import { useSelector } from "@xstate/svelte"
  import { HTML } from "@threlte/extras"
  import { T } from "@threlte/core"
  import { Node, Preview, Title, Body, Input, Output } from "$lib/node"
  import { InputBoolean } from "$lib/node/input"

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

  type protoType = {
    tag: string
    title: string
    input?: {
      [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown }
    }
  }
  let proto: protoType
  import(/* @vite-ignore */ $uri).then((module) => {
    console.log(module)
    proto = module.proto
  })

  const useNode = (node: HTMLElement, code: string | undefined) => {
    node.addEventListener("output", (e: any) => {
      // node.setAttribute("input-html-code", e.detail)
    })
    //@ts-ignore
    if (proto.input) Object.entries(proto.input).map(([key, item]) => (node[key] = item.default))
    if (code) node.setAttribute("input-html-code", code)
    return {
      update(code: string | undefined) {
        console.log(code)
        if (code) node.setAttribute("input-html-code", code)
      },
    }
  }
  const position = useSelector(node, (state) => state.context.position)
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
                {/each}
              </Input>
            {/if}
          {/if}
          <Preview>
            <svelte:element this={proto.tag} bind:this={customElement} use:useNode={code} />
          </Preview>
        </Body>
      </Node>
    {/if}
  </HTML>
</T.Mesh>
