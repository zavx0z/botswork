import { createMachine } from "xstate"
import { getShortestPaths } from "@xstate/graph"
import { expect, test, describe } from "bun:test"

describe("types", () => {
  test("`getEvents` should be allowed to return a mutable array", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO" } | { type: "BAR" }
      },
    })

    getShortestPaths(machine, {
      events: [
        {
          type: "FOO",
        },
      ],
    })
  })

  test("`getEvents` should be allowed to return a readonly array", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO" } | { type: "BAR" }
      },
    })

    getShortestPaths(machine, {
      events: [
        {
          type: "FOO",
        },
      ],
    })
  })

  test("`events` should allow known event", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO"; value: number }
      },
    })

    getShortestPaths(machine, {
      events: [
        {
          type: "FOO",
          value: 100,
        },
      ],
    })
  })

  test("`events` should not require all event types (array literal expression)", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO"; value: number } | { type: "BAR"; value: number }
      },
    })

    getShortestPaths(machine, {
      events: [{ type: "FOO", value: 100 }],
    })
  })

  test("`events` should not require all event types (tuple)", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO"; value: number } | { type: "BAR"; value: number }
      },
    })

    const events = [{ type: "FOO", value: 100 }] as const

    getShortestPaths(machine, {
      events,
    })
  })

  test("`events` should not require all event types (function)", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO"; value: number } | { type: "BAR"; value: number }
      },
    })

    getShortestPaths(machine, {
      events: () => [{ type: "FOO", value: 100 }] as const,
    })
  })

  test("`events` should not allow unknown events", () => {
    const machine = createMachine({
      types: { events: {} as { type: "FOO"; value: number } },
    })

    getShortestPaths(machine, {
      events: [
        {
          // @ts-expect-error
          type: "UNKNOWN",
          value: 100,
        },
      ],
    })
  })

  test("`events` should only allow props of a specific event", () => {
    const machine = createMachine({
      types: {} as {
        events: { type: "FOO"; value: number } | { type: "BAR"; other: string }
      },
    })

    getShortestPaths(machine, {
      events: [
        {
          type: "FOO",
          // @ts-expect-error
          other: "nana nana nananana",
        },
      ],
    })
  })

  test("`serializeEvent` should be allowed to return plain string", () => {
    const machine = createMachine({})

    getShortestPaths(machine, {
      serializeEvent: () => "",
    })
  })

  test("`serializeState` should be allowed to return plain string", () => {
    const machine = createMachine({})

    getShortestPaths(machine, {
      serializeState: () => "",
    })
  })
})
