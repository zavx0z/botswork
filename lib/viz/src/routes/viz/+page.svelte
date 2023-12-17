<script lang="ts">
  import { createSimulator, Simulator } from "$lib"
  import TestMachine from "./TestMachine"
  import ActorWorker from "$lib/worker.ts?worker"
  import { onMount } from "svelte"
  import type { DirectedGraphEdge, NodeState } from "$lib/types"
  import { createMachine } from "@lib/machine"
  import Graph from "$lib/Graph.svelte"

  let edges: { [key: string]: DirectedGraphEdge }
  let nodes: { [key: string]: NodeState }

  onMount(() => {
    // const machine = TestMachine
    const actor = new ActorWorker()
    const channel = new BroadcastChannel(machine.id)
    actor.postMessage({ machine: JSON.stringify(machine.toJSON()) })
    channel.onmessage = ({ data }) => {
      edges = data.edges
      nodes = data.nodes
    }
    // console.log(JSON.stringify(TestMachine.toJSON()))
  })
  const machine = createMachine({
    predictableActionArguments: true,
    id: "rootMachine",
    initial: "one",
    on: {
      "root.go.one": "one",
      "root.go.root": "#rootMachine",
    },
    states: {
      one: {
        onEntry: "entryAction",
        // id: "customId",
        on: {
          "go.two": "two",
          "go.nested": "two.nested",
        },
      },
      two: {
        on: { "go.one": "one" },
        initial: "nested",
        states: {
          nested: {
            onExit: "exitAction",
            on: { "go.one": "#rootMachine.one", "go.parent": "#rootMachine.two" },
          },
        },
      },
    },
  })

  const simulator = createSimulator({
    machine,
    state: machine.initialState,
  }).start()
  // const simulator = createSimulator({
  //   machine: TestMachine,
  //   state: TestMachine.initialState,
  // }).start()
  simulator.onTransition((st, pt) => {
    // console.log("st!!", st, pt)
  })
</script>

<Simulator>
  {#if nodes && edges}
    <Graph actor={simulator} {edges} {nodes} />
  {/if}
</Simulator>
