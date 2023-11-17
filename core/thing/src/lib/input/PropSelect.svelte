<script lang="ts">
  export let options: { value: string; title: string }[]
  export let selected: string
  export let title: string
  const id = crypto.randomUUID()
</script>

<div class="relative">
  <label for={id} class="absolute -top-3.5 right-1 text-surface-200 z-40 text-xs">{title}</label>
  <select {id} bind:value={selected} class="block w-full rounded-md bg-surface-600 px-1 pb-1 hover:opacity-75 focus:outline-none">
    {#each options as typeSrc}
      <option value={typeSrc.value}>{typeSrc.title}</option>
    {/each}
  </select>
</div>
