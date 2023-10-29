<script lang="ts">
  import String from "./output/OutputString.svelte"
</script>

<div aria-label="выходы" class="grid grid-cols-1 gap-2">
  <slot {String} />
</div>
