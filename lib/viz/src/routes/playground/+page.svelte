<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { parseMachines } from "$lib/editor/parseMachine"
  import { createActor, type AnyStateMachine, type AnyActor } from "xstate"
  let content = `const machine = createMachine(
  {
    context: {
      count: 0,
    },
    id: "machine",
    entry: {
      type: "entry",
    },
    initial: "init",
    states: {
      init: {
        on: {
          start: {
            target: "started",
          },
        },
      },
      started: {
        on: {
          finish: {
            target: "final",
          },
        },
      },
      final: {
        type: "final",
      },
    },
  },
  {
    actions: { entry: ({ context, event }) => {} },
    actors: {},
    guards: {},
    delays: {},
  },
);`
  let machine: AnyStateMachine
  let machineJson: string
  let actor: AnyActor
  let definition: any
</script>

<div class="flex w-screen flex-row">
  <div class="flex h-screen w-[500px] flex-col gap-2 p-2">
    <button
      on:click={() => {
        machine = parseMachines(content)[0]
        machineJson = JSON.stringify(machine.toJSON(), null, 2)
        definition = JSON.stringify(machine.definition, null, 2)
        console.log(definition)
      }}>Создать машину</button
    >
    <Editor bind:content hFull={false} language={"typescript"} />
    <pre>machine.toJSON() то же самое что machine.definition</pre>
    {#if machine}
      {#if actor}
        <p class="text-center">Актор создан</p>
      {:else}
        <button on:click={() => (actor = createActor(machine).start())}> Создать Актор </button>
      {/if}
    {/if}
  </div>
  <div class="flex w-[500px] flex-col">
    <pre class="text-center">machine.definition</pre>
    <div class="flex-1">
      {#if machineJson}
        <Editor bind:content={definition} language="json" />
      {/if}
    </div>
  </div>
</div>
