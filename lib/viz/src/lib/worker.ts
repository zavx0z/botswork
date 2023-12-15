// import { createSimulator } from "./simulator"

import { createMachine, interpret } from "@lib/machine"
import { convertToGraph } from "./utils/directedGraph"

onmessage = ({ data }) => {
  const machine = JSON.parse(data.machine)
  const actor = interpret(createMachine(machine)).start()
  actor.onTransition((state, transition) => {
    console.log(state, transition)
  })
  actor.send({ type: "go.two" })
  const channel = new BroadcastChannel(machine.id)
  console.log(machine)
  const { edges, nodes, digraph } = convertToGraph(machine)
  channel.postMessage({ edges, nodes, digraph })
}

// const simulator = createSimulator({
//   machine: TestMachine,
//   state: TestMachine.getInitialState(null as any),
// }).start()
