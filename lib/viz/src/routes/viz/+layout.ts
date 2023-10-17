import { createActor, createEmptyActor, type ActorContext, type MachineSnapshot } from "xstate"
import type { LayoutLoad } from "./$types"
import CanvasMachine from "$lib/machine/CanvasMachine"
import { SimulationMachine } from "$lib/machine/sumulation/SimMachine"
import TestMachine from "$lib/machine/TestMachine"


export const load: LayoutLoad = () => {
  const canvasActor = createActor(CanvasMachine).start()

  const simService = createActor(SimulationMachine, {
    input: {
      machine: TestMachine,
      state: TestMachine.getInitialState(null as any),
    },
  }).start()

  return { testMachine: TestMachine, simService, canvasActor }
}
