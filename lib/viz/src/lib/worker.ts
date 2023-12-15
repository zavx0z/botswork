// import { createSimulator } from "./simulator"

import { createMachine, interpret } from "@lib/machine"
import { convertToGraph } from "./utils/directedGraph"

onmessage = ({ data }) => {
  const machineObj = JSON.parse(data.machine)
  machineObj["predictableActionArguments"] = true // TODO: predictableActionArguments set default true
  const machine = createMachine(machineObj)
  // console.log(machine)
  const actor = interpret(machine).start()
  actor.onTransition((state, transition) => {
    // console.log(state, transition)
  })
  actor.send({ type: "go.two" })

  const channel = new BroadcastChannel(machineObj.id)
  const { edges, nodes, digraph } = convertToGraph(machineObj)
  channel.postMessage({ edges, nodes, digraph })
}

// const simulator = createSimulator({
//   machine: TestMachine,
//   state: TestMachine.getInitialState(null as any),
// }).start()
