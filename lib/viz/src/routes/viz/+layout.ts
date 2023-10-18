import { createActor } from "xstate"
import type { LayoutLoad } from "./$types"
import { SimulationMachine } from "$lib/machine/sumulation/SimMachine"
import TestMachine from "$lib/machine/TestMachine"

export const load: LayoutLoad = () => {
  const service = createActor(SimulationMachine, {
    input: {
      machine: TestMachine,
      state: TestMachine.getInitialState(null as any),
    },
  }).start()
  return { service }
}
