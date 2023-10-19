import TestMachine from "$lib/machine/TestMachine"
import { expect, test, describe } from "bun:test"

describe("xstate-graph", () => {
  test("toDirectedGraph", () => {
    expect(TestMachine)
  })
  test("snap", () => {
    expect("foo").toMatchSnapshot()
  })
})
