<script lang="ts">
  import { Editor } from "@lib/editor"
  import { parseMachines } from "$lib/editor/parseMachine"
  import { stringify } from "javascript-stringify"
  import { toDirectedGraph } from "$lib/graph/directedGraph.js"

  export let data

  let content = data.machineAsString
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
