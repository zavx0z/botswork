<script lang="ts">
  import type { TransitionDefinition } from "xstate"

  export let definition: TransitionDefinition<any, any>
</script>

<data class="block">
  {@html '<!-- transition label -->'}
  <div class="bg-primary-500 text-surface-500 font-bold py-1 px-2 rounded-xl text-xs">
    {definition.eventType}
  </div>
</data>
