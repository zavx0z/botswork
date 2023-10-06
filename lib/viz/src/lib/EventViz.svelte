<script lang="ts">
  import type { TransitionDefinition } from "xstate"

  export let definition: TransitionDefinition<any, any>
</script>

<data data-viz="transition">
  <div data-viz="transition-label">
    {definition.eventType}
  </div>
</data>
