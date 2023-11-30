<script lang="ts">
  import { createActor } from "xstate"
  import { simulatorMachine, Simulator } from "$lib"
  import TestMachine from "./TestMachine"

  const actor = createActor(simulatorMachine, {
    input: {
      machine: TestMachine,
      state: TestMachine.getInitialState(null as any),
    },
  }).start()
</script>

<Simulator {actor} />
