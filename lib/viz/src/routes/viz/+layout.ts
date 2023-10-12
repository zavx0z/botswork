import { createActor } from "xstate"
import type { LayoutLoad } from "./$types"
import CanvasMachine from "$lib/machine/CanvasMachine"
import { createSimulationMachine } from "$lib/machine/sumulation/SimMachine"
import TestMachine from "$lib/machine/TestMachine"

export const load = (async () => {
  const canvasActor = createActor(CanvasMachine).start()
  const sim = createSimulationMachine(TestMachine, TestMachine.states, undefined)
  const simService = createActor(sim).start()
  return { testMachine: TestMachine, simService, canvasActor }
}) satisfies LayoutLoad
