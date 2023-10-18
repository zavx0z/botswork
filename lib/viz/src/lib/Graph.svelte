<script lang="ts">
  import type { DirectedGraphNode } from "@xstate/graph"
  import { createActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import GraphNode from "./GraphNode.svelte"
  import elkMachine from "./graph/elkMachine"

  export let digraph: DirectedGraphNode
  const actor = createActor(elkMachine, { input: { digraph } }).start()
  const state = useSelector(actor, (state) => state)

  $: console.log($state.context.elkGraph, $state.value)
</script>

{#if $state.matches("success")}
  <GraphNode elkNode={$state.context.elkGraph} />
{/if}
