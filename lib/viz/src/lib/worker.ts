// import { createSimulator } from "./simulator"

import { convertToGraph } from "./utils/directedGraph"

onmessage = ({ data }) => {
  const machine = JSON.parse(data.machine)
  const channel = new BroadcastChannel(machine.id)
  const { edges, nodes, digraph } = convertToGraph(machine)
  channel.postMessage({ edges, nodes, digraph })
}

// const simulator = createSimulator({
//   machine: TestMachine,
//   state: TestMachine.getInitialState(null as any),
// }).start()
