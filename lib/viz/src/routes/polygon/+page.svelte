<script lang="ts">
  import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"
  import { Editor } from "$lib"
  import { parseMachines } from "$lib/editor/parseMachine"
  import type { PageData } from "./$types"
  import { stringify } from "javascript-stringify"
  export let data: PageData

  let content = data.machine
  let Machine
  let definition: string
  let directedGraph: string | undefined = undefined
  $: {
    Machine = parseMachines(content)[0]
    definition = JSON.stringify(Machine.definition, null, 2)
    let directedGraphObj = toDirectedGraph(Machine.definition as any)
    directedGraph = stringify(directedGraphObj, null, 2)
  }
</script>

<div class="flex h-screen">
  <Editor bind:content hFull={false} />
  <Editor content={definition} language="json" foldPanel />
  {#if directedGraph?.length}
    <Editor content={directedGraph} minimapEnabled={true} readOnly foldPanel />
  {/if}
</div>
