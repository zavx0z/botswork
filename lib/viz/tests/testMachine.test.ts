import TestMachine from "$lib/machine/TestMachine"
import { expect, test, describe } from "bun:test"
import { createActor } from "xstate"

describe("testMachine", () => {
  const actor = createActor(TestMachine).start()
  const initialState = TestMachine.getInitialState(null as any)

  test("получить начальное состояние из машины", () => {
    expect(initialState.value).toEqual("simple")
  })
  let state
  test("переход от начального состояния", () => {
    const transition = TestMachine.transition(initialState, { type: "NEXT" }, null as any)
    expect(transition.value).toEqual({ compound: "one" })
    const transition2 = TestMachine.transition(transition, { type: "PREV" }, null as any)
    expect(transition2.value).toEqual({ compound: "one" })
  })

  // test("несуществующий переход от текущего состояния", () => {
  // })


  test("создать актор и сделать переход", () => {
    actor.send({ type: "NEXT" })
    expect(actor.getSnapshot().value).toEqual({ compound: "one" })
  })

  test("установить состояние актора после перехода машине", () => {
    const transition = TestMachine.transition(actor.getSnapshot(), { type: "NEXT" }, null as any)
    expect(transition.value).toEqual({ compound: "two" })
  })
})
