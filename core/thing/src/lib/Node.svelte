<script lang="ts">
  import { Preview, Title, Body, Input, Output } from "./index"
  import { InputBoolean } from "./input"
  import { OutputText } from "./output"
  import InputText from "./input/InputText.svelte"

  let { thing } = $props<{ thing: { uri: string } }>()
  console.log(thing)

  type InOut = { [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown } }
  
  interface metaInterface {
    tag: string
    title: string
    input: InOut
    output: InOut
  }
  let meta: metaInterface | undefined = $state()

  $effect(() => {
    import(/* @vite-ignore */ thing.uri).then((module) => (meta = module.meta))
  })

  const makePersistentState = (node: any) => {
    const input: { [key: string]: unknown } = {}
    const output: { [key: string]: unknown } = {}
    if (meta) {
      for (const key of Object.keys(meta.input)) input[key] = node[key]
      for (const key of Object.keys(meta.output)) output[key] = node[key]
    }
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

  let HTMLThingElement: HTMLElement | undefined = $state()

  const useNode = (node: HTMLElement) => {
    console.log(meta?.input)
    console.log({ node })
    // input = Object.entries(meta.input)
    HTMLThingElement = node
    node.addEventListener("up", (e: any) => {
      const persistentState = makePersistentState(e.target)
      localStorage.setItem("NC", persistentState)
    })
    const persistentState = getPersistentState("NC")
    if (persistentState) {
      const { input, output } = persistentState
      //@ts-ignore
      Object.entries(input).map(([key, value]) => (node[key] = value))
      //@ts-ignore
      Object.entries(output).map(([key, value]) => (node[key] = value))
      //@ts-ignore
    } else if (meta?.input) Object.entries(meta.input).map(([key, item]) => (node[key] = item.default))
  }
</script>

{#if meta}
  <div aria-label="нода" class="grid w-96 grid-cols-1 grid-rows-[2rem_max-content] rounded-md bg-surface-800 shadow-lg shadow-slate-900">
    <Title title={meta.title} />
    <Body>
      {#if HTMLThingElement}
        <Input>
          {#each Object.entries(meta.input) as [key, item] (key)}
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
  </div>
{/if}
