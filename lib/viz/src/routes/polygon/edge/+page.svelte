<script lang="ts">
  import { Editor } from "@lib/editor"
  import { stringify } from "javascript-stringify"
  import { Code } from "@lib/ui/card"
  import "prism-themes/themes/prism-coldark-dark.css"
  import "./lineNum.css"
  import "./fold.css"
  import PlaceholderText from "./PlaceholderText.svelte"
  import PlaceholderImage from "./PlaceholderImage.svelte"

  export let data
</script>

<div class="grid h-screen grid-cols-2 grid-rows-1">
  <div class="flex flex-col items-center gap-2 overflow-y-auto p-4">
    <h1 class="text-center text-lg">Edge - переход между 2-мя состояниями.</h1>
    {#await data.streamed.img}
      <PlaceholderImage />
    {:then value}
      <img src={value} alt="edgeFinish" class="h-96 rounded-xl" />
    {/await}
    {#await data.streamed.DirectedGraphEdge}
      <PlaceholderText />
    {:then value}
      <Code title="DirectedGraphEdge" code={value} />
    {/await}
    {#await data.streamed.TransitionDefinition}
      <PlaceholderText />
    {:then value}
      <Code title="TransitionDefinition" code={value} />
    {/await}
  </div>
  <div class="flex flex-col items-center gap-2 overflow-y-auto p-4">
    {#await data.streamed.Edge}
      <PlaceholderText />
    {:then value}
      <Code title="Edge" code={value} />
    {/await}
  </div>
  <!-- <Editor content={`const childrenFirstEdgeFirst = ${stringify(data.directedGraph.children[0].edges[0], null, 2)}`} foldLevel={3} hFull foldPanel minimapEnabled /> -->
</div>
