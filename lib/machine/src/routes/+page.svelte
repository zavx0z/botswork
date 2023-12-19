<script lang="ts">
  import { createMachine, interpret } from "$lib"

  const machine = createMachine(
    {
      id: "machine",
      initial: "idle",
      states: {
        idle: {
          on: {
            "next.state": "next",
          },
        },
        next: {
          after: {
            1000: { target: "invoke" },
          },
        },
        invoke: {
          invoke: {
            src: "invoke",
            onDone: { target: "idle" },
          },
        },
      },
      predictableActionArguments: true,
    },
    {
      services: {
        invoke: createMachine({ id: "invoke", predictableActionArguments: true }),
      },
    },
  )
  const actor = interpret(machine, {})

  actor.subscribe((state) => {
    console.log(state.value)
  })
  actor.start()
  actor.send({ type: "next.state" })
</script>

<a href="/scxml">scxml</a>
