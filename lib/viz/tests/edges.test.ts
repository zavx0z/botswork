import { expect, test, describe } from "bun:test"
import TestMachine from "$lib/machine/TestMachine"
import { getAllEdges, getChildren } from "$lib/utils"
import type { AnyEventObject, AnyState, MachineContext, StateNode, TransitionDefinition } from "xstate"

describe("Тестирование утилит по работе с ребрами", () => {
  test("getAllEdges", () => {
    const edges = getAllEdges(TestMachine as any)
    console.log(edges)
  })
})
