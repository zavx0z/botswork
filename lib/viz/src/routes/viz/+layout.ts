import { createActor, createEmptyActor, type ActorContext, type MachineSnapshot } from "xstate"
import type { LayoutLoad } from "./$types"
import CanvasMachine from "$lib/machine/CanvasMachine"
import { SimulationMachine } from "$lib/machine/sumulation/SimMachine"
import TestMachine from "$lib/machine/TestMachine"
import { getAllEdges } from "$lib/utils"

export const load = (async () => {
  const canvasActor = createActor(CanvasMachine).start()
  const simService = createActor(SimulationMachine, {
    input: {
      machine: TestMachine,
      state: TestMachine.getInitialState(null as any),
    },
  }).start()
  const edges = getAllEdges(TestMachine as any)
  return { testMachine: TestMachine, simService, canvasActor, edges }
}) satisfies LayoutLoad
