<script lang="ts">
  import { useSelector } from "@xstate/svelte"
  import { HTML } from "@threlte/extras"
  import { T } from "@threlte/core"
  import { Node, Preview, Title, Body, Input, Output } from "$lib/node"
  import { InputBoolean } from "$lib/node/input"
  import { OutputText } from "$lib/node/output"
  import InputText from "$lib/node/input/InputText.svelte"
  import type { AnyActor } from "xstate"

  export let node: AnyActor
  const uri = useSelector(node, (state) => state.context.uri)
  const position = useSelector(node, (state) => state.context.position)

  type InOut = { [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown } }
  interface metaInterface {
    tag: string
    title: string
    input: InOut
    output: InOut
  }
  let meta: metaInterface
  import(/* @vite-ignore */ $uri).then((module) => (meta = module.meta))
  const makePersistentState = (node: any) => {
    const input: { [key: string]: unknown } = {}
    const output: { [key: string]: unknown } = {}
    for (const key of Object.keys(meta.input)) input[key] = node[key]
    for (const key of Object.keys(meta.output)) output[key] = node[key]
    return JSON.stringify({ input, output })
  }
  interface PersistentState {
    input: { [key: string]: unknown }
    output: { [key: string]: unknown }
  }
  const getPersistentState = (id: string): PersistentState | undefined => {
    const persistentState = localStorage.getItem(id)
    if (persistentState) return JSON.parse(persistentState)
  }

  let customElement: any
  const useNode = (node: any) => {
    customElement = node
    node.addEventListener("up", (e: any) => {
      const persistentState = makePersistentState(e.target)
      localStorage.setItem("NC", persistentState)
    })
    const persistentState = getPersistentState("NC")
    if (persistentState) {
      const { input, output } = persistentState
      Object.entries(input).map(([key, value]) => (node[key] = value))
      Object.entries(output).map(([key, value]) => (node[key] = value))
    } else if (meta.input) Object.entries(meta.input).map(([key, item]) => (node[key] = item.default))
  }
</script>

<T.Mesh position={$position}>
  <HTML transform>
    {#if meta}
      <Node>
        <Title title={meta.title} />
        <Body>
          {#if customElement}
            <Input>
              {#each Object.entries(meta.input) as [key, item] (key)}
                {#if item.type === "Boolean"}
                  <InputBoolean title={item.title} bind:checked={customElement[key]} />
                {/if}
                {#if item.type === "Text"}
                  <InputText title={item.title} bind:value={customElement[key]} />
                {/if}
              {/each}
            </Input>
          {/if}
          <Preview>
            <svelte:element this={meta.tag} use:useNode />
          </Preview>
          <Output>
            {#each Object.entries(meta.output) as [key, item] (key)}
              {#if item.type === "Text"}
                <OutputText title={item.title} />
              {/if}
            {/each}
          </Output>
        </Body>
      </Node>
    {/if}
  </HTML>
</T.Mesh>
