<script lang="ts">
  import { createSimulator, Simulator } from "$lib"
  import TestMachine from "./TestMachine"

  const simulator = createSimulator({
    machine: TestMachine,
    state: TestMachine.getInitialState(null as any),
  }).start()
  $effect(() => {
    console.log($simulator)
  })
</script>

<!-- <Simulator actor={simulator} /> -->
