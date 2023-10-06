import { interpret } from "xstate"
import type { PageLoad } from "./$types"
import CanvasMachine from "$lib/machine/CanvasMachine"
import { createSimulationMachine } from "$lib/machine/SimMachine"
import TestMachine from "$lib/machine/TestMachine"

export const load = (async () => {
  const canvasMachine = interpret(CanvasMachine).start()
  const simService = interpret(createSimulationMachine(TestMachine, TestMachine.initialState)).start()
  return { testMachine: TestMachine, simService, canvas: canvasMachine }
}) satisfies PageLoad
