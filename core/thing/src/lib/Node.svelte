<script lang="ts">
  import { Preview, Title, Body, Input, Output } from "./index"
  import { InputBoolean } from "./input"
  import { OutputText } from "./output"
  import InputText from "./input/InputText.svelte"
  import type { ThingType } from "./types"

  let { thing } = $props<{ thing: ThingType }>()
  // import("/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js")
  console.log(thing.tag)
  let HTMLThingElement: HTMLElement | undefined = $state()
  const useNode = (node: HTMLElement) => {
    HTMLThingElement = node
    //@ts-ignore
    // Object.entries(thing.input).map(([key, value]) => (node[key] = value))
    //@ts-ignore
    Object.entries(thing.output).map(([key, value]) => (node[key] = value))
    const messageHandler = ({ data }: any) => {
      console.log("data", data)
    }
    node.addEventListener("message", messageHandler)
    return {
      update() {},
      destroy() {
        node.removeEventListener("message", messageHandler)
      },
    }
  }
</script>

<div aria-label="нода" class="grid w-96 grid-cols-1 grid-rows-[2rem_max-content] rounded-md bg-surface-800 shadow-lg shadow-slate-900">
  <Title title={thing.title} />
  <Body>
    {#if HTMLThingElement}
      <Input>
        {#each Object.entries(thing.input) as [key, item] (key)}
          {#if item.type === "Boolean"}
            <InputBoolean title={item.title} bind:checked={HTMLThingElement[key]} />
          {/if}
          {#if item.type === "Text"}
            <InputText title={item.title} bind:value={HTMLThingElement[key]} />
          {/if}
        {/each}
      </Input>
    {/if}
    <Preview>
      <svelte:element this={thing.tag} use:useNode />
    </Preview>
    <Output>
      {#each Object.entries(thing.output) as [key, item] (key)}
        {#if item.type === "Text"}
          <OutputText title={item.title} />
        {/if}
      {/each}
    </Output>
  </Body>
</div>
