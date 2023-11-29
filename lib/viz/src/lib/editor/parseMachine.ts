import * as XState from "xstate"
import { createMachine, assign, sendParent, raise, sendTo, fromCallback } from "xstate"

type machines = Array<XState.AnyStateMachine>

export function parseMachines(sourceJs: string): machines {
  const makeMachine = new Function("createMachine", "assign", "sendTo", "sendParent", "raise", "XState", "fromCallback", sourceJs)
  const machines: machines = []
  const machineProxy = (config: any, options: any) => {
    const machine = createMachine(config, options)
    machines.push(machine)
    return machine
  }
  makeMachine(machineProxy, assign, sendTo, sendParent, raise, XState, fromCallback)
  return machines
}
