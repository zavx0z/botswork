<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import type { PageData } from "./$types"
  import Canvas from "$lib/Canvas.svelte"
  import { setContext } from "svelte"

  export let data: PageData
  setContext("service", data.service)
  const visibleEditor = false
  let content = `const machine = createMachine(
  {
    context: {
      count: 0,
    },
    id: "testMachine",
    entry: {
      type: "rootAction1",
    },
    exit: {
      type: "rootAction1",
    },
    initial: "final",
    states: {
      final: {
        type: "final",
      },
      one:{
        on: {HELLO: "two"}
      },
      two:{}
    },
  },
  {
    actions: { rootAction1: ({ context, event }) => {} },
    actors: {},
    guards: {},
    delays: {},
  },
);`
</script>

<main class="grid h-screen w-screen grid-cols-2 grid-rows-1">
  <Canvas />
  {#if visibleEditor}
    <Editor {content} language="typescript" />
  {/if}
  <!-- <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => service.send({ type: "EVENT", event: { type: "NEXT" } })}> NEXT </button> -->
  <!-- <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => service.send({ type: "MACHINE.UPDATE", machine: parseMachines($content)[0] })}> MACHINE </button> -->
</main>
