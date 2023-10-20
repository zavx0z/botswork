<script lang="ts">
  import { Editor } from "$lib"
  let content = `const machine = createMachine(
    {
      context: {
        count: 0,
      },
      id: "machine",
      entry: {
        type: "inc",
      },
      initial: "started",
      states: {
        started: {
          on: {
            finish: {
              target: "final",
            },
            increment: {
              actions: "inc"
            }
          },
        },
        final: {
          type: "final",
        },
      },
    },
  );`
</script>

<div class="flex h-screen">
  <Editor bind:content hFull={false} language="typescript" />
</div>
