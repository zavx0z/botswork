<script lang="ts">
  import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"
  import type { PageData } from "./$types"
  import { Editor } from "@lib/editor"
  import { stringify } from "javascript-stringify"

  export let data: PageData
  const { machine } = data
  const directedGraph: DirectedGraphNode = toDirectedGraph(machine.definition as any)
</script>

<div class="grid h-screen grid-flow-col grid-cols-3 grid-rows-3 gap-x-1">
  <div class="row-span-2 flex flex-col">
    <Editor content={`const directedGraphNode = ${stringify(directedGraph, null, 2)}`} foldLevel={2} foldPanel hFull minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const edges = ${stringify(directedGraph.edges, null, 2)}`} foldPanel minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const stateNode = ${stringify(directedGraph.stateNode, null, 2)}`} foldLevel={2} foldPanel hFull minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const children = ${stringify(directedGraph.children, null, 2)}`} foldLevel={3} foldPanel hFull minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const childrenFirstEdges = ${stringify(directedGraph.children[0].edges, null, 2)}`} hFull foldLevel={3} foldPanel minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const childrenFirstStateNode = ${stringify(directedGraph.children[0].stateNode, null, 2)}`} hFull foldLevel={2} foldPanel minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const childrenFirst = ${stringify(directedGraph.children[0], null, 2)}`} hFull foldLevel={2} foldPanel minimapEnabled />
  </div>
  <div class="flex h-full flex-col">
    <Editor content={`const childrenFirstEdgeFirst = ${stringify(directedGraph.children[0].edges[0], null, 2)}`} hFull foldLevel={2} foldPanel minimapEnabled />
  </div>
</div>
