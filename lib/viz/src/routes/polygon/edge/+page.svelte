<script lang="ts">
  import { Editor } from "@lib/editor"
  import { stringify } from "javascript-stringify"

  export let data

  interface Hi {
    id: string
  }
</script>

<div class="grid h-screen grid-cols-2">
  <Editor content={`const childrenFirstEdgeFirst = ${stringify(data.directedGraph.children[0].edges[0], null, 2)}`} hFull foldPanel minimapEnabled />
  <Editor content={`const childrenFirstEdgeFirst = ${stringify(data.directedGraph.children[0].edges[0], null, 2)}`} hFull />
</div>
