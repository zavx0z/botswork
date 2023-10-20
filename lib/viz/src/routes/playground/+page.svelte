<script lang="ts">
  import { Editor } from "@lib/editor"
  import { parseMachines } from "$lib/editor/parseMachine"
  import { useSelector } from "@xstate/svelte"
  import type { Readable } from "svelte/store"
  import { createActor, type AnyStateMachine, type AnyActor, assign } from "xstate"
  export let data
  let content = data.machine
  let machine: AnyStateMachine
  let provide = data.provide
  let actor: AnyActor
  let count: Readable<number>
  let definition: any
  let implement: any
  let persistedState = ""
  $: $count && (persistedState = JSON.stringify(actor.getPersistedState(), null, 2))
</script>

<div class="flex w-screen flex-row">
  <div class="flex h-screen w-[700px] flex-col gap-2 p-2">
    <button
      on:click={() => {
        machine = parseMachines(content)[0]
        definition = JSON.stringify(machine.definition, null, 2)
      }}>Создать машину</button
    >
    <Editor bind:content hFull={false} language={"typescript"} />
    {#if machine}
      <button
        on:click={() => {
          machine = eval(provide)
          implement = JSON.stringify(
            machine.implementations,
            (key, val) =>
              typeof val === "function" && val.type === "xstate.assign"
                ? Object.entries(val.assignment)
                    .map(([key, fn]) => fn?.toString())
                    .join("")
                : val,
            2,
          )
        }}>Предоставить машине функции</button
      >
      <Editor bind:content={provide} hFull={false} language={"typescript"} />
      {#if implement}
        <Editor content={implement} hFull={false} language={"json"} readOnly />
      {/if}
      <button
        on:click={() => {
          actor = createActor(machine).start()
          count = useSelector(actor, (state) => state.context.count)
        }}
      >
        Создать Актор
      </button>
      {#if actor}
        <Editor bind:content={persistedState} hFull={false} language={"json"} readOnly />
        <button on:click={() => actor.send({ type: "increment" })}>increment</button>
      {/if}
    {/if}
  </div>

  <div class="flex w-[500px] flex-col">
    <pre class="text-center">machine.definition</pre>
    <div class="flex-1">
      {#if definition}
        <Editor bind:content={definition} language="json" />
      {/if}
    </div>
  </div>
</div>
