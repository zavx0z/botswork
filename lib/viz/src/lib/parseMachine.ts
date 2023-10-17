import * as XState from "xstate"
import { StateNode, createMachine, createActor, assign, sendParent, raise, sendTo, fromCallback } from "xstate"

type machines = Array<XState.AnyStateMachine>

export function parseMachines(sourceJs: string): machines {
  const makeMachine = new Function("Machine", "createMachine", "createActor", "assign", "sendTo", "raise", "XState", "fromCallback", sourceJs)
  const machines: machines = []
  const machineProxy = (config: any, options: any) => {
    const machine = createMachine(config, options)
    machines.push(machine)
    return machine
  }
  makeMachine(machineProxy, machineProxy, createActor, assign, sendTo, sendParent, raise, XState, fromCallback)
  return machines
}
