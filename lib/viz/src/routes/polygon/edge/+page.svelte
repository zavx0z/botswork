<script lang="ts">
  import { Editor } from "@lib/editor"
  import { stringify } from "javascript-stringify"
  import { Code } from "@lib/ui/card"
  import edgeFinish from "./edge-finish.png"
  import "prism-themes/themes/prism-dracula.min.css"
  export let data
</script>

<div class="grid h-screen grid-cols-2">
  <div class="flex h-full flex-col items-center gap-2 p-4">
    <h1 class="text-center text-lg">Edge - переход между 2-мя состояниями.</h1>
    <img src={edgeFinish} alt="edgeFinish" class="rounded-xl" />
    <Code title="DirectedGraphEdge" code={data.DirectedGraphEdge} />
    <Code title="TransitionDefinition" code={data.TransitionDefinition} />
  </div>
  <!-- <Editor content={`const childrenFirstEdgeFirst = ${stringify(data.directedGraph.children[0].edges[0], null, 2)}`} foldLevel={3} hFull foldPanel minimapEnabled /> -->
</div>
