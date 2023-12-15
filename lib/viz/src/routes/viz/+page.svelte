<script lang="ts">
  import { createSimulator, Simulator } from "$lib"
  import TestMachine from "./TestMachine"
  import ActorWorker from "$lib/worker.ts?worker"
  import { onMount } from "svelte"
  import type { DirectedGraphEdge, DirectedGraphNode } from "$lib/types"
  import { createMachine, type AnyStateNode } from "@lib/machine"
  import Graph from "$lib/Graph.svelte"

  // let edges: { [key: string]: DirectedGraphEdge }
  // let nodes: { [key: string]: AnyStateNode }
  // let digraph: DirectedGraphNode
  // onMount(() => {
  //   const actor = new ActorWorker()
  //   const channel = new BroadcastChannel(TestMachine.id)
  //   actor.postMessage({ machine: JSON.stringify(TestMachine.toJSON()) })
  //   channel.onmessage = ({ data }) => {
  //     edges = data.edges
  //     nodes = data.nodes
  //     digraph = data.digraph
  //     // console.log(nodes)
  //   }
  //   // console.log(JSON.stringify(TestMachine.toJSON()))
  // })
  const machine = createMachine({
    id: "rootMachine",
    initial: "one",
    states: {
      one: {
        on: { "go.two": "two" },
      },
      two: {},
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
  <Graph actor={simulator} />
</Simulator>
