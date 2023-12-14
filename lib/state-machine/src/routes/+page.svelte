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

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
